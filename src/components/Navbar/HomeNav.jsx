import React, { useRef, useEffect, useState } from "react";
import UserModal from "../Modals/UserModal";
import { useNavigate, useLocation } from "react-router-dom";

const HomeNav = ({ className }) => {
  const navigation = useNavigate();
  const path = useLocation()
  console.log(path.pathname)
  var homename = ""
  if(path.pathname =="/"){
    homename="CLAW HOME"
  }
  else{
    homename="HOME"
  }

  return (
    <div className={`${className} flex items-center flex-row justify-end gap-3`}>
      <a
      href="https://clawlaw-dev.netlify.app/"
        className="px-5 py-2  border-customBlue rounded-full border-[2px]"
        onClick={path.pathname!="/" ?() => navigation("/"):null}
      >
        {homename}
      </a>
      {/* <button
        className="px-5 py-2 border-customBlue rounded-full border-[2px]"
        onClick={() => navigation("/manageDoc")}
      >
        My Files
      </button> */}
      {/* <UserModal /> */}
    </div>
  );
};

export default HomeNav;
