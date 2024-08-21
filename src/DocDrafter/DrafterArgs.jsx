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

const reqDoc =
  "Sale Agreement\n\nThis Sale Agreement is made and entered into on [DATE] by and between:\n\nSeller: [Seller's Name], residing at [Seller's Address]\nBuyer: [Buyer's Name], residing at [Buyer's Address]\n\nRecitals:\n\nWhereas the Seller is the sole and exclusive owner of the Property (as defined below) and desires to sell the Property to the Buyer, and the Buyer desires to purchase the Property from the Seller, on the terms and conditions set forth in this Agreement.\n\nNow, therefore, in consideration of the mutual covenants and agreements herein contained, the parties hereby agree as follows:\n\n1. Description of Property:\nThe property being sold under this Agreement is the real estate located at [Address/Legal Description], including all improvements, fixtures, and appurtenances thereto (the \"Property\"). The Property is more particularly described as [3-4 line detailed description].\n\n2. Purchase Price:\nThe total purchase price for the Property is [Amount in words] ([Amount in numbers]), payable as follows: (i) an initial deposit of [Deposit Amount] paid upon the execution of this Agreement, and (ii) the balance of [Balance Amount] to be paid at Closing (as defined below).\n\n3. Payment Terms:\nUpon the execution of this Agreement, the Buyer shall pay an initial deposit of [Deposit Amount] to the Seller. The remaining balance of [Balance Amount] shall be paid by the Buyer to the Seller at Closing.\n\n4. Closing:\nThe closing of the sale of the Property (the \"Closing\") shall take place on [Closing Date] at [Closing Location]. At Closing, the Seller shall deliver to the Buyer a duly executed and notarized warranty deed conveying good and marketable title to the Property, free and clear of all encumbrances, except for those permitted in this Agreement.\n\n5. Possession:\nUpon Closing, the Seller shall deliver full and exclusive possession of the Property to the Buyer, free and clear of any tenants or occupants.\n\n6. Conditions Precedent:\nThe obligations of the parties under this Agreement are subject to the following conditions precedent: (i) the Seller obtaining all necessary clearances and permits for the transfer of the Property, and (ii) there being no legal impediments or encumbrances affecting the Seller's ability to convey good and marketable title to the Property.\n\n7. Representations and Warranties:\nThe Seller represents and warrants that: (i) the Seller has good and marketable title to the Property, (ii) the Seller has the full right, power, and authority to sell the Property, and (iii) the Property is in good condition and repair, subject to normal wear and tear.\n\n8. Risk of Loss:\nThe risk of loss or damage to the Property shall remain with the Seller until the Closing. In the event of any such loss or damage prior to Closing, the Buyer shall have the option to terminate this Agreement or proceed with the transaction, with an appropriate adjustment to the Purchase Price.\n\n9. Governing Law:\nThis Agreement shall be governed by the laws of the State of [State]. The parties agree that the [Applicable Law 1] and [Applicable Law 2] shall apply to this transaction.\n\n10. Entire Agreement:\nThis Agreement constitutes the entire understanding and agreement between the parties with respect to the subject matter hereof and supersedes all prior agreements, understandings, negotiations, and discussions, whether oral or written, between the parties.\n\n11. Amendments:\nThis Agreement may only be amended, modified, or supplemented by a written instrument duly executed by the Seller and the Buyer.\n\n12. Miscellaneous:\na. Notices: All notices, demands, or other communications required or permitted to be given under this Agreement shall be in writing and delivered personally, sent by certified or registered mail, or transmitted by email.\nb. Severability: If any provision of this Agreement is held to be invalid or unenforceable, the remainder of this Agreement shall remain in full force and effect.\nc. Dispute Resolution: Any dispute arising out of or relating to this Agreement shall be resolved through mediation or, if mediation is unsuccessful, through binding arbitration in accordance with the rules of the [Dispute Resolution Authority].\nd. Force Majeure: Neither party shall be liable for any delay or failure to perform its obligations under this Agreement due to causes beyond its reasonable control, such as acts of God, war, riots, or natural disasters.\n\nIn Witness Whereof, the parties have executed this Sale Agreement as of the date first written above.\n\nSeller:\n[Seller's Name]\n\nBuyer:\n[Buyer's Name]\n\nWitnessed by:\n[Witness 1 Name]\n[Witness 2 Name]\n\nNotarized by:\n[Notary Public Name]";

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
    try {
      setIsLoading(true);
      const data = await getDocFromPrompt(docId, prompt);
      const docText = data.data.data.fetchedData.document;
      const test = docText.toString();
      console.log(typeof test);
      console.log(test);
      const draftText = trimQuotes(docText);
      setDocText(draftText);
      setDocText(reqDoc);
      dispatch(setUploadDocText(docText));

      const essentialRequirements =
        data.data.data.fetchedData.essential_requirements;
      setEssentialReq(essentialRequirements);
      dispatch(setEssentialRequirements(essentialRequirements));
      const optionalRequirements =
        data.data.data.fetchedData.optional_requirements;
      setOptionalReq(optionalRequirements);
      dispatch(setOptionalRequirements(optionalRequirements));
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
    if (path !== "docType") navigate("/DocPreview");
    else {
      try {
        setIsLoading(true);
        const res = await generateDocument(docId);
        console.log(res.data.data.fetchedData.document);
        setDocText(res.data.data.fetchedData.document);
      } catch (e) {
        console.log(e);
      } finally {
        setIsLoading(false);
      }
    }
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
    } catch (e) {
      console.log(e);
    }

    // You can send this final string to your API
    console.log(finalOptionalString); // Optional requirements in string format
    console.log(finalEssentialString); // Optional requirements in string format

    toast.success("Requirements saved successfully!");
  };

  return (
    <div className="flex flex-col h-screen space-y-5 w-full p-5">
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
                <div className="w-full overflow-y-auto scrollbar-hide flex flex-col space-y-4 justify-start items-center h-52">
                  <p className="font-semibold text-lg">
                    Essential Requirements
                  </p>
                  {EssentialReq.map((item, index) => (
                    <div key={index} className="w-full flex flex-col space-y-2">
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

                <div className="w-full overflow-y-auto scrollbar-hide flex flex-col space-y-4 justify-start items-center h-52">
                  <p className="font-semibold text-lg">Optional Requirements</p>
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
