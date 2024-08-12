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
import { useEffect } from "react";
import { useSelector } from "react-redux";
const Snippets = () => {
  const  doc_id  = useSelector((state) => state.document.docId);
  console.log("doc id is",doc_id)

  return (
    <div className="flex flex-row h-screen gap-3 p-6">
      <div className=" flex flex-col w-3/4 gap-[0.70rem] ">
        <NavbarRight></NavbarRight>
        <div className="flex flex-col  h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
          
          <Routes>
            <Route path="/" element={<Outlet />}>
              <Route path="" element={<SnippetDialog />} />
              <Route path="/Summary" element={<SummaryDialog />} />
              <Route path="/Favour" element={<FavourDialog />} />
              <Route path="/Neutral" element={<NeutralDialog />} />
              <Route path="/Direction" element={<DirectionDialog />} />
            </Route>
          </Routes>
        </div>
      </div>
      <div className="flex flex-col w-1/4 ">
       
        <NavbarLeft></NavbarLeft>
        <div className="chat section flex relative flex-col  h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
          <TextBoxDialog></TextBoxDialog>
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
