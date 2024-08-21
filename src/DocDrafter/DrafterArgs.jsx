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
  setUploadDocText,
  setEssentialRequirements,
  setOptionalRequirements,
  clearDocumentState,
} from "../features/DocumentSlice";
import { createDoc, getDocFromPrompt } from "../actions/createDoc";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";
import { getRequirements, uploadOptional, uploadPre } from "../actions/DocType";
import { generateDocument } from "../actions/DocType";
import Markdown from "react-markdown";
import { trimQuotes } from "../utils/utils";


const DrafterArgs = () => {
  let path = localStorage.getItem("from");
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [loading, setIsLoading] = useState(false);
  const prompt = useSelector((state) => state.prompt.prompt);
  const docId = useSelector((state) => state.document.docId);

  const [uploadDocText, setDocText] = useState("");
  const [EssentialReq, setEssentialReq] = useState([]);
  const [OptionalReq, setOptionalReq] = useState([]);
  const [essentialInputs, setEssentialInputs] = useState({});
  const [optionalInputs, setOptionalInputs] = useState({});

  useEffect(() => {
    dispatch(clearDocId());

    const fetchDocId = async () => {
      try {
        const data = await createDoc().then((data) => {
          const doc_id = data.data.data.fetchedData.doc_id;
          console.log(doc_id);
          console.log(data);
          dispatch(setDocId(doc_id));
          if (doc_id && prompt) {
            if (path !== "docType") {
              fetchData();
            } else {
              fetchReq(doc_id);
            }
          }
        });

        console.log(docId);
      } catch (error) {
        console.error("Failed to fetch document ID:", error);
      }
    };
    fetchDocId();
  }, []);

  useEffect(() => {}, [docId]);

  const fetchReq = async (doc_id) => {
    console.log(docId);

    try {
      setIsLoading(true);
      const data = await getRequirements(doc_id, prompt);
      const res = data.data.data.fetchedData;

      setEssentialReq(res.essential_requirements);
      setOptionalReq(res.optional_requirements);

      // Initialize input state
      const initialEssentialInputs = {};
      res.essential_requirements.forEach((req) => {
        initialEssentialInputs[req] = "";
      });
      setEssentialInputs(initialEssentialInputs);

      const initialOptionalInputs = {};
      res.optional_requirements.forEach((req) => {
        initialOptionalInputs[req] = "";
      });
      setOptionalInputs(initialOptionalInputs);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      await getDocFromPrompt(docId, prompt).then((data)=> {

       const docText = data.data.data.fetchedData.document;
       setDocText(docText);
       dispatch(setUploadDocText(docText));
       
      const essentialRequirements =
        data.data.data.fetchedData.essential_requirements;
        setEssentialReq(essentialRequirements);
        dispatch(setEssentialRequirements(essentialRequirements));
      const optionalRequirements =
      data.data.data.fetchedData.optional_requirements;
      setOptionalReq(optionalRequirements);
      dispatch(setOptionalRequirements(optionalRequirements));
    });
    console.log(uploadDocText)
   
      
      
    } catch (e) {
      setDocText("");
      toast.error("Failed to fetch data");
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e, type) => {
    const { name, value } = e.target;

    if (type === "essential") {
      setEssentialInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    } else if (type === "optional") {
      setOptionalInputs((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleGenerate = async () => {
    navigate("/DocPreview");
  };

  const handleSaveRequirements = async (e) => {
    e.preventDefault();

    // Combine essential and optional inputs into a single object
    const allInputs = {
      essential_requirements: essentialInputs,
      optional_requirements: optionalInputs,
    };

    // Convert the essential requirements to a JSON string with indentation for readability
    const essentialJsonString = JSON.stringify(
      allInputs.essential_requirements,
      null,
      4
    ); // 'null, 4' adds indentation

    // Convert the optional requirements to a JSON string with indentation
    const optionalJsonString = JSON.stringify(
      allInputs.optional_requirements,
      null,
      4
    );

    // Final result where the JSON string is encapsulated as a plain string
    const finalEssentialString = essentialJsonString;
    const finalOptionalString = optionalJsonString;
    try {
      const res1 = await uploadPre(docId, finalEssentialString);
      console.log(res1);
      const res2 = await uploadOptional(docId, finalOptionalString);
      console.log(res2);
      const res = await generateDocument(docId);
        console.log(res.data.data.fetchedData.document);
        setDocText(res.data.data.fetchedData.document);
        dispatch(setUploadDocText(res.data.data.fetchedData.document))
    } catch (e) {
      console.log(e);
    }

    // You can send this final string to your API
    console.log(finalOptionalString); // Optional requirements in string format
    console.log(finalEssentialString); // Optional requirements in string format

    toast.success("Requirements saved successfully!");
    handleGenerate();

  };

  return (
    <div className="flex flex-col h-screen justify-between space-y-5 w-full p-5">
      <div className="flex flex-row justify-between w-full items-center">
        <NavbarRight showMenu={false} />
        <NavbarLeft />
      </div>

      <div className="flex space-x-5 flex-row w-full h-[70vh]  justify-center items-center">
        <div className="w-[70%] space-y-2 flex flex-col h-full bg-customBlack rounded-md px-5 py-5">
          {/* user */}
          <div className="flex font-semibold text-lg gap-5 w-full flex-row justify-start items-center">
            <UserModal />
            <div className="h-20 items-center justify-center flex flex-col overflow-y-auto scrollbar-hide">
              {prompt}
            </div>
          </div>
          {/* arguments container */}
          <div className="bg-card-gradient scrollbar-hide overflow-y-auto scroll-smooth rounded-md w-full flex flex-col items-start p-5 h-full">
            {loading ? (
              <div className="flex flex-col h-full items-center justify-center w-full">
                <img
                  className="flex flex-row justify-center items-center w-40 h-40"
                  src={loaderGif}
                  alt="Loading..."
                />
              </div>
            ) : (
              <p>
               {/* {uploadDocText && <Markdown>{trimQuotes(`${uploadDocText}`)}</Markdown>} */}
               <Markdown>{uploadDocText}</Markdown>

              </p>
            )}
          </div>
        </div>
        <div className="w-[30%] space-y-5 flex flex-col justify-center items-center h-full">
          <div className="w-full p-2 flex justify-center items-center h-[60vh] overflow-y-auto rounded-md flex-col bg-customBlack">
            {loading ? (
              <img
                className="flex flex-row justify-center items-center w-40 h-40"
                src={loaderGif}
                alt="Loading..."
              />
            ) : (
              <form
                onSubmit={handleSaveRequirements}
                className="w-full h-full flex flex-col space-y-4 justify-between items-center"
              >
                <div className="w-full  scrollbar-hide flex flex-col space-y-4 justify-start items-center h-52">
                  <p className="font-semibold text-lg">
                    Essential Requirements
                  </p>
                  <div className="w-full flex flex-col hide-scrollbar h-44 overflow-y-auto">

                  {EssentialReq.map((item, index) => (
                    <div key={index} className="w-full flex  flex-col space-y-2">
                      <label htmlFor={item} className="text-sm font-medium">
                        {item}
                      </label>
                      <input
                        type="text"
                        required
                        id={item}
                        name={item}
                        value={essentialInputs[item] || ""}
                        onChange={(e) => handleInputChange(e, "essential")}
                        placeholder={`Enter ${item}`}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                  </div>
                </div>

                <div className="w-full overflow-y-auto scrollbar-hide flex flex-col space-y-4 justify-start items-center h-52">
                  <p className="font-semibold text-lg">Optional Requirements</p>
                  <div className="w-full flex flex-col hide-scrollbar h-44 overflow-y-auto">

                  {OptionalReq.map((item, index) => (
                    <div key={index} className="w-full flex flex-col space-y-2">
                      <label htmlFor={item} className="text-sm font-medium">
                        {item}
                      </label>
                      <input
                        type="text"
                        id={item}
                        name={item}
                        value={optionalInputs[item] || ""}
                        onChange={(e) => handleInputChange(e, "optional")}
                        placeholder={`Enter ${item}`}
                        className="w-full p-2 border border-gray-300 rounded-md"
                      />
                    </div>
                  ))}
                  </div>
                </div>

                <button
                  type="submit"
                  className="bg-teal-600 text-white w-full py-2 rounded-md font-medium"
                >
                  Save Requirements
                </button>
              </form>
            )}
          </div>
          <div className="flex flex-row w-full justify-between items-center">
            <button
              onClick={() => navigate("/Drafter")}
              className="bg-btn-gradient p-[1em] px-[2em] rounded-md text-sm"
            >
              Re-enter Prompt
            </button>
            <button
              onClick={handleGenerate}
              className="bg-btn-gradient p-[1em] px-[2em] rounded-md text-sm"
            >
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
