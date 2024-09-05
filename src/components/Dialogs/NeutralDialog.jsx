import axios from "axios";
import React, { useEffect, useState } from "react";
import { NODE_API_ENDPOINT, trimQuotes } from "../../utils/utils";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import Markdown from "react-markdown";
import loaderGif from "../../assets/icons/2.gif";

const NeutralDialog = () => {
  let navigate = useNavigate();
  let location = useLocation();
  const doc_id = useSelector((state) => state.document.docId);
  const breakoutData = useSelector((state) => state.breakout.breakoutData);
  const headpoints = breakoutData.data.fetchedData.headpoints;

  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState("");
  const [selectedHeadpoint, setSlectedHeadpont] = useState("");

  const index = parseInt(location.pathname.slice(-1));
  useEffect(() => {
    if (index >= 0 && index < headpoints.length) {
      fetchData(headpoints[index]);
      setSlectedHeadpont(headpoints[index]);
    }
  }, [location, headpoints]);

  const fetchData = async (headpoint) => {
    setisLoading(true);
    const res = await axios.post(`${NODE_API_ENDPOINT}/ai-drafter/neutralize`, {
      doc_id,
      headpoint_to_find: headpoint,
    });
    const temp = res.data.data.fetchedData.steps_to_make_neutral;
    setData(temp);
    setisLoading(false);
  };
  return (
    <div className="flex flex-col h-[65vh] font-sans gap-4 p-4 text-white">
      <div className="bg-popup-gradient p-4 text-[1rem] font-bold  rounded-[0.625rem] border-2 border-white">
        <Markdown>{selectedHeadpoint}</Markdown>
      </div>
      <div className="flex flex-row gap-3  text-xs text-nowrap ">
        <button
          className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1"
          onClick={() => navigate(`/Snippets/Summary/${index}`)} // Use navigate instead of <a>
        >
          {" "}
          Summary
        </button>
        <button
          className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1"
          onClick={() => navigate(`/Snippets/Favour/${index}`)} // Use navigate instead of <a>
        >
          In whose favour
        </button>
        <button
          className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1 bg-customBlue"
          onClick={() => navigate(`/Snippets/Neutral/${index}`)} // Use navigate instead of <a>
        >
          How to make Neutral
        </button>
        <button
          className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1"
          onClick={() => navigate(`/Snippets/Direction/${index}`)} // Use navigate instead of <a>
        >
          Bend in Opp. Direction
        </button>
      </div>
      {!isLoading ? (
        <div className="flex h-full overflow-y-auto scrollbar-hide flex-col gap-2 text-justify font-sans text-white m-5 ">
          <Markdown>
            {trimQuotes(
              data
                .replace(/\\n/g, "\n\n")
                .replace(/\\t/g, "\t")
                .replace(/\\"/g, '"')
                .replace(/1\n"/g, "\n")
            )}
          </Markdown>
        </div>
      ) : (
        <div className="flex overflow-y-auto scrollbar-hide justify-center items-center h-full flex-col gap-2 text-justify font-sans text-white m-5 ">
          <img
            className="flex flex-row justify-center items-center w-40 h-40"
            src={loaderGif}
            alt="Loading..."
          />
        </div>
      )}
    </div>
  );
};

export default NeutralDialog;
