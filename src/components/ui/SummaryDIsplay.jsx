import React, { useEffect, useState } from "react";
import { getSummary } from "../../actions/Summary";
import { useSelector } from "react-redux";

import loaderGif from "../../assets/icons/2.gif";
import toast from "react-hot-toast";
const SummaryDisplay = () => {

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const doc_id = useSelector((state) => state.document.docId);

  const fetchSummary = async () => {
    setLoading(true);
    try {
      const res = await getSummary(doc_id);
      console.log(res.data.data.fetchedData.summary);
      setText(res.data.data.fetchedData.summary);
    } catch (e) {
      console.log(e);
      toast.error("Failed to fetch ")
     
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
            <p>
              {text || "Loading ..."}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SummaryDisplay;
