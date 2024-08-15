import React, { useState } from "react";
import { Add, Close, EmojiEmotions, Send } from "@mui/icons-material";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import UserModal from "../components/Modals/UserModal";
import Footer from "../components/ui/Footer";
import { CircularProgress } from "@mui/material";
import loaderGif from "../assets/icons/2.gif";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import {
  setDocId,
  clearDocId,
  setDocumentText,
  setEssentialRequirements,
  setOptionalRequirements,
} from "../features/DocumentSlice";
import { createDoc, getDocFromPrompt } from "../actions/createDoc";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const DrafterArgs = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const prompt = useSelector((state) => state.prompt.prompt);
  const docId = useSelector((state) => state.document.docId);
  const [documentText, setDocText] = useState("");
  const [EssentialReq, setEssentialReq] = useState([]);
  const [OptionalReq, setOptionalReq] = useState([]);
  const [openDialog, setOpenDialog] = useState(null); // { type: 'essential' | 'optional', index: number }
  const [newRequirement, setNewRequirement] = useState("");

  useEffect(() => {
    // Clear the previous docId on component mount
    dispatch(clearDocId());

    const fetchDocId = async () => {
      try {
        const data = await createDoc();
        const doc_id = data.data.data.fetchedData.doc_id;
        dispatch(setDocId(doc_id));
      } catch (error) {
        console.error("Failed to fetch document ID:", error);
      }
    };

    fetchDocId();
    if (docId && prompt) {
      fetchData();
    }
    else{
      navigate("/Drafter")
    }
  }, [dispatch]);

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const data = await getDocFromPrompt(docId, prompt);
      const docText = data.data.data.fetchedData.document;
      setDocText(docText);
      dispatch(setDocumentText(docText));

      const essentialRequirements =
        data.data.data.fetchedData.essential_requirements;
      setEssentialReq(essentialRequirements);
      dispatch(setEssentialRequirements(essentialRequirements));
      const optionalRequirements =
        data.data.data.fetchedData.optional_requirements;
      setOptionalReq(optionalRequirements);
      dispatch(setOptionalRequirements(optionalRequirements));
     
    } catch (e) {
      setDocText("")
      toast.error("Failed to fetch data")
      console.log(e);
    }
    finally{
      setIsLoading(false);
    }
  };

  const handleDialogToggle = (type, index) => {
    if (openDialog && openDialog.type === type && openDialog.index === index) {
      setOpenDialog(null); // Close dialog if it's already open
    } else {
      setOpenDialog({ type, index });
    }
    setNewRequirement("");
  };

  const handleAddRequirement = () => {
    if (openDialog) {
      if (openDialog.type === 'essential') {
        const updatedRequirements = [...EssentialReq];
        updatedRequirements[openDialog.index] = newRequirement;
        setEssentialReq(updatedRequirements);
        dispatch(setEssentialRequirements(updatedRequirements));
      } else if (openDialog.type === 'optional') {
        const updatedRequirements = [...OptionalReq];
        updatedRequirements[openDialog.index] = newRequirement;
        setOptionalReq(updatedRequirements);
        dispatch(setOptionalRequirements(updatedRequirements));
      }
    } else {
      // Add to the Essential Requirements list if no item is being edited
      setEssentialReq([...EssentialReq, newRequirement]);
      dispatch(setEssentialRequirements([...EssentialReq, newRequirement]));
    }
    handleDialogToggle(null, null); // Close the dialog
  };

  return (
    <div className="flex flex-col h-screen space-y-5 w-full p-5">
      <div className="flex flex-row justify-between w-full items-center">
        <NavbarRight showMenu={false} />
        <NavbarLeft />
      </div>

      <div className="flex space-x-5 flex-row w-full h-full justify-center items-center">
        <div className="w-[70%] space-y-5 flex flex-col h-full bg-customBlack rounded-md p-5">
          {/* user */}
          <div className="flex font-semibold text-lg gap-5 w-full flex-row justify-start items-center">
            <UserModal />
            <div className="h-20 items-center justify-center flex flex-col overflow-y-auto scrollbar-hide">
              {prompt}
              </div>
          </div>
          {/* arguments container */}
          <div className="bg-card-gradient scrollbar-hide overflow-y-auto scroll-smooth rounded-md w-full flex flex-col items-start p-5 h-96">
            {loading ? (
              <div className="flex flex-col h-full items-center justify-center w-full">
                <img
                  className="flex flex-row justify-center items-center w-40 h-40"
                  src={loaderGif}
                  alt="Loading..."
                />
              </div>
            ) : (
              <p>{documentText}</p>
            )}
          </div>
        </div>
        <div className="w-[30%] space-y-5 flex flex-col justify-center items-center h-full">
          <div className="w-full p-2 flex justify-center items-center h-full rounded-md flex-col bg-customBlack">
            {loading ? (
              <img
                className="flex flex-row justify-center items-center w-40 h-40"
                src={loaderGif}
                alt="Loading..."
              />
            ) : (
              <section className="w-full flex flex-col space-y-2 justify-between items-center">
                <div className="w-full overflow-y-auto scrollbar-hide flex flex-col space-y-5 justify-start items-center h-52">
                  <p className="font-semibold text-lg">Essential Requirement</p>
                  {/* cards */}
                  {EssentialReq.map((item, index) => (
                    <div key={index} className="relative bg-card-gradient text-sm p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                      <p>{item}</p>
                      <button
                        onClick={() => handleDialogToggle('essential', index)}
                        className="ml-auto">
                        {openDialog && openDialog.type === 'essential' && openDialog.index === index ? <Close /> : <Add />}
                      </button>
                      {openDialog && openDialog.type === 'essential' && openDialog.index === index && (
                        <div className="z-10 absolute left-0 bottom-[-4rem] bg-teal-500 border border-teal-600 rounded-md p-2 w-full">
                          <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            placeholder="Enter requirement"
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={handleAddRequirement}
                            className="ml-2 text-white">
                            <Send />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="w-full scrollbar-hide overflow-y-auto flex flex-col space-y-5 justify-start items-center h-52">
                  <p className="font-semibold text-lg">Optional Requirement</p>
                  {/* cards */}
                  {OptionalReq.map((item, index) => (
                    <div key={index} className="relative bg-card-gradient text-sm p-2 justify-between flex flex-row w-full border-2 border-white rounded-md">
                      <p>{item}</p>
                      <button
                        onClick={() => handleDialogToggle('optional', index)}
                        className="ml-auto">
                        {openDialog && openDialog.type === 'optional' && openDialog.index === index ? <Close /> : <Add />}
                      </button>
                      {openDialog && openDialog.type === 'optional' && openDialog.index === index && (
                        <div className="z-10 absolute left-0 bottom-[-4rem] bg-teal-500 border border-teal-600 rounded-md p-2 w-full">
                          <input
                            type="text"
                            value={newRequirement}
                            onChange={(e) => setNewRequirement(e.target.value)}
                            placeholder="Enter requirement"
                            className="w-full p-1 border border-gray-300 rounded-md"
                          />
                          <button
                            onClick={handleAddRequirement}
                            className="ml-2 text-white">
                            <Send />
                          </button>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <button onClick={() => navigate("/Drafter")} className="bg-btn-gradient p-[1em] px-[2em] rounded-md text-sm">
              Re-enter Prompt
            </button>
            <button onClick={() => navigate("/DocPreview")} className="bg-btn-gradient p-[1em] px-[2em] rounded-md text-sm">
              Generate Document
            </button>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DrafterArgs;
