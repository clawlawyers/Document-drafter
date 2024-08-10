import React, { useState } from "react";

const FavourDialog = () => {
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
    "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  ]);
  return (
    <div className="flex flex-col font-sans gap-4 p-4 text-white">
      <div className="bg-popup-gradient p-4 text-[1rem] font-bold  rounded-[0.625rem] border-2 border-white">
        Section 1.10.33 of "de Finibus Bonorum et Malorum", written by Cicero in
        45 BC
      </div>
      <div className="flex flex-row gap-3  text-xs text-nowrap ">
        <button className="rounded border-[1px]  hover:bg-hover-gradient hover:text-black hover:border-0  px-4 py-2 ">
          <a href="/snippets/summary">Summary</a>
        </button>
        <button className="rounded border-[1px]  hover:bg-hover-gradient hover:text-black hover:border-0 px-4  py-2 ">
          <a href="/snippets/neutral">How to make neutral</a>
        </button>
        <button className="rounded border-[1px]  hover:bg-hover-gradient hover:text-black hover:border-0  px-4 py-2 ">
          <a href="/snippets/direction">Bend in Opp. Direction</a>
        </button>
      </div>
      {!isLoading ? (
        <div className="flex flex-col gap-2 text-justify font-sans text-white m-5 ">
          {data.map((i) => (
            <div key={i}>
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry's standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book.
            </div>
          ))}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default FavourDialog;
