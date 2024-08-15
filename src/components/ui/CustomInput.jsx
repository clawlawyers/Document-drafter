import React from "react";

const CustomInput = ({
  className,
  btn,
  placeholder,
  onChange,
  onSubmit,
  loading,
  value,
  required
}) => {
  return (
    <form
      onSubmit={onSubmit}
      className={`${className} flex flex-row justify-center gap-5 items-center w-full`}
    >
      <input
        type="text"
        placeholder={`${placeholder}`}
        className="p-2 w-full bg-slate-200 rounded-md text-neutral-800 border-2 outline-none border-teal-500"
        onChange={onChange}
        disabled={loading}
        value={value}
        required={required}
      />
      {btn ? (
        <button
          disabled={loading}
          type="submit"
          className={`${
            loading ? "pointer-events-none opacity-75 cursor-progress" : ""
          } bg-btn-gradient p-2 px-9 rounded-md`}
        >
          Send
        </button>
      ) : (
        <></>
      )}
    </form>
  );
};

export default CustomInput;
