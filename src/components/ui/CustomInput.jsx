import React from "react";

const CustomInput = () => {
  return (
    <div className="flex flex-row justify-center gap-5 items-center w-full">
      <input
        type="text"
        placeholder="Enter Your Prompt to Generate Document"
        className="p-2 w-full bg-slate-200 rounded-md text-neutral-800"
      />
      <button className="bg-btn-gradient p-2 px-9 rounded-md">Send</button>
    </div>
  );
};

export default CustomInput;
