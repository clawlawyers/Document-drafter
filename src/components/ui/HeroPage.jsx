import React from "react";
import { useNavigate } from "react-router-dom";
import Cloud from "../../assets/icons/Cloud.svg";
import Type from "../../assets/icons/Type.svg";
import group from "../../assets/icons/Group.svg";
import UserModal from "../../components/Modals/UserModal";
import { TypeAnimation } from "react-type-animation";

const HeroPage = () => {
  let navigate = useNavigate();
  return (
    <div className="flex flex-col gap-5 items-center justify-between w-full h-full px-4">
      <div className="flex flex-col gap-4 items-center text-center">
        <div className="font-sans font-medium text-xl">Welcome to</div>
        <div className="font-sans w-72  text-6xl px-6 py-2 bg-logo-gradient rounded">
          {/* <div  style={{
            
              display: "inline-block",
            }} className="  typing-demo">Adira AI</div> */}
          <TypeAnimation
            sequence={[
              // Same substring at the start will only be typed out once, initially
              "Adira AI",
              3000,
              "",
              1000,
              // "Frontend Developer",
              // 2000,
            ]}
            wrapper="div"
            speed={1}
            style={{
              fontSize: "3.5rem",
              fontWeight: "700",
              display: "inline-block",
              
              // borderStyle: "solid",
              // borderWidth: "5px",
            }}
          
            cursor={false}
            className="type"
            repeat={Infinity}
          />
        </div>
        <div className="font-sans font-medium text-xl mt-2">
          AI Powered Legal Document Drafter by CLAW
        </div>
      </div>
      <div className="grid font-sans md:grid-cols-4 gap-8">
        <div
          onClick={() => navigate("/upload")}
          className="hover:scale-110 duration-200 cursor-pointer bg-logo-gradient flex flex-col gap-3 items-center justify-center px-3 py-6 rounded-lg border-2 border-white"
        >
          <img src={"https://res.cloudinary.com/dumjofgxz/image/upload/v1730969164/Cloud_vfpmhw.svg"}className="h-[100px] w-[100px] object-contain" alt="Upload Icon" />
          <div className="flex flex-col  ">

          <p className="text-center text-xl font-bold px-1">Upload Your Document</p>
          <p className="text-center text-sm px-1">Quickly upload your legal file</p>
          </div>
        </div>
        <div
          onClick={() => navigate("/Drafter")}
          className="hover:scale-110 duration-200 cursor-pointer bg-logo-gradient flex flex-col gap-3 items-center justify-center  px-3 py-6 rounded-lg border-2 border-white"
        >
          <img src={"https://res.cloudinary.com/dyuov6i8c/image/upload/v1731494821/Assets/dv8xm1ebfpoqi4pwbhes.svg"} className="h-[90px] w-[90px] object-contain"  alt="Prompt Icon" />
          <div className="flex flex-col ">

          <p className="text-center text-lg font-bold  px-1">
            Create Document from Prompt
          </p>
          <p className="text-center text-sm  px-1">
          Describe it, we’ll draft it
          </p>
          </div>
        </div>
        <div
          onClick={() => navigate("/DocType")}
          className="hover:scale-110 duration-200 cursor-pointer bg-logo-gradient flex flex-col gap-3 items-center justify-center  px-3 py-6 rounded-lg border-2 border-white"
        >
          <img src={"https://res.cloudinary.com/dumjofgxz/image/upload/v1730969164/Type_m2w22m.svg"} className="h-[80px] w-[80px] object-contain"  alt="Type Icon" />
          <div className="flex flex-col ">

          <p className="text-center text-xl font-bold px-1">Select Type of Document</p>
          <p className="text-center text-sm  px-1">Quickly upload your legal file</p>
          </div>
        </div>
          <div
            onClick={() => navigate("/Prompt")}
            className="hover:scale-110 duration-200 cursor-pointer bg-logo-gradient flex flex-col gap-3 items-center justify-center  px-3 py-6 rounded-lg border-2 border-white"
          >
            <img src={group} className="h-[80px] w-[80px] object-contain"  alt="Type Icon" />

    
            <div className="flex flex-col ">

            <p className="text-center text-xl font-bold px-1">File along with Prompt</p>
            <p className="text-center text-sm  px-1">Upload your file and describe using prompt</p>
            </div>
          </div>
      </div>
    </div>
  );
};

export default HeroPage;
