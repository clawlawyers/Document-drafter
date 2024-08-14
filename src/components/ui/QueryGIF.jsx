import React from "react";
import gifs from "../../assets/icons/query.gif";
const QueryGIF = () => {
  return (
    <div className="flex flex-col gap-3 px-4  font-sans justify-center h-full items-center">
      <img className="h-[4.1rem]" src={gifs} alt="" />
      <div className="font-bold text-lg">Have A Querry ?</div>
      <div className="text-sm text-center px-7">
        Ask your querry and get relevant answers with respect to your document.
      </div>
    </div>
  );
};

export default QueryGIF;
