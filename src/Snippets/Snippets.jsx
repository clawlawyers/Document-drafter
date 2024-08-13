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
const Snippets = () => {
  const doc_id = useSelector((state) => state.document.docId);
  console.log("doc id is", doc_id);
  const [showGIF, setShowGif] = useState(false);

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
        <div className="chat section flex relative flex-col  h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
          {showGIF ? (
            <TextBoxDialog></TextBoxDialog>
          ) : (
            <div className="flex flex-col h-screen justify-center items-center">
              dads
            </div>
          )}
          <div className="absolute w-[95%] bottom-3">
            <input
              className="bg-white text-black rounded-md border-[0.05rem] border-black p-2 px-4 w-full"
              type="text"
              name=""
              placeholder="Enter Your Question..."
              id=""
            />
            <button className="absolute bottom-2 right-2 text-sm text-white bg-black p-1 px-3 rounded ">
              SEND
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Snippets;
