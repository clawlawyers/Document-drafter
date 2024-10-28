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
      href={homename !="HOME" ? "https://clawlaw-dev.netlify.app/":"/"}
        className="px-5 py-2  border-customBlue rounded-full border-[2px]"
        onClick={path.pathname!="/" ?() => navigation("/"):null}
      >

        <div className="flex flex-row items-center gap-2">
          {
            homename!="HOME" &&
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="18" viewBox="0 0 20 18" fill="none">
<path d="M10 0C10 0 3.814 5.34 0.357 8.232C0.246997 8.32785 0.15837 8.44575 0.0968683 8.57805C0.0353666 8.71036 0.00236362 8.85412 0 9C0 9.26522 0.105357 9.51957 0.292893 9.70711C0.48043 9.89464 0.734784 10 1 10H3V17C3 17.2652 3.10536 17.5196 3.29289 17.7071C3.48043 17.8946 3.73478 18 4 18H7C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17V13H12V17C12 17.2652 12.1054 17.5196 12.2929 17.7071C12.4804 17.8946 12.7348 18 13 18H16C16.2652 18 16.5196 17.8946 16.7071 17.7071C16.8946 17.5196 17 17.2652 17 17V10H19C19.2652 10 19.5196 9.89464 19.7071 9.70711C19.8946 9.51957 20 9.26522 20 9C19.9986 8.85132 19.9634 8.70491 19.897 8.57185C19.8307 8.43879 19.7349 8.32257 19.617 8.232C16.184 5.34 10 0 10 0Z" fill="#00969A"/>
</svg>
          }
<span className="font-sans">

        {homename}
</span>
        </div>
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
