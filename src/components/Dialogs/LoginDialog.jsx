import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { setFormData, setOtpVerified } from "../../features/authSlice";
import CloseIcon from "../../assets/svg/CloseIcon";

const LoginDialog = ({ setLoginPopup }) => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const dispatch = useDispatch();
  const { isOtpVerified } = useSelector((state) => state.auth);
  const [localOtp, setLocalOtp] = useState('');

  const onsubmithandle = (data) => {
   
    if (isOtpVerified) {
      dispatch(setFormData(data));
      setLoginPopup(false);
    } else {
      alert("Please verify the OTP first.");
    }
  };

  const handleVerifyOtp = () => {
    // Simulate OTP verification logic
    const enteredOtp = localOtp;
    const correctOtp = "123456"; 

    if (enteredOtp === correctOtp) {
      dispatch(setOtpVerified(true));
      
      alert("OTP Verified Successfully!");
    } else {
      alert("Incorrect OTP. Please try again.");
    }
  };

  const handleOtpChange = (e) => {
    setLocalOtp(e.target.value);
  };

  return (
    <div className="fixed flex backdrop-blur-sm w-full h-full items-center justify-center z-50">
      <div className="flex relative border-white border-2 rounded-[0.625rem] flex-col gap-12 p-10 bg-popup-gradient">
        <div
          className="absolute right-3 hover:cursor-pointer top-2"
          onClick={() => setLoginPopup(false)}
        >
          <CloseIcon />
        </div>
        <div className="flex flex-col items-center">
          <div className="font-sans text-[1.5rem] text-white">Log In To</div>
          <div className="font-sans text-[3.0rem] leading-[3rem] -tracking-[0.09rem] text-white font-extrabold">
            Adira AI
          </div>
        </div>
        <div className="flex flex-col gap-3 pb-10">
          <form onSubmit={handleSubmit(onsubmithandle)}>
            <div className="flex flex-col gap-2">
              <div className="flex flex-row gap-2">
                <input
                  {...register("firstName", { required: true })}
                  placeholder="First Name"
                  className="w-1/2 pl-4 p-1 bg-customInput text-black rounded-[0.625rem] border-2 border-black"
                  type="text"
                />
                {errors.firstName && <span className="text-red-500">First name is required</span>}
                
                <input
                  {...register("lastName", { required: true })}
                  placeholder="Last Name"
                  className="w-1/2 pl-4 p-2 text-black bg-customInput rounded-[0.625rem] border-2 border-black"
                  type="text"
                />
                {errors.lastName && <span className="text-red-500">Last name is required</span>}
              </div>
              <div className="flex flex-row gap-2">
                <input
                  {...register("number", { required: true })}
                  placeholder="Enter your Number"
                  className="w-3/4 pl-4 p-2 bg-customInput rounded-[0.625rem] border-2 border-black text-black"
                  type="text"
                  disabled={isOtpVerified}
                />
                {errors.number && <span className="text-red-500">Number is required</span>}
                
                <button
                  type="submit"
                  className="w-1/4 text-center p-2 bg-customOTP rounded-[0.625rem] border-customBORDER border-2 hover:cursor-pointer"
                >
                 {isOtpVerified ? "Sign In" : "Send OTP"}
                </button>
              </div>
            </div>
          </form>

          {!isOtpVerified && (
            <div className="flex flex-row gap-2">
              <input
                placeholder="OTP"
                className="w-2/3 pl-4 p-2 text-black bg-customInput rounded-[0.625rem] border-2 border-black"
                type="text"
                value={localOtp}
                onChange={handleOtpChange}
              />
              <div
                className="w-1/3 p-2 text-center text-nowrap text-white border-white rounded-[0.625rem] border-2 hover:cursor-pointer"
                onClick={() => { /* Resend OTP logic */ }}
              >
                Resend OTP
              </div>
              <div
                className="w-1/3 p-2 text-center bg-customOTP rounded-[0.625rem] border-customBORDER border-2 hover:cursor-pointer"
                onClick={handleVerifyOtp}
              >
                Verify OTP
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default LoginDialog;
