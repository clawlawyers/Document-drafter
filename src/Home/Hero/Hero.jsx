import React, { useEffect, useState } from "react";
import Footer from "../../components/ui/Footer";
import HomeNav from "../../components/Navbar/HomeNav";
import HeroPage from "../../components/ui/HeroPage";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../features/authSlice";
import { useNavigate, useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";

const Hero = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const currentUser = useSelector((state) => state.auth.user);
  const [params, setParams] = useSearchParams();
  const user = params.get("user");

  const [userAuth, setUserS] = useState(user);

  useEffect(() => {
    if (currentUser) {
      params.delete("user");
      setParams(params);
      return;
    }
    if (!userAuth) {
      return;
    }
    setParams(params);
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
          <div className={`flex flex-row justify-end gap-3`}>
            
          </div>
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
