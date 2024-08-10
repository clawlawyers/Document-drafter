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

const Snippets = () => {
  return (
    <div className="flex flex-row h-screen gap-3 p-6">
      <div className=" flex flex-col w-3/4 gap-[0.70rem] ">
        <NavbarRight></NavbarRight>
        <div className="flex flex-col  h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
          {/* <div className="flex flex-col gap-5 mx-6 my-5">
            <div className="flex flex-row gap-3  ">
              <div className="flex flex-col rounded-[0.635rem] border-2 px-4 py-2  border-white bg-popup-gradient w-3/4 gap-1">
                <div className="font-sans text-[1.125rem] font-bold leading-[1.13625rem]">
                  Section 1.10.33 of "de Finibus Bonorum et Malorum", written by
                  Cicero in 45 BC
                </div>
                <div className="font-sans text-[0.625rem]">
                  At vero eos et accusamus et iusto odio dignissimos ducimus qui
                  blanditiis praesentium voluptatum deleniti atque corrupti quos
                  dolores et
                </div>
              </div>
              <div className="w-1/4 flex gap-4 flex-col text-[0.6875rem] font-sans ">
                <div className="flex h-1/2 gap-3">
                  <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0   py-1 ">
                    Summary
                  </button>
                  <button className="rounded border-[1px] hover:bg-hover-gradient hover:text-black hover:border-0  w-1/2 py-1 ">
                    In whose favour
                  </button>
                </div>
                <div className="flex h-1/2 text-[0.5625rem] -tracking-[0.01688rem]  gap-3">
                  <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0  py-1 ">
                    How to make neutral
                  </button>
                  <button className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0  py-1 ">
                    Bend in Opp. Direction
                  </button>
                </div>
              </div>
            </div>
          </div> */}
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
        {/* <div className="flex flex-row justify-end items-start gap-2">
          <div>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="43"
              height="43"
              viewBox="0 0 43 43"
              fill="none"
            >
              <circle
                cx="21.5"
                cy="21.5"
                r="20.5"
                fill="#018081"
                stroke="black"
                stroke-width="2"
              />
              <path
                d="M22 10L34 21.7333H31V32H25V24.6667H19V32H13V21.7333H10L22 10Z"
                fill="white"
              />
            </svg>
          </div>
          <div className="rounded-full font-sans text-base bg-customDrakBlue flex items-center justify-center w-[40px] h-[40px]  ">
            S
          </div>
        </div> */}
        <NavbarLeft></NavbarLeft>
        <div className="flex relative flex-col  h-full  mt-4 p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
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
