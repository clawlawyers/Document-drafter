import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeNav from "../components/Navbar/HomeNav";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import { useDispatch, useSelector } from "react-redux";
import loaderGif from "../assets/icons/2.gif";
import EditSidebar from "../components/ui/EditSidebar";
import { useNavigate } from "react-router-dom";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { formatPdfText, trimQuotes } from "../utils/utils";
import Accordion from "@mui/material/Accordion";
import Markdown from "react-markdown";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import { breakout } from "../actions/createDoc";
import { setBreakoutData } from "../features/breakoutSlice";
import axios from "axios";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { formatText } from "../utils/utils";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import PDFDownloadButton from "../PdfDownloader/PdfDoc";
import { Edit } from "@mui/icons-material";
import { setIsGenerateDocCalledFalse } from "../features/DocumentSlice";
import chatbot from "../assets/icons/chatbot.svg";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";

const DocEdit = ({ onSave }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const ediText = useSelector((state) => state.document.uploadDocText);

  console.log(ediText);
  const isGenerateDocCall = useSelector(
    (state) => state.document.IsGenerateDocCalled
  );
  const currentUser = useSelector((state) => state.auth.user);
  // console.log(ediText);
  const texteditable = useSelector((state) => state.document.uploadDocText);
  const doc_id = useSelector((state) => state.document.docId);

  const [text, setText] = useState("");
  const [loading, setLoading] = useState(false);
  const [activeSidebar, setActiveSidebar] = useState("preview");
  const [readyDownload, setReadyDownload] = useState(false);
  const [downlaodText, setDownloadText] = useState(ediText);
  const [savebutton, setsavebutton] = useState(true);
  const [chatbotDisplay, setchatbotDisplay] = useState(true);
  const [chatbotDisplay2, setchatbotDisplay2] = useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);
  const [chatbotSwitch, setchatbotSwitch] = React.useState(true);
  const [showMore1, setshowMore1] = useState(false);
  const [showMore2, setshowMore2] = useState(false);
  const [pageNo, setPageNo] = useState(0);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    query: "",
    comments: "",
    hour: null,
    date: null,
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    console.log(formData);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;

  console.log(doc_id);
  let count = 0;
  useEffect(() => {
    // console.log(ediText);
    if (ediText != null) {
      var data = ediText
        .replaceAll("\\\\n\\\\n", "<br/>")
        .replaceAll("\\\\n", "<br/>")
        .replaceAll("\\n\\n", "<br/>")
        .replaceAll("\\n", "<br/>")
        .replaceAll("\n", "<br/>")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "")
        .replaceAll(/\*\*(.*?)\*\*/g, "<strong>$1</strong>")
        .replaceAll("u20b9", "₹")
        .replaceAll(/\*([^*]+)\*/g, "<strong>$1</strong>")
        .replace(/\\u20B9/g, "₹")
        .replace(/\u20B9/g, "₹");
    }
    setText(data);
  }, [ediText]);

  useEffect(() => {
    if (isGenerateDocCall) {
      breakoutFunc();
    }
  }, []);

  const handleEditClick = () => {
    setActiveSidebar("edit");
  };

  const handlePreviewClick = () => {
    localStorage.setItem("SummaryPath", "/DocPreview");
    navigate("/summary");
  };

  const handleSave = () => {
    navigate("/Snippets");
  };

  const breakoutFunc = async () => {
    // setLoading(true);
    setsavebutton(false);
    try {
      const res = await breakout(doc_id, currentUser.jwt);

      if ((res.status = 204)) {
        setsavebutton(true);
      }
      dispatch(setBreakoutData(res.data));
      await axios.post(
        `${NODE_API_ENDPOINT}/ai-drafter/generate_db`,
        {
          doc_id: doc_id,
        },
        {
          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
        }
      );
    } catch (e) {
      console.log("breakout failed", e);
    } finally {
      setLoading(false);
      dispatch(setIsGenerateDocCalledFalse());
    }
  };
  const handlepdfdownload = async () => {
    // setLoading(true);
    try {
      const sendableDoc = ediText
        .replaceAll("\\\\n\\\\n", "\n  \n")
        .replaceAll("\\\\n", "\n")
        .replaceAll("\\n\\n", "\n \n")
        .replaceAll("\\n", "\n")
        .replaceAll("\n", "\n")
        .replaceAll("\\", "")
        .replaceAll('"', "")
        .replaceAll(":", " :")
        .replaceAll("#", "")
        .replaceAll('"', "");
      const response = await fetch(
        `${NODE_API_ENDPOINT}/ai-drafter/api/get_pdf`,
        {
          // Replace with your backend URL
          method: "POST",

          headers: {
            Authorization: `Bearer ${currentUser.jwt}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ document: sendableDoc }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to generate PDF");
      }

      // Assuming the backend sends the PDF as a blob
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);

      // Create a link to download the PDF
      const a = document.createElement("a");
      a.href = url;
      a.download = "Document.pdf";
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error generating PDF:", error);
    } finally {
      setLoading(false);
    }
  };
  let temp =
    'Here is a detailed Lease Agreement customized based on the provided details:\n\nLEASE AGREEMENT\n\nThis Lease Agreement is made and entered into on [DATE] by and between:\n\nLessor: [LESSOR\'S NAME], having its registered office at [LESSOR\'S ADDRESS] (hereinafter referred to as the "Lessor")\n\nAND\n\nLessee: [LESSEE\'S NAME], having its registered office at [LESSEE\'S ADDRESS] (hereinafter referred to as the "Lessee")\n\nDESCRIPTION OF PREMISES\nThe Lessor hereby leases to the Lessee the following property: [DETAILED DESCRIPTION OF LEASED PREMISES, INCLUDING ADDRESS, LEGAL DESCRIPTION, AND ANY UNIQUE IDENTIFIERS]. The leased premises is more particularly described and depicted in the attached Schedule A, which is incorporated herein by reference.\n\nLEASE TERM\nThe term of this Lease shall be for a period of [X] years, commencing on [START DATE] and ending on [END DATE] (the "Lease Term"), unless sooner terminated as provided herein. The Lessee shall have the option to renew this Lease for an additional [X] year term, subject to the terms and conditions set forth in the "Renewal" section below.\n\nMONTHLY RENT\nThe Lessee shall pay to the Lessor a monthly rent of Rs. [AMOUNT] (the "Monthly Rent"). The Monthly Rent shall be due and payable on the [DAY] day of each calendar month during the Lease Term.\n\nPAYMENT TERMS\nThe Lessee shall pay the Monthly Rent and all other sums due under this Lease in advance, without demand, deduction, or offset. Payments shall be made by [PAYMENT METHOD, e.g., check, electronic transfer, etc.]. A late fee of [X]% of the Monthly Rent shall be charged for any payment received after the [DAY] day of the month. In the event of non-payment, the Lessor shall have the right to terminate this Lease in accordance with the "Termination" section below.\n\nSECURITY DEPOSIT\nUpon execution of this Lease, the Lessee shall pay to the Lessor a security deposit in the amount of Rs. [AMOUNT] (the "Security Deposit"). The Security Deposit shall be held by the Lessor as security for the faithful performance by the Lessee of all the terms, covenants, and conditions of this Lease. The Security Deposit shall be returned to the Lessee, without interest, within [X] days after the expiration or earlier termination of this Lease, provided that the Lessee has fully performed all of its obligations under this Lease.\n\nUSE OF PROPERTY\nThe Lessee shall use and occupy the leased premises solely for the purpose of [PERMITTED USE] and for no other purpose without the prior written consent of the Lessor. The Lessee shall not use the leased premises for any unlawful or hazardous purpose, and shall comply with all applicable laws, rules, and regulations governing the use and occupation of the property.\n\nMAINTENANCE AND REPAIRS\nThe Lessee shall, at its own cost and expense, keep and maintain the leased premises in good condition and repair, including all structural and non-structural components, and shall make all necessary repairs and replacements. The Lessor shall be responsible for any major structural repairs to the building, provided that such repairs are not necessitated by the Lessee\'s negligence or misuse of the premises. The Lessee shall promptly notify the Lessor of any needed repairs or maintenance.\n\nUTILITIES AND SERVICES\nThe Lessee shall be responsible for the payment of all utility services provided to the leased premises, including but not limited to electricity, water, gas, telephone, internet, and any other services. The Lessee shall also be responsible for the payment of all applicable taxes, fees, and other charges associated with the use and occupation of the property.\n\nTERMINATION\nEither party may terminate this Lease by providing the other party with [X] months\' prior written notice. The Lessor shall have the right to terminate this Lease immediately upon the occurrence of any of the following events: (i) the Lessee\'s failure to pay the Monthly Rent or any other sums due hereunder, (ii) the Lessee\'s breach of any other term, covenant, or condition of this Lease, or (iii) the Lessee\'s insolvency, bankruptcy, or assignment for the benefit of creditors.\n\nRENEWAL\nUpon the expiration of the initial Lease Term, the Lessee shall have the option to renew this Lease for an additional [X] year term, provided that the Lessee gives the Lessor written notice of its intent to renew at least [X] months prior to the expiration of the current Lease Term. The Monthly Rent for the renewal term shall be increased by [X]% of the current Monthly Rent.\n\nINSURANCE\nThe Lessee shall, at its own cost and expense, maintain a comprehensive general liability insurance policy with limits of not less than Rs. [AMOUNT] per occurrence and Rs. [AMOUNT] in the aggregate, naming the Lessor as an additional insured. The Lessee shall also maintain property insurance covering the leased premises and all of the Lessee\'s personal property located therein.\n\nSETTLEMENT\nUpon the expiration or earlier termination of this Lease, the Lessee shall surrender the leased premises in the same condition as it was at the commencement of the Lease Term, ordinary wear and tear excepted. The Lessor shall have the right to deduct from the Security Deposit any amounts necessary to repair any damage to the leased premises or to clean the premises. Any remaining balance of the Security Deposit shall be returned to the Lessee within [X] days of the termination or expiration of this Lease.\n\nGOVERNING LAW\nThis Lease Agreement shall be governed by and construed in accordance with the laws of the [STATE/PROVINCE] of [NAME]. The parties agree to submit to the exclusive jurisdiction of the courts of [CITY/JURISDICTION] for the resolution of any disputes arising under this Lease.\n\nENTIRE AGREEMENT\nThis Lease Agreement, including the attached Schedule A, constitutes the entire agreement between the parties and supersedes all prior agreements, understandings, and negotiations, whether oral or written, with respect to the subject matter hereof. This Lease may be amended or modified only by a written instrument signed by both the Lessor and the Lessee.\n\nMISCELLANEOUS\nThis Lease Agreement shall be binding upon and inure to the benefit of the parties hereto and their respective heirs, successors, and permitted assigns. If any provision of this Lease is found to be invalid or unenforceable, the remaining provisions shall continue to be valid and enforceable. This Lease may be executed in counterparts, each of which shall be deemed an original, and all of which together shall constitute one and the same instrument.\n\nIN WITNESS WHEREOF, the parties have executed this Lease Agreement as of the date first written above.\n\nLESSOR:\n[LESSOR\'S NAME]\n\nBy: _____________________________\nName: [NAME]\nTitle: [TITLE]\n\nLESSEE:\n[LESSEE\'S NAME]\n\nBy: _____________________________\nName: [NAME]\nTitle: [TITLE]\n\nWITNESSES:\n1. _____________________________\nName: [NAME]\n\n2. _____________________________\nName: [NAME]\n\nNOTARY PUBLIC:\n_____________________________\nName: [NAME]\nSeal:';

  const setSwitch = (e) => {
    // console.log("asdas")
    setchatbotSwitch(false);
  };

  const handleNext1 = (e) => {
    e.preventDefault();
    setPageNo(1);
  };

  const handleNext2 = (e) => {
    // if(formData.hour ==null || formData.date ==null){
    //   return
    // }

    setPageNo(3);
  };

  const chatbotData = [
    <>
      <p className="text-[10px]  mb-4">
        Talk to an Expert Lawyer at your convenient time by entering some
        important details below
      </p>
      <form
        onSubmit={handleNext1}
        className="text-[10px] bg-white p-2 rounded-md"
      >
        <div className="mb-2 text-xs">
          <input
            type="text"
            required
            value={formData.name}
            name="name"
            onChange={handleChange}
            placeholder="Enter Your Full Name"
            className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
          />
        </div>
        <div className="mb-2">
          <input
            type="email"
            required
            value={formData.email}
            onChange={handleChange}
            name="email"
            placeholder="Enter Your Email ID"
            className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            required
            value={formData.mobile}
            name="mobile"
            onChange={handleChange}
            placeholder="Enter Your Mobile Number"
            className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
          />
        </div>
        <div className="mb-2">
          <input
            type="text"
            name="query"
            required
            value={formData.query}
            onChange={handleChange}
            placeholder="Put Your Query Heading"
            className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
          />
        </div>
        <div className="mb-2">
          <textarea
            required
            value={formData.comments}
            name="comments"
            onChange={handleChange}
            placeholder="Specify Your Query or Add any Additional Comments"
            className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400 resize-none"
            rows="4"
          ></textarea>
        </div>
        <div className="flex justify-end">
          <button
            type="submit"
            className="w-[50%]  bg-logo-gradient p-2 rounded-md text-white font-semibold hover:bg-teal-700"
          >
            Next
          </button>
        </div>
      </form>
    </>,
    <>
      <p className="text-[10px]  mb-4">
        Talk to an Expert Lawyer at your convenient time by entering some
        important details below
      </p>

      <div className="text-[10px] mb-20 flex flex-col gap-3 bg-white p-2 rounded-md">
        <Accordion
          style={{
            backgroundColor: "#004343",
            font: "",
            boxShadow: "0px",
            "border-radius": "5px",
          }}
          className=" rounded-md bg-[#004343]"
        >
          <AccordionSummary
            expandIcon={
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 18 18"
                fill="none"
              >
                <path
                  d="M9 10.8C9.178 10.8 9.35201 10.7472 9.50001 10.6483C9.64802 10.5494 9.76337 10.4089 9.83149 10.2444C9.89961 10.08 9.91743 9.899 9.88271 9.72442C9.84798 9.54984 9.76226 9.38947 9.6364 9.2636C9.51053 9.13774 9.35016 9.05202 9.17558 9.01729C9.001 8.98257 8.82004 9.00039 8.65558 9.06851C8.49113 9.13663 8.35057 9.25198 8.25168 9.39999C8.15278 9.54799 8.1 9.722 8.1 9.9C8.1 10.1387 8.19482 10.3676 8.3636 10.5364C8.53239 10.7052 8.7613 10.8 9 10.8ZM13.5 10.8C13.678 10.8 13.852 10.7472 14 10.6483C14.148 10.5494 14.2634 10.4089 14.3315 10.2444C14.3996 10.08 14.4174 9.899 14.3827 9.72442C14.348 9.54984 14.2623 9.38947 14.1364 9.2636C14.0105 9.13774 13.8502 9.05202 13.6756 9.01729C13.501 8.98257 13.32 9.00039 13.1556 9.06851C12.9911 9.13663 12.8506 9.25198 12.7517 9.39999C12.6528 9.54799 12.6 9.722 12.6 9.9C12.6 10.1387 12.6948 10.3676 12.8636 10.5364C13.0324 10.7052 13.2613 10.8 13.5 10.8ZM9 14.4C9.178 14.4 9.35201 14.3472 9.50001 14.2483C9.64802 14.1494 9.76337 14.0089 9.83149 13.8444C9.89961 13.68 9.91743 13.499 9.88271 13.3244C9.84798 13.1498 9.76226 12.9895 9.6364 12.8636C9.51053 12.7377 9.35016 12.652 9.17558 12.6173C9.001 12.5826 8.82004 12.6004 8.65558 12.6685C8.49113 12.7366 8.35057 12.852 8.25168 13C8.15278 13.148 8.1 13.322 8.1 13.5C8.1 13.7387 8.19482 13.9676 8.3636 14.1364C8.53239 14.3052 8.7613 14.4 9 14.4ZM13.5 14.4C13.678 14.4 13.852 14.3472 14 14.2483C14.148 14.1494 14.2634 14.0089 14.3315 13.8444C14.3996 13.68 14.4174 13.499 14.3827 13.3244C14.348 13.1498 14.2623 12.9895 14.1364 12.8636C14.0105 12.7377 13.8502 12.652 13.6756 12.6173C13.501 12.5826 13.32 12.6004 13.1556 12.6685C12.9911 12.7366 12.8506 12.852 12.7517 13C12.6528 13.148 12.6 13.322 12.6 13.5C12.6 13.7387 12.6948 13.9676 12.8636 14.1364C13.0324 14.3052 13.2613 14.4 13.5 14.4ZM4.5 10.8C4.678 10.8 4.85201 10.7472 5.00001 10.6483C5.14802 10.5494 5.26337 10.4089 5.33149 10.2444C5.39961 10.08 5.41743 9.899 5.38271 9.72442C5.34798 9.54984 5.26226 9.38947 5.1364 9.2636C5.01053 9.13774 4.85016 9.05202 4.67558 9.01729C4.501 8.98257 4.32004 9.00039 4.15558 9.06851C3.99113 9.13663 3.85057 9.25198 3.75168 9.39999C3.65278 9.54799 3.6 9.722 3.6 9.9C3.6 10.1387 3.69482 10.3676 3.8636 10.5364C4.03239 10.7052 4.2613 10.8 4.5 10.8ZM15.3 1.8H14.4V0.9C14.4 0.661305 14.3052 0.432387 14.1364 0.263604C13.9676 0.0948211 13.7387 0 13.5 0C13.2613 0 13.0324 0.0948211 12.8636 0.263604C12.6948 0.432387 12.6 0.661305 12.6 0.9V1.8H5.4V0.9C5.4 0.661305 5.30518 0.432387 5.1364 0.263604C4.96761 0.0948211 4.73869 0 4.5 0C4.2613 0 4.03239 0.0948211 3.8636 0.263604C3.69482 0.432387 3.6 0.661305 3.6 0.9V1.8H2.7C1.98392 1.8 1.29716 2.08446 0.790812 2.59081C0.284464 3.09716 0 3.78392 0 4.5V15.3C0 16.0161 0.284464 16.7028 0.790812 17.2092C1.29716 17.7155 1.98392 18 2.7 18H15.3C16.0161 18 16.7028 17.7155 17.2092 17.2092C17.7155 16.7028 18 16.0161 18 15.3V4.5C18 3.78392 17.7155 3.09716 17.2092 2.59081C16.7028 2.08446 16.0161 1.8 15.3 1.8ZM16.2 15.3C16.2 15.5387 16.1052 15.7676 15.9364 15.9364C15.7676 16.1052 15.5387 16.2 15.3 16.2H2.7C2.46131 16.2 2.23239 16.1052 2.0636 15.9364C1.89482 15.7676 1.8 15.5387 1.8 15.3V7.2H16.2V15.3ZM16.2 5.4H1.8V4.5C1.8 4.2613 1.89482 4.03239 2.0636 3.8636C2.23239 3.69482 2.46131 3.6 2.7 3.6H15.3C15.5387 3.6 15.7676 3.69482 15.9364 3.8636C16.1052 4.03239 16.2 4.2613 16.2 4.5V5.4ZM4.5 14.4C4.678 14.4 4.85201 14.3472 5.00001 14.2483C5.14802 14.1494 5.26337 14.0089 5.33149 13.8444C5.39961 13.68 5.41743 13.499 5.38271 13.3244C5.34798 13.1498 5.26226 12.9895 5.1364 12.8636C5.01053 12.7377 4.85016 12.652 4.67558 12.6173C4.501 12.5826 4.32004 12.6004 4.15558 12.6685C3.99113 12.7366 3.85057 12.852 3.75168 13C3.65278 13.148 3.6 13.322 3.6 13.5C3.6 13.7387 3.69482 13.9676 3.8636 14.1364C4.03239 14.3052 4.2613 14.4 4.5 14.4Z"
                  fill="white"
                />
              </svg>
            }
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "rgba(34, 34, 34,",
              // backgroundColor:"rgba(34, 34, 34, 0.8)",
              font: "",
              boxShadow: "0px",
              color: "white",
            }}
          >
            Select A Time Slot
          </AccordionSummary>
          <AccordionDetails></AccordionDetails>
        </Accordion>
        <Accordion
          style={{
            backgroundColor: "#004343",
            font: "",
            boxShadow: "0px",
            "border-radius": "5px",
          }}
          className=" rounded-md bg-[#004343]"
        >
          <AccordionSummary
            expandIcon={<ExpandMoreIcon className="text-white" />}
            aria-controls="panel1-content"
            id="panel1-header"
            style={{
              backgroundColor: "rgba(34, 34, 34,",
              // backgroundColor:"rgba(34, 34, 34, 0.8)",
              font: "",
              boxShadow: "0px",
              color: "white",
            }}
          >
            Select A Time Slot
          </AccordionSummary>
          <AccordionDetails>
            <div className="grid text-[8px] text-white grid-cols-4 gap-1">
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
              <div className="border  text-center border-white  rounded p-1">
                <span className="rounded">10:00 AM</span>
              </div>
            </div>
          </AccordionDetails>
        </Accordion>

        <div className="flex justify-end">
          <button
            onClick={handleNext2}
            className="w-[50%]  bg-logo-gradient p-2 rounded-md text-white font-semibold hover:bg-teal-700"
          >
            Next
          </button>
        </div>
      </div>
    </>,
    <>
      <p className="text-[10px]  mb-4">
        Talk to an Expert Lawyer at your convenient time by entering some
        important details below
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3  p-4 rounded-md bg-[#004343]">
          <div className="text-[15px] font-bold">
            Talk To An Dedicated Expert
          </div>
          <div>
            <ul className="list-disc text-xs list-inside">
              <li>1 : 1 Interaction with A Top Lawyer</li>
              <li>Dedicated Time Slot</li>
              <li>All Legal Query Consultation</li>
              <li>Other Legal Document Consultation</li>
            </ul>
          </div>
          {showMore2 && (
            <>
              <div className="text-[15px] font-bold">
                Document Generated ByAdira AI
              </div>
              <div>
                <ul className="list-disc text-xs list-inside">
                  <li>1:1 Consultation on Document Generated</li>
                  <li>Legal Advice & Doubt Clearance Document</li>
                  <li>Related Query Solving</li>
                </ul>
              </div>
            </>
          )}
          <div className="text-right">
            <span className="text-[15px] font-bold">₹699 </span>
            <span className="text-xs ">/slot</span>
          </div>
        </div>
        <div className="text-center p-3 font-bold bg-logo-gradient rounded">
          Proceed with Booking
        </div>
        {!showMore2 && (
          <div className="flex gap-3">
            <div className="w-2/3 text-xs">
              Consultation on Document Generated by ADIRA AI
            </div>
            <button
              onMouseDown={() => setshowMore2(true)}
              className="flex text-xs items-center gap-2 rounded border justify-center  w-1/3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <path
                  d="M7.33333 3.33333H4.66667V0.666667C4.66667 0.489856 4.59643 0.320287 4.4714 0.195262C4.34638 0.070238 4.17681 0 4 0C3.82319 0 3.65362 0.070238 3.5286 0.195262C3.40357 0.320287 3.33333 0.489856 3.33333 0.666667V3.33333H0.666667C0.489856 3.33333 0.320287 3.40357 0.195262 3.5286C0.070238 3.65362 0 3.82319 0 4C0 4.17681 0.070238 4.34638 0.195262 4.4714C0.320287 4.59643 0.489856 4.66667 0.666667 4.66667H3.33333V7.33333C3.33333 7.51014 3.40357 7.67971 3.5286 7.80474C3.65362 7.92976 3.82319 8 4 8C4.17681 8 4.34638 7.92976 4.4714 7.80474C4.59643 7.67971 4.66667 7.51014 4.66667 7.33333V4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333Z"
                  fill="white"
                />
              </svg>
              <span>Add</span>
            </button>
          </div>
        )}
      </div>
    </>,
    <>
      <p className="text-[10px]  mb-4">
        Choose one option from the below available facililties
      </p>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col border-2 border-white p-2 rounded bg-teal-900">
          <div onClick={()=>setPageNo(4)} className="text-white text-[12px] font-bold border-b-2 pb-1">
            Document Related Consultation
          </div>
          <div className="text-white pt-1 text-[10px]  ">
            For Consultation with our Expert on Legal Documents that you
            generated or might want to have.
          </div>
        </div>
        <div className="flex flex-col border-2 border-white p-2 rounded bg-teal-900">
          <div className="text-white text-[12px] font-bold border-b-2 pb-1">
            Document Legal Consultation
          </div>
          <div className="text-white pt-1 text-[10px] ">
            For Consultation with our Expert on Legal Matters that of any type
            and gain legal advice on topics of your choice
          </div>
        </div>
      </div>
      <div className="pb-[100px]"></div>
    </>,
    <>
      <div  className="flex flex-col gap-1">
        <p>Document Related Consultation</p>
        <p className="text-[10px]  mb-4">
          For Consultation with our Expert on Legal Documents that you generated
          or might want to have.
        </p>
      </div>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3  p-4 rounded-md bg-[#004343]">
          <div className="text-[15px] font-bold">
            Document Generated ByAdira AI
          </div>
          <div>
            <ul className="list-disc text-xs list-inside">
              <li>1:1 Consultation on Document Generated</li>
              <li>Legal Advice & Doubt Clearance Document</li>
              <li>Related Query Solving</li>
            </ul>
          </div>
          <div onClick={()=>{setPageNo(5)}} className="text-center text-[15px] p-2 border-2 py-1 rounded-md bg-logo-gradient">
            Proceed
          </div>
        </div>
        <div className="flex flex-col gap-3  p-4 rounded-md bg-[#004343]">
          <div className="text-[15px] font-bold">
            Consultation on an ExistingLegal Document
          </div>
          <div>
            <ul className="list-disc text-xs list-inside">
              <li>Legal Document Analysis</li>
              <li>Legal Advice & Doubt Clearance</li>
              <li>Legal Document Update Assistance</li>
            </ul>
          </div>
          <div className="text-center text-[15px] p-2 border-2 py-1 rounded-md bg-logo-gradient">
            Proceed
          </div>
        </div>
      </div>
    </>,
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col gap-3  p-4 rounded-md bg-[#004343]">
          <div className="text-[15px] font-bold">
            Document Generated ByAdira AI
          </div>
          <div>
            <ul className="list-disc text-xs list-inside">
              <li>1:1 Consultation on Document Generated</li>
              <li>Legal Advice & Doubt Clearance Document</li>
              <li>Related Query Solving</li>
            </ul>
          </div>
          {showMore1 && (
            <>
              <div className="text-[15px] font-bold">
                Talk To An Dedicated Expert
              </div>
              <div>
                <ul className="list-disc text-xs list-inside">
                  <li>1 : 1 Interaction with A Top Lawyer</li>
                  <li>Dedicated Time Slot</li>
                  <li>All Legal Query Consultation</li>
                  <li>Other Legal Document Consultation</li>
                </ul>
              </div>
            </>
          )}
          <div className="flex flex-row justify-between items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="15"
              height="15"
              viewBox="0 0 15 15"
              fill="none"
            >
              <path
                d="M7.5 15C3.375 15 0 11.625 0 7.5C0 3.375 3.375 0 7.5 0C11.625 0 15 3.375 15 7.5C15 11.625 11.625 15 7.5 15ZM7.5 1.25C4.0625 1.25 1.25 4.0625 1.25 7.5C1.25 10.9375 4.0625 13.75 7.5 13.75C10.9375 13.75 13.75 10.9375 13.75 7.5C13.75 4.0625 10.9375 1.25 7.5 1.25Z"
                fill="white"
              />
              <path
                d="M6.87472 11.25C6.62472 11.25 6.43722 11.125 6.24972 10.9375C5.93722 10.5 6.18722 9.875 6.87472 8.1875C6.99972 7.9375 7.12472 7.625 7.24972 7.375C6.99972 7.5625 6.62472 7.5625 6.37472 7.3125C6.12472 7.0625 6.12472 6.6875 6.37472 6.4375C6.49972 6.375 7.24972 5.625 8.12472 5.625C8.37472 5.625 8.56222 5.75 8.74972 5.9375C9.06222 6.375 8.81222 7 8.12472 8.6875C7.99972 8.9375 7.87472 9.25 7.74972 9.5C7.99972 9.3125 8.37472 9.3125 8.62472 9.5625C8.87472 9.8125 8.87472 10.1875 8.62472 10.4375C8.49972 10.5 7.74972 11.25 6.87472 11.25Z"
                fill="white"
              />
              <path
                d="M8.4375 4.99976C8.95527 4.99976 9.375 4.58002 9.375 4.06226C9.375 3.54449 8.95527 3.12476 8.4375 3.12476C7.91973 3.12476 7.5 3.54449 7.5 4.06226C7.5 4.58002 7.91973 4.99976 8.4375 4.99976Z"
                fill="white"
              />
              <path
                d="M8.43774 5.3125C7.75024 5.3125 7.18774 4.75 7.18774 4.0625C7.18774 3.375 7.75024 2.8125 8.43774 2.8125C9.12524 2.8125 9.68774 3.375 9.68774 4.0625C9.68774 4.75 9.12524 5.3125 8.43774 5.3125ZM8.43774 3.4375C8.06274 3.4375 7.81274 3.6875 7.81274 4.0625C7.81274 4.4375 8.06274 4.6875 8.43774 4.6875C8.81274 4.6875 9.06274 4.4375 9.06274 4.0625C9.06274 3.6875 8.81274 3.4375 8.43774 3.4375Z"
                fill="white"
              />
            </svg>
            <div>
              <span className="text-[15px] font-bold">₹0000 </span>
            </div>
          </div>
        </div>
        <div className="text-center p-3 font-bold bg-logo-gradient rounded">
          Proceed with Bookin
        </div>
        {!showMore1 && (
          <div className="flex gap-3">
            <div className="w-2/3 text-xs">
              Basic Consultation on Legal Matters
            </div>

            <button
              onClick={() => setshowMore1(true)}
              className="flex text-xs items-center gap-2 rounded border justify-center  w-1/3"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="8"
                height="8"
                viewBox="0 0 8 8"
                fill="none"
              >
                <path
                  d="M7.33333 3.33333H4.66667V0.666667C4.66667 0.489856 4.59643 0.320287 4.4714 0.195262C4.34638 0.070238 4.17681 0 4 0C3.82319 0 3.65362 0.070238 3.5286 0.195262C3.40357 0.320287 3.33333 0.489856 3.33333 0.666667V3.33333H0.666667C0.489856 3.33333 0.320287 3.40357 0.195262 3.5286C0.070238 3.65362 0 3.82319 0 4C0 4.17681 0.070238 4.34638 0.195262 4.4714C0.320287 4.59643 0.489856 4.66667 0.666667 4.66667H3.33333V7.33333C3.33333 7.51014 3.40357 7.67971 3.5286 7.80474C3.65362 7.92976 3.82319 8 4 8C4.17681 8 4.34638 7.92976 4.4714 7.80474C4.59643 7.67971 4.66667 7.51014 4.66667 7.33333V4.66667H7.33333C7.51014 4.66667 7.67971 4.59643 7.80474 4.4714C7.92976 4.34638 8 4.17681 8 4C8 3.82319 7.92976 3.65362 7.80474 3.5286C7.67971 3.40357 7.51014 3.33333 7.33333 3.33333Z"
                  fill="white"
                />
              </svg>
              <span>Add</span>
            </button>
          </div>
        )}
      </div>
    </>,
  ];
  return (
    <main className="h-screen font-sans w-full">
      <section className="flex flex-col p-5 space-y-5 items-center w-full h-full">
        {/* Navbar */}
        <div className="w-full justify-between items-center flex flex-row">
          <NavbarRight />
          <NavbarLeft />
        </div>

        <div className="flex flex-row w-full space-x-5  rounded-md h-[90%] justify-center items-start">
          <div className="flex flex-col bg-customBlack rounded-md w-[70%] h-full space-y-5 justify-between p-5">
            <div className="flex-1 h-full overflow-auto border-white bg-card-gradient flex flex-col justify-center  items-center border-2 rounded-md w-full">
              {loading ? (
                <img
                  className="flex flex-row justify-center items-center w-40 h-40"
                  src={loaderGif}
                  alt="Loading..."
                />
              ) : (
                <p
                  className=" text-sm hide-scrollbar p-2 h-full w-full overflow-y-auto overflow-wrap break-word word-wrap break-word"
                  // rehypePlugins={[rehypeRaw]}
                  dangerouslySetInnerHTML={{
                    __html: text,

                    // .replace(/\\n/, "<br></br>")
                    // .replace(/\\n\\n/, "<br></br><br></br>"),
                    // .replace(/\\/g, "") ,
                  }}
                >
                  {/* {trimQuotes(
                    formatText(
                      text
                        .replace(/\u20B9/g, "₹")
                        .replace(/\\n/, "<br></br>")
                        .replace(/\\n\\n/, "<br></br><br></br>")
                      // .replace(/\\/g, "")
                    )
                  )} */}
                </p>
              )}
            </div>
            <div className="flex flex-row  justify-between">
              <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "1rem", // Custom border radius
                  },
                  "& .MuiPaper-root::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                className="flex w-[30%] bg-transparent overflow-auto hide-scrollbar   rounded-2xl  "
              >
                <div className="p-4 rounded-2xl flex overflow-auto flex-col hide-scrollbar gap-4  bg-btn-gradient">
                  <div className="max-w-sm mx-auto flex flex-col gap-3 hide-scrollbar bg-[#00232F] text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex border-b-2 border-b-[#004343] pb-1 justify-around flex-row gap-2 scrollbar-hide  items-start">
                      <img src={chatbot} alt="" />

                      <h2 className="text-[15px] scrollbar-hide font-semibold mb-4">
                        How Can We Help You Today?
                      </h2>
                      <svg
                        onClick={handleClose}
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM14 26C11.6266 26 9.30655 25.2962 7.33316 23.9776C5.35977 22.6591 3.8217 20.7849 2.91345 18.5922C2.0052 16.3995 1.76756 13.9867 2.23058 11.6589C2.69361 9.33114 3.83649 7.19295 5.51472 5.51472C7.19296 3.83649 9.33115 2.6936 11.6589 2.23058C13.9867 1.76755 16.3995 2.00519 18.5922 2.91345C20.7849 3.8217 22.6591 5.35977 23.9776 7.33316C25.2962 9.30655 26 11.6266 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26Z"
                          fill="white"
                        />
                        <path
                          d="M20.7099 7.28994C20.617 7.19621 20.5064 7.12182 20.3845 7.07105C20.2627 7.02028 20.132 6.99414 19.9999 6.99414C19.8679 6.99414 19.7372 7.02028 19.6154 7.07105C19.4935 7.12182 19.3829 7.19621 19.2899 7.28994L13.9999 12.5899L8.70994 7.28994C8.52164 7.10164 8.26624 6.99585 7.99994 6.99585C7.73364 6.99585 7.47824 7.10164 7.28994 7.28994C7.10164 7.47824 6.99585 7.73364 6.99585 7.99994C6.99585 8.26624 7.10164 8.52164 7.28994 8.70994L12.5899 13.9999L7.28994 19.2899C7.19621 19.3829 7.12182 19.4935 7.07105 19.6154C7.02028 19.7372 6.99414 19.8679 6.99414 19.9999C6.99414 20.132 7.02028 20.2627 7.07105 20.3845C7.12182 20.5064 7.19621 20.617 7.28994 20.7099C7.3829 20.8037 7.4935 20.8781 7.61536 20.9288C7.73722 20.9796 7.86793 21.0057 7.99994 21.0057C8.13195 21.0057 8.26266 20.9796 8.38452 20.9288C8.50638 20.8781 8.61698 20.8037 8.70994 20.7099L13.9999 15.4099L19.2899 20.7099C19.3829 20.8037 19.4935 20.8781 19.6154 20.9288C19.7372 20.9796 19.8679 21.0057 19.9999 21.0057C20.132 21.0057 20.2627 20.9796 20.3845 20.9288C20.5064 20.8781 20.617 20.8037 20.7099 20.7099C20.8037 20.617 20.8781 20.5064 20.9288 20.3845C20.9796 20.2627 21.0057 20.132 21.0057 19.9999C21.0057 19.8679 20.9796 19.7372 20.9288 19.6154C20.8781 19.4935 20.8037 19.3829 20.7099 19.2899L15.4099 13.9999L20.7099 8.70994C20.8037 8.61698 20.8781 8.50638 20.9288 8.38452C20.9796 8.26266 21.0057 8.13195 21.0057 7.99994C21.0057 7.86793 20.9796 7.73722 20.9288 7.61536C20.8781 7.4935 20.8037 7.3829 20.7099 7.28994Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    {/* <hr className="bg-[#004343] border border-[#004343]" /> */}

                    {chatbotData[pageNo]}
                    {/* <form className="text-[10px] bg-white p-2 rounded-md">
                      <div className="mb-2 text-xs">
                        <input
                          type="text"
                          placeholder="Enter Your Full Name"
                          className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="email"
                          placeholder="Enter Your Email ID"
                          className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          placeholder="Enter Your Mobile Number"
                          className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="mb-2">
                        <input
                          type="text"
                          placeholder="Put Your Query Heading"
                          className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400"
                        />
                      </div>
                      <div className="mb-2">
                        <textarea
                          placeholder="Specify Your Query or Add any Additional Comments"
                          className="w-full p-2 rounded-md bg-[#004343] text-white placeholder-gray-400 resize-none"
                          rows="4"
                        ></textarea>
                      </div>
                      <div className="flex justify-end">

                        <button
                          type="submit"
                          className="w-[50%]  bg-logo-gradient p-2 rounded-md text-white font-semibold hover:bg-teal-700"
                        >
                          Next
                        </button>
                      </div>
                    </form> */}
                  </div>
                  {/* 
                  <div onclick={() => console.log("as")} className="p-1 rounded-sm flex justify-around bg-white">

                    <button onMouseDown={setSwitch} className="text-white rounded-md text-[12px] w-[50%] p-1   bg-[#004343] ">Talk To An Expert</button>
                    <button onclick={() => console.log("as")} className="text-[#004343] text-[12px] w-[50%] p-1  ">FAQs</button>
                  </div> */}
                </div>
              </Popover>

              <Popover
                id={id2}
                open={open2}
                anchorEl={anchorEl2}
                onClose={handleClose2}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                sx={{
                  "& .MuiPaper-root": {
                    borderRadius: "1rem", // Custom border radius
                  },
                  "& .MuiPaper-root::-webkit-scrollbar": {
                    display: "none",
                  },
                }}
                className="flex w-[40%] bg-transparent overflow-auto hide-scrollbar   rounded-2xl  "
              >
                <div className="p-4 rounded-2xl flex overflow-auto flex-col hide-scrollbar gap-4  bg-btn-gradient">
                  <div className="max-w-sm mx-auto flex flex-col gap-3 hide-scrollbar bg-[#00232F] text-white rounded-2xl p-6 shadow-lg">
                    <div className="flex border-b-2 border-b-[#004343] pb-1 justify-between flex-row gap-2 scrollbar-hide  items-start">
                      {/* <img src={chatbot} alt="" /> */}

                      <h2 className="text-[15px] scrollbar-hide font-semibold mb-4">
                        FrequentlyAsked Questions
                      </h2>
                      <svg
                        onClick={handleClose2}
                        xmlns="http://www.w3.org/2000/svg"
                        width="28"
                        height="28"
                        viewBox="0 0 28 28"
                        fill="none"
                      >
                        <path
                          d="M14 0C11.2311 0 8.52431 0.821086 6.22202 2.35943C3.91973 3.89777 2.12532 6.08427 1.06569 8.64243C0.00606596 11.2006 -0.271181 14.0155 0.269012 16.7313C0.809205 19.447 2.14258 21.9416 4.10051 23.8995C6.05845 25.8574 8.55301 27.1908 11.2687 27.731C13.9845 28.2712 16.7994 27.9939 19.3576 26.9343C21.9157 25.8747 24.1022 24.0803 25.6406 21.778C27.1789 19.4757 28 16.7689 28 14C28 10.287 26.525 6.72601 23.8995 4.1005C21.274 1.475 17.713 0 14 0ZM14 26C11.6266 26 9.30655 25.2962 7.33316 23.9776C5.35977 22.6591 3.8217 20.7849 2.91345 18.5922C2.0052 16.3995 1.76756 13.9867 2.23058 11.6589C2.69361 9.33114 3.83649 7.19295 5.51472 5.51472C7.19296 3.83649 9.33115 2.6936 11.6589 2.23058C13.9867 1.76755 16.3995 2.00519 18.5922 2.91345C20.7849 3.8217 22.6591 5.35977 23.9776 7.33316C25.2962 9.30655 26 11.6266 26 14C26 17.1826 24.7357 20.2348 22.4853 22.4853C20.2348 24.7357 17.1826 26 14 26Z"
                          fill="white"
                        />
                        <path
                          d="M20.7099 7.28994C20.617 7.19621 20.5064 7.12182 20.3845 7.07105C20.2627 7.02028 20.132 6.99414 19.9999 6.99414C19.8679 6.99414 19.7372 7.02028 19.6154 7.07105C19.4935 7.12182 19.3829 7.19621 19.2899 7.28994L13.9999 12.5899L8.70994 7.28994C8.52164 7.10164 8.26624 6.99585 7.99994 6.99585C7.73364 6.99585 7.47824 7.10164 7.28994 7.28994C7.10164 7.47824 6.99585 7.73364 6.99585 7.99994C6.99585 8.26624 7.10164 8.52164 7.28994 8.70994L12.5899 13.9999L7.28994 19.2899C7.19621 19.3829 7.12182 19.4935 7.07105 19.6154C7.02028 19.7372 6.99414 19.8679 6.99414 19.9999C6.99414 20.132 7.02028 20.2627 7.07105 20.3845C7.12182 20.5064 7.19621 20.617 7.28994 20.7099C7.3829 20.8037 7.4935 20.8781 7.61536 20.9288C7.73722 20.9796 7.86793 21.0057 7.99994 21.0057C8.13195 21.0057 8.26266 20.9796 8.38452 20.9288C8.50638 20.8781 8.61698 20.8037 8.70994 20.7099L13.9999 15.4099L19.2899 20.7099C19.3829 20.8037 19.4935 20.8781 19.6154 20.9288C19.7372 20.9796 19.8679 21.0057 19.9999 21.0057C20.132 21.0057 20.2627 20.9796 20.3845 20.9288C20.5064 20.8781 20.617 20.8037 20.7099 20.7099C20.8037 20.617 20.8781 20.5064 20.9288 20.3845C20.9796 20.2627 21.0057 20.132 21.0057 19.9999C21.0057 19.8679 20.9796 19.7372 20.9288 19.6154C20.8781 19.4935 20.8037 19.3829 20.7099 19.2899L15.4099 13.9999L20.7099 8.70994C20.8037 8.61698 20.8781 8.50638 20.9288 8.38452C20.9796 8.26266 21.0057 8.13195 21.0057 7.99994C21.0057 7.86793 20.9796 7.73722 20.9288 7.61536C20.8781 7.4935 20.8037 7.3829 20.7099 7.28994Z"
                          fill="white"
                        />
                      </svg>
                    </div>
                    <div className="flex flex-col gap-2">
                      <Accordion
                        style={{
                          backgroundColor: "#004343",
                          font: "",
                          boxShadow: "0px",
                          "border-radius": "5px",
                        }}
                        className=" rounded-md bg-[#004343]"
                      >
                        <AccordionSummary
                          expandIcon={<ExpandMoreIcon></ExpandMoreIcon>}
                          aria-controls="panel1-content"
                          id="panel1-header"
                          style={{
                            // backgroundColor:"rgba(34, 34, 34, 0.8)",
                            font: "",
                            boxShadow: "0px",
                            color: "white",
                          }}
                        >
                          Select A Time Slot
                        </AccordionSummary>
                        <AccordionDetails></AccordionDetails>
                      </Accordion>
                    </div>
                  </div>
                  {/* 
                  <div onclick={() => console.log("as")} className="p-1 rounded-sm flex justify-around bg-white">

                    <button onMouseDown={setSwitch} className="text-white rounded-md text-[12px] w-[50%] p-1   bg-[#004343] ">Talk To An Expert</button>
                    <button onclick={() => console.log("as")} className="text-[#004343] text-[12px] w-[50%] p-1  ">FAQs</button>
                  </div> */}
                </div>
              </Popover>
              <div
                onClick={handleClick}
                onMouseEnter={() => setchatbotDisplay(false)}
                onMouseLeave={() => setchatbotDisplay(true)}
                className={`flex    text-clip gap-2  rounded-full border-2 border-white p-2 bg-card-gradient  ${
                  chatbotDisplay ? "" : "typing-demo"
                }`}
              >
                <img src={chatbot} alt="" />
                {chatbotDisplay ? "" : <span>Talk to an Expert</span>}
              </div>
              {chatbotDisplay && (
                <div
                  onClick={handleClick2}
                  onMouseEnter={() => setchatbotDisplay2(false)}
                  onMouseLeave={() => setchatbotDisplay2(true)}
                  className={`flex   text-clip gap-2  rounded-full border-2 border-white p-2 bg-card-gradient  ${
                    chatbotDisplay2 ? "" : "typing-demo"
                  }`}
                >
                  <img src={chatbot} alt="" />
                  {chatbotDisplay2 ? "" : <span>FAQ</span>}
                </div>
              )}

              <div className="flex flex-row justify-end items-center gap-5">
                {/* <button
                onClick={setReadyDownload(true)}
                className="bg-card-gradient p-2 border border-white rounded-md"
              >
                Download Document
              </button>
              {readyDownload ? ( */}
                {!loading ? (
                  // <PDFDownloadButton pdfDownloadText={formatPdfText(ediText)} />
                  <button
                    className=" transition ease-in-out duration-1000  hover:scale-110 p-2 rounded-md px-10 border-2 border-teal-700"
                    onClick={handlepdfdownload}
                  >
                    Download
                  </button>
                ) : (
                  <div className="p-2 rounded-md px-10 border-2 border-teal-700">
                    Downloading
                  </div>
                )}
                {/* // ) : (
              //   ""
              // )} */}
                <button
                  className="transition ease-in-out duration-1000  hover:scale-110 rounded-md p-2 bg-card-gradient text-white font-semibold"
                  onClick={handleEditClick}
                >
                  Edit Document With AI
                </button>
                <button
                  className="transition ease-in-out duration-1000  hover:scale-110 p-2 px-5 rounded-md border-2 border-teal-700"
                  onClick={handlePreviewClick}
                >
                  Summary
                </button>
                {savebutton ? (
                  <button
                    onClick={handleSave}
                    className="transition ease-in-out duration-1000  hover:scale-110 p-2 rounded-md px-10 border-2 border-teal-700"
                  >
                    Save
                  </button>
                ) : (
                  <div className="p-2 send-button rounded-md px-10 border-2 border-teal-700">
                    Loading...
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="w-[30%] h-full overflow-hidden bg-customBlack rounded-md p-5">
            <AnimatePresence mode="wait">
              {activeSidebar === "edit" ? (
                <motion.div
                  key="edit"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-transparent rounded-md w-full h-full"
                >
                  <EditSidebar />
                </motion.div>
              ) : (
                <motion.div
                  key="preview"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="p-4 bg-transparent rounded-md w-full"
                >
                  <h4 className="font-semibold">Document Preview</h4>
                  <p>
                    Please check the Document Preview before proceeding with AI
                    Drafter.
                  </p>
                  <span className="text-teal-500 font-semibold">
                    Adira AI Drafter
                  </span>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </main>
  );
};

export default DocEdit;
