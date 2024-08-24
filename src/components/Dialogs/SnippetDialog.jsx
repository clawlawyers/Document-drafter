import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { twMerge } from "tailwind-merge";

const SnippetDialog = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const breakout = useSelector((state) => state.breakout);
  console.log(breakout);
  const [headPoints, setHeadPoints] = useState([]);
  const [details, setDetails] = useState([]);

  useEffect(() => {
    if (breakout.breakoutData) {
      console.log(breakout?.greenHeading);
      setHeadPoints(
        breakout.breakoutData.data.fetchedData.headpoints.map(
          (heading) => heading.replace(/^#+\s*/, "") // Remove leading # symbols
        ) || []
      );
      setDetails(
        breakout.breakoutData.data.fetchedData.details.map(
          (detail) => detail.replace(/[()]/g, "") // Remove leading # symbols
        ) || []
      );
    }
  }, [breakout]);

  const combinedData = headPoints.map((heading, index) => ({
    heading,
    text: details[index] || "", // Ensure text exists for each heading
  }));

  return (
    <div className="hide-scrollbar overflow-y-auto flex flex-col gap-5 mx-6 my-5 h-[65vh]">
      {combinedData.map((item, i) => (
        <div key={i} className="flex flex-row items-center gap-3">
          <div
            className={twMerge(
              "flex flex-col rounded-[0.635rem] border-2 px-4 py-2 border-white bg-popup-gradient w-3/4 gap-1",
              breakout?.greenHeading?.includes(`${i + 1}`) && "border-green-500"
            )}
          >
            <div className="font-sans text-[1.125rem] font-bold leading-[1.13625rem]">
              <Markdown>{item.heading}</Markdown>
            </div>
            <div className="font-sans  text-[0.625rem] w-fit break-words overflow-wrap break-word word-wrap break-word">
              <Markdown>{item.text}</Markdown>
            </div>
          </div>
          <div className="w-1/4 flex gap-4 flex-col text-[0.6875rem] font-sans">
            <div className="flex gap-3 text-xs">
              <button
                className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-1"
                onClick={() => navigate(`/Snippets/Summary/${i}`)} // Use navigate instead of <a>
              >
                Summary
              </button>
              <button
                className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-1"
                onClick={() => navigate(`/Snippets/Favour/${i}`)} // Use navigate instead of <a>
              >
                In whose favour
              </button>
            </div>
            <div className="flex text-[0.5625rem] -tracking-[0.01688rem] gap-3">
              <button
                className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-1"
                onClick={() => navigate(`/Snippets/Neutral/${i}`)} // Use navigate instead of <a>
              >
                How to make neutral
              </button>
              <button
                className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-1"
                onClick={() => navigate(`/Snippets/Direction/${i}`)} // Use navigate instead of <a>
              >
                Bend in Opp. Direction
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SnippetDialog;
