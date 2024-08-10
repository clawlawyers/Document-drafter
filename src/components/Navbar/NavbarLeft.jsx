import React from "react";
import UserModal from "../Modals/UserModal";
import HomeIcon from "../../assets/svg/HomeIcon";
import { useNavigate } from "react-router-dom";

const NavbarLeft = () => {
  let navigate = useNavigate()
  return (
    <div className="flex flex-row justify-end items-start gap-2">
      <HomeIcon className="cursor-pointer hover:scale-105 duration-200 " onClick={()=> navigate("/")}   />
      <UserModal/>
    </div>
  );
};

export default NavbarLeft;
