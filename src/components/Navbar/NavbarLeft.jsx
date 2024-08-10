import React from "react";
import UserModal from "../Modals/UserModal";

const NavbarLeft = () => {
  return (
    <div className="flex flex-row justify-end items-start gap-2">
      <div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="43"
          height="43"
          viewBox="0 0 43 43"
          fill="none"
        >
          <circle
            cx="21.5"
            cy="21.5"
            r="20.5"
            fill="#018081"
            stroke="black"
            stroke-width="2"
          />
          <path
            d="M22 10L34 21.7333H31V32H25V24.6667H19V32H13V21.7333H10L22 10Z"
            fill="white"
          />
        </svg>
      </div>
      <UserModal/>
    </div>
  );
};

export default NavbarLeft;
