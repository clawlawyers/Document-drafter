import React, { useState } from "react";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import UserModal from "../components/Modals/UserModal";
import { Add, Person } from "@mui/icons-material";
import CustomInput from "../components/ui/CustomInput";
import Footer from "../components/ui/Footer";
import { CircularProgress } from "@mui/material";
const DrafterArgs = () => {
  const [loading, setIsLoading] = useState(false);
  return (
    <div className="flex flex-col h-screen space-y-5 w-full p-5">
      <div className="flex flex-row justify-between w-full items-center">
        <NavbarRight showMeu={false} />
        <NavbarLeft />
      </div>

      <div className="flex space-x-5 flex-row w-full h-[70vh] justify-center items-center ">
        <div className="w-[70%] space-y-5 flex flex-col h-full bg-customBlack rounded-md p-5">
          {/* user */}
          <div className="flex flex-row justify-start items-center">
            <Person />
            Random Text by user input
          </div>
          {/* argumments container */}

          <div className="bg-card-gradient rounded-md h-full w-full flex flex-col justify-center items-center"></div>
        </div>
        <div className="w-[30%] space-y-5 flex flex-col justify-center items-center h-full">
          <div className=" w-full p-2  flex justify-center items-center h-full rounded-md flex-col bg-customBlack">
            {loading && <CircularProgress />}

            <div className="w-full flex flex-col space-y-5 justify-start items-center h-full">
              <p>Essential Requirement</p>
              {/* cards */}
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
            </div>
            <div className="w-full flex flex-col space-y-5 justify-center items-center h-fit">
              <p>Optional Requirement</p>
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
              <div className="bg-card-gradient p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                <p>Some text here</p>
                <Add />
              </div>
            </div>
          </div>
          <div className="flex flex-row w-full justify-between items-center">
          <button className="bg-btn-gradient p-2 px-9 rounded-md">
            Re enter Prompt
          </button>
          <button className="bg-btn-gradient p-2 px-9 rounded-md">
            Submit
          </button>
        </div>
        </div>
        
      </div>
      {loading && <CustomInput />}

      <Footer />
    </div>
  );
};

export default DrafterArgs;
