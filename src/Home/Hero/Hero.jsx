import React from "react";
import { useState } from "react";
import Cloud from "../../assets/icons/Cloud.svg";
import Type from "../../assets/icons/Type.svg";
import Prompt from "../../assets/icons/Prompt.svg";
import UserModal from "../../components/Modals/UserModal";

import { useNavigate } from "react-router-dom";
const Hero = () => {
  let navigate = useNavigate();
  const [loginPopup, setLoginPopup] = useState(false);
  const [isLoggedIn, setisLoggedIn] = useState(false);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    number: "",
  });
  const [verifyOTP, setverifyOTP] = useState(false);
  const [otp, setotp] = useState(null);
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };
  const onsubmithandle = () => {
    console.log("asdasdb");
  };
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
          <div className="fixed flex backdrop-blur-sm w-full h-full  items-center justify-center z-50 ">
            <div className=" flex relative border-white border-2  rounded-[0.625rem]  flex-col gap-12 p-10 bg-popup-gradient">
              <div
                className="absolute right-3 hover:cursor-pointer top-2"
                onClick={() => setLoginPopup(false)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 40 40"
                  fill="none"
                >
                  <path
                    d="M20 2.5C16.5388 2.5 13.1554 3.52636 10.2775 5.44928C7.39967 7.37221 5.15665 10.1053 3.83212 13.303C2.50758 16.5007 2.16102 20.0194 2.83627 23.4141C3.51151 26.8087 5.17822 29.9269 7.62564 32.3744C10.0731 34.8218 13.1913 36.4885 16.5859 37.1637C19.9806 37.839 23.4993 37.4924 26.697 36.1679C29.8947 34.8434 32.6278 32.6003 34.5507 29.7225C36.4737 26.8446 37.5 23.4612 37.5 20C37.5 15.3587 35.6563 10.9075 32.3744 7.62563C29.0925 4.34374 24.6413 2.5 20 2.5ZM20 35C17.0333 35 14.1332 34.1203 11.6665 32.472C9.19972 30.8238 7.27713 28.4811 6.14181 25.7403C5.0065 22.9994 4.70945 19.9834 5.28823 17.0736C5.86701 14.1639 7.29562 11.4912 9.39341 9.3934C11.4912 7.29561 14.1639 5.867 17.0737 5.28822C19.9834 4.70944 22.9994 5.00649 25.7403 6.14181C28.4811 7.27712 30.8238 9.19971 32.472 11.6664C34.1203 14.1332 35 17.0333 35 20C35 23.9782 33.4197 27.7936 30.6066 30.6066C27.7936 33.4196 23.9783 35 20 35Z"
                    fill="white"
                  />
                  <path
                    d="M28.3874 11.6125C28.2712 11.4953 28.133 11.4023 27.9806 11.3389C27.8283 11.2754 27.6649 11.2428 27.4999 11.2428C27.3349 11.2428 27.1715 11.2754 27.0192 11.3389C26.8669 11.4023 26.7286 11.4953 26.6124 11.6125L19.9999 18.2375L13.3874 11.6125C13.152 11.3771 12.8328 11.2449 12.4999 11.2449C12.167 11.2449 11.8478 11.3771 11.6124 11.6125C11.377 11.8479 11.2448 12.1671 11.2448 12.5C11.2448 12.8329 11.377 13.1521 11.6124 13.3875L18.2374 20L11.6124 26.6125C11.4953 26.7287 11.4023 26.867 11.3388 27.0193C11.2753 27.1716 11.2427 27.335 11.2427 27.5C11.2427 27.665 11.2753 27.8284 11.3388 27.9807C11.4023 28.133 11.4953 28.2713 11.6124 28.3875C11.7286 28.5047 11.8669 28.5977 12.0192 28.6611C12.1715 28.7246 12.3349 28.7572 12.4999 28.7572C12.6649 28.7572 12.8283 28.7246 12.9806 28.6611C13.133 28.5977 13.2712 28.5047 13.3874 28.3875L19.9999 21.7625L26.6124 28.3875C26.7286 28.5047 26.8669 28.5977 27.0192 28.6611C27.1715 28.7246 27.3349 28.7572 27.4999 28.7572C27.6649 28.7572 27.8283 28.7246 27.9806 28.6611C28.133 28.5977 28.2712 28.5047 28.3874 28.3875C28.5046 28.2713 28.5976 28.133 28.661 27.9807C28.7245 27.8284 28.7572 27.665 28.7572 27.5C28.7572 27.335 28.7245 27.1716 28.661 27.0193C28.5976 26.867 28.5046 26.7287 28.3874 26.6125L21.7624 20L28.3874 13.3875C28.5046 13.2713 28.5976 13.133 28.661 12.9807C28.7245 12.8284 28.7572 12.665 28.7572 12.5C28.7572 12.335 28.7245 12.1716 28.661 12.0193C28.5976 11.867 28.5046 11.7287 28.3874 11.6125Z"
                    fill="white"
                  />
                </svg>
              </div>
              <div className="flex flex-col items-center ">
                <div className="font-sans text-[1.5rem] text-white">
                  Log In To
                </div>
                <div className="font-sans text-[3.0rem] leading-[3rem] -tracking-[0.09rem] text-white font-extrabold">
                  Adira AI
                </div>
              </div>
              <div className="flex flex-col gap-3 pb-10">
                <form action="">
                  <div className="flex flex-col gap-2">
                    <div className="flex flex-row gap-2">
                      <input
                        required
                        name="firstName"
                        placeholder="First Name"
                        className="w-1/2 pl-4 p-1 bg-customInput text-black rounded-[0.625rem] border-2 border-black "
                        onChange={handleChange}
                        value={formData.firstName}
                        type="text"
                      />
                      <input
                        required
                        name="lastName"
                        placeholder="Last Name"
                        className="w-1/2 pl-4 p-2 text-black bg-customInput rounded-[0.625rem] border-2 border-black "
                        onChange={handleChange}
                        value={formData.lastName}
                        type="text"
                      />
                    </div>
                    <div className="flex flex-row gap-2">
                      <input
                        required
                        name="number"
                        placeholder="Enter your Number"
                        className="w-3/4 pl-4 p-2  bg-customInput rounded-[0.625rem] border-2 border-black text-black "
                        type="text"
                        onChange={handleChange}
                        value={formData.number}
                      />
                      <button
                        onClick={onsubmithandle}
                        className="w-1/4   text-center p-2 bg-customOTP rounded-[0.625rem] border-customBORDER border-2 hover:cursor-pointer"
                      >
                        Send OTP
                      </button>
                    </div>
                  </div>
                </form>
                {!verifyOTP && (
                  <form action="">
                    <div className="flex flex-row gap-2">
                      <input
                        required
                        name="otp"
                        placeholder="OTP"
                        className="w-2/3 pl-4 p-2 text-black bg-customInput rounded-[0.625rem] border-2 border-black "
                        type="text"
                        value={otp}
                        onChange={(e) => setotp(e.value)}
                      />
                      <div className="w-1/3 p-2  text-center text-nowrap  text-white border-white rounded-[0.625rem]  border-2 hover:cursor-pointer">
                        Resend OTP
                      </div>
                      <div className="w-1/3 p-2  text-center  bg-customOTP rounded-[0.625rem] border-customBORDER border-2 hover:cursor-pointer">
                        Verify OTP
                      </div>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Hero;
