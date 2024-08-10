import React from "react";

const CustomInput = ({ className, btn , placeholder }) => {
  return (
    <div
      className={`${className} flex flex-row justify-center gap-5 items-center w-full`}
    >
      <input
        type="text"
        placeholder={`${placeholder}`}
        className="p-2 w-full bg-slate-200 rounded-md text-neutral-800 border-2 outline-none border-teal-500"
      />
      {btn ? (
        <button className="bg-btn-gradient p-2 px-9 rounded-md">Send</button>
      ) : (
        <></>
      )}
    </div>
  );
};

export default CustomInput;
