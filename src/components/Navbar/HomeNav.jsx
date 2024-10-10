import React, { useRef, useEffect } from "react";
import UserModal from "../Modals/UserModal";
import { useNavigate } from "react-router-dom";

const HomeNav = ({ className }) => {
  const navigation = useNavigate();

  return (
    <div className={`${className} flex flex-row justify-end gap-3`}>
      <button
        className="px-5 py-2 border-customBlue rounded-full border-[2px]"
        onClick={() => navigation("/")}
      >
        Home
      </button>
      <button
        className="px-5 py-2 border-customBlue rounded-full border-[2px]"
        onClick={() => navigation("/manageDoc")}
      >
        My Files
      </button>
      {/* <UserModal /> */}
    </div>
  );
};

export default HomeNav;
