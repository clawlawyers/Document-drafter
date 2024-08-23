import React from "react";
import { useNavigate } from "react-router-dom";
import Cloud from "../../assets/icons/Cloud.svg";
import Type from "../../assets/icons/Type.svg";
import Prompt from "../../assets/icons/Prompt.svg";
import UserModal from "../../components/Modals/UserModal";

const HeroPage = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center justify-center  h-[70%] ">
      <div className="flex flex-col gap-4 items-center ">
        <div className="font-sans font-medium text-xl ">Welcome to</div>
        <div className="font-sans font-semibold text-6xl px-6   py-2 justify-items-center  bg-logo-gradient">
          Adira AI
        </div>
        <div className="font-sans font-medium text-xl mt-2">
          AI Powered Legal Document Drafter by CLAW
        </div>
      </div>
      <div className="flex flex-row gap-7 cursor-pointer scale-75  ">
        <div
          onClick={() => navigate("/upload")}
          className="hover:scale-110 duration-200 justify-center flex items-center flex-col gap-3 p-5  bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-20"
        >
          <img src={Cloud} alt="" />
          <p className="text-center">Upload Your Document</p>
        </div>
        <div
          onClick={() => navigate("/Drafter")}
          className="flex hover:scale-110 duration-200 items-center flex-col gap-3 p-5 bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-14"
        >
          <img src={Prompt} alt="" />
          <p className="text-center">Create Document from Prompt</p>
        </div>
        <div
          onClick={() => navigate("/DocType")}
          className="flex hover:scale-110 duration-200 items-center flex-col gap-3 p-5 bg-logo-gradient rounded-[0.9375rem] border-white border-[3px] px-20"
        >
          <img src={Type} alt="" />
          <p className="text-center">Select Type of Document</p>
        </div>
      </div>
    </div>
  );
};

export default HeroPage;
