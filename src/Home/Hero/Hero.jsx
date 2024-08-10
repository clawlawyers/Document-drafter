import React from "react";
import { useState } from "react";
import Cloud from "../../assets/icons/Cloud.svg";
import Type from "../../assets/icons/Type.svg";
import Prompt from "../../assets/icons/Prompt.svg";
import UserModal from "../../components/Modals/UserModal";

import { useNavigate } from "react-router-dom";
import LoginDialog from "../../components/Dialogs/LoginDialog";
const Hero = () => {
  let navigate = useNavigate();
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  

  //todo: get login credential like user._id to check if user is logged in or not and then setisLoggedIn to true 

  
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col h-full   m-4  p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
        <div className="flex flex-row justify-between">
          <button className="px-10 py-2 border-white rounded-[0.3125rem] border-2">
            CLAW Home
          </button>
          {!isLoggedIn ? (
            <button
              onClick={() => setLoginPopup(true)}
              className="px-14 py-2 font-sans bg-customBlue border-black rounded-[0.3125rem] border-2 "
            >
              Log In
            </button>
          ) : (
            <UserModal/>
          )}
        </div>
        <div className="flex flex-col justify-between w-full h-full">
          <div className="flex flex-col gap-[6rem] items-center      ">
            <div className="flex flex-col gap-4 items-center ">
              <div className="font-sans font-medium text-xl ">Welcome to</div>
              <div className="font-sans font-semibold text-6xl px-6   py-2 justify-items-center  bg-logo-gradient">
                Adira AI
              </div>
              <div className="font-sans font-medium text-xl mt-2">
                AI Powered Legal Document Drafter by CLAW
              </div>
            </div>
            <div className="flex flex-row gap-7 cursor-pointer   ">
              <div
                onClick={() => navigate("/upload")}
                className="hover:scale-110 duration-200 flex items-center flex-col gap-3 p-5 bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-14"
              >
                <img src={Cloud} alt="" />
                <div>Upload Your Document</div>
              </div>
              <div className="flex items-center flex-col gap-3 p-5 bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-14">
                <img src={Prompt} alt="" />
                <div>Create Document from Prompt</div>
              </div>
              <div className="flex items-center flex-col gap-3 p-5 bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-14">
                <img src={Type} alt="" />
                <div>Select Type of Document</div>
              </div>
            </div>
          </div>
          <div className="border-white border-t-[0.1rem] mt-3 p-3 text-center font-sans text-customGrey ">
            Adira AI is a Proprietory Legal Based Generative AI developed by
            CLAW Legal Tech
          </div>
        </div>

        {loginPopup && (
          <LoginDialog setLoginPopup={setLoginPopup} />
        )}
      </div>
    </div>
  );
};

export default Hero;
