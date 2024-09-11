import axios from "axios";
import React, { useEffect, useState } from "react";
import { NODE_API_ENDPOINT, trimQuotes } from "../../utils/utils";
import { useSelector, useDispatch } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Markdown from "react-markdown";
import loaderGif from "../../assets/icons/2.gif";
import Snackbar, { SnackbarCloseReason } from "@mui/material/Snackbar";
import { setBreakoutData } from "../../features/breakoutSlice";
const DirectionDialog = () => {
  const dispatch = useDispatch();

  let navigate = useNavigate();
  let location = useLocation();
  let { id: paramsId } = useParams();
  const doc_id = useSelector((state) => state.document.docId);
  const breakoutData = useSelector((state) => state.breakout.breakoutData);
  const headpoints = breakoutData.data.fetchedData.headpoints;

  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState("");
  const [open, setOpen] = useState(false);
  const [selectedHeadpoint, setSlectedHeadpont] = useState("");

  const index = parseInt(location.pathname.slice(-1));
  useEffect(() => {
    if (paramsId >= 0 && paramsId < headpoints.length) {
      fetchData(headpoints[paramsId]);
      setSlectedHeadpont(headpoints[paramsId]);
    }
  }, [paramsId, headpoints]);

  const fetchData = async (headpoint) => {
    setisLoading(true);
    const res = await axios.post(
      `${NODE_API_ENDPOINT}/ai-drafter/counter_favor`,
      {
        doc_id,
        headpoint_to_find: headpoint,
      }
    );
    const temp = res.data.data.fetchedData.counter_favourable;
    setData(temp);
    setisLoading(false);
  };
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setOpen(false);
  };
  const handleRepharse = async () => {
    try {
      var config = {
        method: "post",
        url: `${NODE_API_ENDPOINT}/ai-drafter/api/get_modified_doc`,
        data: {
          doc_id: doc_id,
        },
      };
      const res = await axios.request(config);
      dispatch(setBreakoutData(res.data));

      setOpen(true);
      console.log(res);
    } catch (e) {}
  };
  return (
    <>
      <div className="flex flex-col h-[65vh] font-sans gap-4 p-4 text-white ">
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
            className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1"
            onClick={() => navigate(`/Snippets/Neutral/${paramsId}`)} // Use navigate instead of <a>
          >
            How to make Neutral
          </button>
          <button
            className="rounded border-[1px] w-fit p-2 hover:bg-hover-gradient hover:text-black hover:border-0 py-1 bg-customBlue"
            onClick={() => navigate(`/Snippets/Direction/${index}`)} // Use navigate instead of <a>
          >
            Bend in Opp. Direction
          </button>
        </div>
        {!isLoading ? (
          <div className="flex overflow-y-auto scrollbar-hide h-full flex-col gap-2 text-justify font-sans text-white m-5 ">
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
      <div className="flex flex-row  w-full justify-end items-center px-5 font-semibold space-x-5">
        <button
          onClick={handleRepharse}
          className="bg-card-gradient p-2 border border-white rounded-md"
        >
          Rephrase
        </button>
      </div>
      <div className="w-10 h-10">
        <Snackbar
          open={open}
          autoHideDuration={5000}
          onClose={handleClose}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
          message="YOUR DOCUMENT HAS BEEN UPADTED"
        ></Snackbar>
      </div>
    </>
  );
};

export default DirectionDialog;
