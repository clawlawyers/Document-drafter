import React, { useEffect, useState } from "react";
import Footer from "../../components/ui/Footer";
import HomeNav from "../../components/Navbar/HomeNav";
import HeroPage from "../../components/ui/HeroPage";
import { useDispatch, useSelector } from "react-redux";
import { setPlanData, setUser } from "../../features/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../../utils/utils";
import { current } from "@reduxjs/toolkit";

const Hero = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const [params, setParams] = useSearchParams();
  const user = params.get("user");

  const [userAuth, setUserS] = useState(user);
  const retrivePlan = async () => {
    console.log(currentUser.jwt);
    const res = await axios.get(
      `${NODE_API_ENDPOINT}/ai-drafter/retrive-adira_plan`,
      // {
      //   headers: {
      //     Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2NTg5NWQ0ZWQ5NjQyOTJkNjNkOGYzZCIsInBob25lTnVtYmVyIjoiOTc2MTM3MTM1MiIsInNlc3Npb25JZCI6IjY3NDlkN2RkMDczYmM1N2ZhYjc2OGMxNiIsImlhdCI6MTczMjg5MjYzNywiZXhwIjoxNzM1NDg0NjM3fQ.C0bwmaJ0dZBqKnAVOPSrr5Y7dfHjsQjmj6LpbwVzfss`,
      //     "Content-Type": "application/json",
      //   },
      {
        headers: {
          Authorization: `Bearer ${currentUser.jwt}`,
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(setPlanData(res.data.plan.plan));
    console.log(res.data.plan.plan);
  };

  useEffect(() => {
    // if (currentUser) {
    //   retrivePlan();
    //   params.delete("user");
    //   setParams(params);
    //   return;
    // }
    if (!userAuth) {
      return;
    }
    dispatch(setUser(JSON.parse(atob(userAuth))));
    params.delete("user");
    setParams(params);
    retrivePlan();
  }, []);

  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-2 relative">
      <div className="w-full h-screen absolute p-3 rounded-lg">
        {/* Video background */}
        <video
          className="w-full h-full object-cover opacity-65"
          autoPlay
          loop
          muted
          playsInline
        >
          <source
            src="https://res.cloudinary.com/dyuov6i8c/video/upload/v1732689934/LegalGPT/vnibvz9t1533t1bq2ekf.mp4"
            type="video/mp4"
          />
          Your browser does not support the video tag.
        </video>
      </div>

      <div
        className="flex flex-col h-screen w-full z-20 gap-3 bg-black bg-opacity-20 rounded-lg p-4"
        style={{ boxShadow: "0 0 5px white, 0 0 10px white, 0 0 5px white" }}
      >
        <div className="h-[10%] flex justify-between w-full ">
          <div className={`flex flex-row justify-end gap-3`}></div>
          <HomeNav />
        </div>
        <div className="flex flex-col justify-between w-full h-full">
          <HeroPage></HeroPage>
          <div className="w-full max-w-md"></div>
          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
