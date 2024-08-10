import React from "react";

const HeroText = () => {
  return (
    <div className="flex flex-col gap-2 w-full items-center justify-center">
      <div className="flex flex-row w-full  space-x-5 justify-center items-start">
        <h4 className="text-teal-500 font-bold text-9xl">Adira AI</h4>
        <sup className="text-2xl">by CLAW</sup>
      </div>
      <p className="text-2xl">Adira AI Legal Document Drafter by CLAW</p>
    </div>
  );
};

export default HeroText;
