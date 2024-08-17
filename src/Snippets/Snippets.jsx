import React from "react";
import { motion } from "framer-motion";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import TextBoxDialog from "../components/Dialogs/TextBoxDialog";
import SnippetDialog from "../components/Dialogs/SnippetDialog";
import { Route, Routes, Outlet } from "react-router-dom";
import SummaryDialog from "../components/Dialogs/SummaryDialog";
import NeutralDialog from "../components/Dialogs/NeutralDialog";
import FavourDialog from "../components/Dialogs/FavourDialog";
import DirectionDialog from "../components/Dialogs/DirectionDialog";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { draftTour } from "../utils/tour";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import QueryGIF from "../components/ui/QueryGIF";
import axios from "axios";
import giff from "../assets/icons/query.gif";
import { NODE_API_ENDPOINT } from "../utils/utils";
const Snippets = () => {
  const doc_id = useSelector((state) => state.document.docId);
  console.log("doc id is", doc_id);
  const [showGIF, setShowGif] = useState(false);
  const [query, setquery] = useState("");
  const [textBoxData, setTextBoxData] = useState([]);
  useEffect(() => {
    var localnewData = JSON.parse(localStorage.getItem("newdata"));
    if (localnewData !== null) {
      setTextBoxData(localnewData);
    }
  }, []);
  const hadnleSend = async () => {
    let data = JSON.stringify({
      doc_id: doc_id,
      query: query,
    });

    let config = {
      method: "post",
      maxBodyLength: Infinity,
      url: `${NODE_API_ENDPOINT}/ai-drafter/ask_question`,
      headers: {
        "Content-Type": "application/json",
      },
      data: data,
    };
    var newdata = textBoxData;

    newdata.push({
      query: query,
      response: {},
      isLoading: false,
    });
    setTextBoxData([...newdata]);
    console.log(textBoxData);
    // setShowGif(true);

    const response = await axios.request(config);
    newdata[newdata.length - 1].isLoading = true;
    newdata[newdata.length - 1].response = response;

    setTextBoxData(newdata);
    localStorage.setItem("newdata", JSON.stringify(newdata));
    console.log(textBoxData);
    console.log("query is", query);
  };

  return (
    <div className="flex flex-row h-screen gap-3 p-6">
      <div className=" flex flex-col w-3/4 gap-[0.70rem] ">
        <NavbarRight></NavbarRight>
        <div className="flex flex-col scrollbar-hide      h-full  mt-4 p-2 gap-3 overflow-y-auto rounded-[0.625rem]   bg-customBlack">
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route path="" element={<SnippetDialog />} />
              <Route path="/Summary/:id" element={<SummaryDialog />} />
              <Route path="/Favour/:id" element={<FavourDialog />} />
              <Route path="/Neutral/:id" element={<NeutralDialog />} />
              <Route path="/Direction/:id" element={<DirectionDialog />} />
            </Route>
          </Routes>
        </div>
      </div>
      <div className="flex flex-col w-1/4 ">
        <NavbarLeft></NavbarLeft>
        <div className="chat section overflow-y-auto scrollbar-hide   flex relative flex-col   h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
          {textBoxData.length > 0 ? (
            <div className="flex flex-col pb-10 gap-3">
              {textBoxData.map((item, i) => {
                if (item.isLoading)
                  return (
                    <TextBoxDialog key={i} responseData={item}></TextBoxDialog>
                  );
                return <img key={i} src={giff}></img>;
              })}
            </div>
          ) : (
            <QueryGIF />
          )}
          <div className="sticky w-[95%] bottom-3">
            <input
              className="bg-white text-black rounded-md border-[0.05rem] border-black p-2 px-4 w-full"
              type="text"
              name=""
              placeholder="Enter Your Question..."
              id=""
              value={query}
              onChange={(e) => setquery(e.target.value)}
            />
            <button
              onClick={hadnleSend}
              className="absolute bottom-2 right-2 text-sm text-white bg-black p-1 px-3 rounded "
            >
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippets;
