import React from "react";
import { useState } from "react";

import UserModal from "../../components/Modals/UserModal";

import LoginDialog from "../../components/Dialogs/LoginDialog";
import Footer from "../../components/ui/Footer";
import HomeNav from "../../components/Navbar/HomeNav";
import HeroPage from "../../components/ui/HeroPage";
const Hero = () => {
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  //todo: get login credential like user._id to check if user is logged in or not and then setisLoggedIn to true

  return (
    <div className="flex flex-col h-screen p-3">
      <div className="flex flex-col h-full   p-2 gap-3 rounded-[0.625rem]   bg-customBlack">
        <div className="h-[10%] w-full ">

        <HomeNav isLoggedIn={isLoggedIn} setLoginPopup={setLoginPopup} />
        </div>
        <div className="flex flex-col justify-between w-full h-[90%]">
          
          <HeroPage></HeroPage>

          <Footer />
        </div>

        {loginPopup && <LoginDialog setLoginPopup={setLoginPopup} />}
      </div>
    </div>
  );
};

export default Hero;
