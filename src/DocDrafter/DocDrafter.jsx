import React from "react";
import UserModal from "../components/Modals/UserModal";
import { Input } from "@mui/material";
import Footer from "../components/ui/Footer";
const DocDrafter = () => {
  return (
    <div className="flex flex-col h-screen w-full p-5 ">
      <div className="bg-custom-gradient flex flex-col space-y-10 p-5 px-7 h-full w-full rounded-md">
        <div className="flex flex-col w-full justify-between h-full items-center">
          <div className="flex w-full flex-row justify-between">
            <button className="px-10 py-2 border-white rounded-[0.3125rem] border-2">
              CLAW Home
            </button>
            <UserModal />
          </div>

          {/* //hero */}
          <div className="flex flex-col gap-2 w-full items-center justify-center">
            <div className="flex flex-row w-full  space-x-5 justify-center items-start">
              <h4 className="text-teal-500 font-bold text-9xl">Adira AI</h4>
              <sup className="text-2xl">by CLAW</sup>
            </div>
            <p className="text-2xl">Adira AI Legal Document Drafter by CLAW</p>
          </div>

          <div className="flex flex-col gap-2 justify-center w-full ">
           <div className="flex flex-row justify-center gap-5 items-center w-full">
           <input type="text" placeholder="Enter Your Prompt to Generate Document" className="p-2 w-full bg-slate-200 rounded-md text-neutral-800"/>
            <button className="bg-btn-gradient p-2 px-9 rounded-md" >Send</button>
           </div>
           <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDrafter;
