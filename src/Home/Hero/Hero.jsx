import React, {useEffect} from "react";
import Footer from "../../components/ui/Footer";
import HomeNav from "../../components/Navbar/HomeNav";
import HeroPage from "../../components/ui/HeroPage";
import aiIcon from "../../assets/icons/back.gif";
import { useDispatch } from "react-redux";
import  { setUser } from "../../features/authSlice"
import { LEGAL_GPT_ENDPOINT } from "../../utils/utils";

const Hero = () => {
  const dispatch =useDispatch()
  useEffect(() => {
    const handleMessage = (event) => {
      console.log("hi")
      // Ensure the message is from the expected origin
      if (event.origin === LEGAL_GPT_ENDPOINT) {
        if (event.data.msg === 'set-localstorage') {
          // Set the localStorage data
          const { token, user } = event.data.data;
          console.log("hello")  
          localStorage.setItem(token, user);
          dispatch(setUser(user))
          
          // localStorage.setItem('username', user);
          console.log('LocalStorage set:', { token, user });
        }
      }
    };

    // Add the message event listener
    window.addEventListener("message", handleMessage, false);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("message", handleMessage, false);
    };
  }, []);
  return (
    <div className="flex flex-col justify-center items-center w-full h-screen p-2 relative">
      <div
        className="w-full h-screen absolute p-3 rounded-lg"
        style={{
          background: `radial-gradient(circle at 50% 0%, #018585, transparent 45%)`,
        }}
      >
        <img className="w-full h-full opacity-50" src={aiIcon} />
      </div>
      <div
        className="flex flex-col h-screen w-full  z-20 gap-3 bg-black bg-opacity-20 rounded-lg p-4"
        style={{ boxShadow: "0 0 5px white, 0 0 10px white, 0 0 5px white" }}
      >
        <div className="h-[10%] w-full ">
          <HomeNav />
        </div>
        <div className="flex flex-col justify-between w-full h-full  ">
          <HeroPage></HeroPage>

          <Footer />
        </div>
      </div>
    </div>
  );
};

export default Hero;
