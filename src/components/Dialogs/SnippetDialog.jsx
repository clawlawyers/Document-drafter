import React, { useEffect, useState } from "react";
import Markdown from "react-markdown";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { twMerge } from "tailwind-merge";
// import { setGreenHeading } from "../../features/greenHeadingSlice";

const SnippetDialog = () => {
  const navigate = useNavigate(); // Initialize useNavigate
  const breakout = useSelector((state) => state.breakout);
  const greenHeading = useSelector((state) => state.greenHeading);
  console.log(breakout);
  const [headPoints, setHeadPoints] = useState([]);
  const [details, setDetails] = useState([]);
  // const dispatch = useDispatch();
  // dispatch(setGreenHeading([]));

  useEffect(() => {
    if (breakout.breakoutData) {
      // console.log(breakout?.greenHeading);
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

  console.log(combinedData);

  return (
    <>
      <div className="hide-scrollbar overflow-y-auto flex flex-col gap-5 mx-6 my-5 h-[65vh]">
        {combinedData.map((item, i) => (
          <div key={i} className="flex flex-row items-start gap-3">
            <div
              className={twMerge(
                "flex flex-col rounded-[0.635rem] border-2 px-4 py-2 border-white bg-popup-gradient w-3/4 gap-1 h-28", // Added h-64 for fixed height
                greenHeading.greenHeading?.includes(`${i + 1}`) &&
                  "border-green-500"
              )}
            >
              <div className="font-sans text-[1.125rem] font-bold leading-[1.13625rem] sticky top-0 bg-popup-gradient z-10">
                <Markdown>{item.heading}</Markdown>
              </div>
              <div className="font-sans text-[0.625rem] scrollbar-hide w-fit break-words overflow-wrap break-word word-wrap break-word overflow-y-auto flex-1">
                <Markdown>{item.text}</Markdown>
              </div>
            </div>
            <div className="w-1/4 flex gap-4 flex-col h-28 text-[0.6875rem] font-sans">
              <div className="flex gap-3 text-xs">
                <button
                  className="rounded border-[1px] text-center w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-2 pb-5 text-[0.6875rem]"
                  onClick={() => navigate(`/Snippets/Summary/${i}`)} // Use navigate instead of <a>
                >
                  Summary
                </button>
                <button
                  className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 pb-5 p-2 text-[0.6875rem]"
                  onClick={() => navigate(`/Snippets/Favour/${i}`)} // Use navigate instead of <a>
                >
                  In whose favour
                </button>
              </div>
              <div className="flex text-[0.6875rem] gap-3">
                <button
                  className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-2 text-[0.6875rem]"
                  onClick={() => navigate(`/Snippets/Neutral/${i}`)} // Use navigate instead of <a>
                >
                  How to make neutral
                </button>
                <button
                  className="rounded border-[1px] w-1/2 hover:bg-hover-gradient hover:text-black hover:border-0 p-2 text-[0.6875rem]"
                  onClick={() => navigate(`/Snippets/Direction/${i}`)} // Use navigate instead of <a>
                >
                  Bend in Opp. Direction
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex flex-row  w-full justify-end items-center px-5 font-semibold space-x-5">
        {/* <button
          onClick={() => navigate("/")}
          className="bg-card-gradient p-2 border border-white rounded-md"
        >
          New Document
        </button> */}
        <button
          onClick={() => {
            localStorage.setItem("SummaryPath", "/Snippets");
            navigate("/Summary");
          }}
          className="bg-card-gradient p-2 border border-white rounded-md"
        >
          Generate Summary
        </button>
        <button
          onClick={() => navigate("/DocPreview")}
          className="bg-card-gradient p-2 border border-white rounded-md"
        >
          Document Preview
        </button>
      </div>
    </>
  );
};

export default SnippetDialog;
