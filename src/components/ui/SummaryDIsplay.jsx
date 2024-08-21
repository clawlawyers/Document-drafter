import React, { useEffect, useState } from "react";
import { getSummary } from "../../actions/Summary";
import { useSelector } from "react-redux";

import loaderGif from "../../assets/icons/2.gif";
import toast from "react-hot-toast";
import Markdown from "react-markdown";
import { trimQuotes } from "../../utils/utils";

const SummaryDisplay = () => {
  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const doc_id = useSelector((state) => state.document.docId);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await getSummary(doc_id);
      let temp = String.raw`${res.data.data.fetchedData.summary}`;

// Replace \n with line breaks, \t with tabs, and \" with "
temp = temp.replace(/\\n/g, '\n\n').replace(/\\t/g, '\t').replace(/\\"/g, '"').replace(/1\n"/g, '\n');

console.log(temp);  // Check the processed text
   // Update state with processed text
 // Check the processed text
      // Update state with processed text

      setText(trimQuotes(temp));
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch ");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, [doc_id]);

  return (
    <div className="bg-card-gradient bg-cover rounded-md border border-white flex flex-col items-center justify-center h-full w-full p-2">
      <div className="flex flex-col w-full justify-start items-start h-[80vh] gap-3 ">
        <div className="flex flex-row pt-3">
          <p className="text-3xl font-semibold text-teal-500">Adira AI</p>
          <sup>by Claw</sup>
        </div>
        {loading ? (
          <div className="flex flex-col h-full items-center justify-center w-full">
            <img
              className="flex flex-row justify-center items-center w-40 h-40"
              src={loaderGif}
              alt="Loading..."
            />
          </div>
        ) : (
          <div
            id="summary-text"
            className="h-full overflow-y-auto scrollbar-hide"
          >
            <Markdown>{text}</Markdown>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;
