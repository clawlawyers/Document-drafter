import React from "react";
import SummaryDisplay from "../ui/SummaryDIsplay";
import jsPDF from "jspdf";
import { useNavigate } from "react-router-dom";

const UploadSummary = () => {
  let navigate = useNavigate();
  const generatePDF = () => {
    const summaryText = document.getElementById("summary-text").innerText;

    const doc = new jsPDF();

    const heading = "Document Summary";
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(0, 128, 128);

    doc.text(heading, 10, 20);

    const textWidth = doc.getTextWidth(heading);

    doc.setFont("helvetica", "normal");
    doc.setTextColor(0, 0, 0);

    const wrappedText = doc.splitTextToSize(summaryText, 180);

    doc.text(wrappedText, 10, 30);

    doc.save("document_summary.pdf");
  };

  return (
    <main className="flex flex-row justify-center p-4 items-center w-full h-full bg-customBlack">
      <section className="flex-1 h-full w-full">
        <SummaryDisplay />
      </section>
      <section className="flex-1 h-full flex flex-col justify-between pt-40 py-5 items-center ">
        <div className="flex flex-col space-y-5 justify-center items-center text-center">
          <h3 className="font-semibold text-4xl">Document Summary</h3>
          <p className="text-sm font-light">
            This Document summary is generated by{" "}
            <span className="text-teal-400 font-normal">Adira AI.</span>
            Download your document summary and use it for your reference.
          </p>
        </div>
        {/* buttons */}
        <div className="flex flex-row justify-center items-center w-full space-x-5">
          <button onClick={()=>navigate("/") } className="bg-card-gradient  text-white font-bold p-3 px-10 rounded-md">
            Go Back
          </button>
          <button
            className="bg-card-gradient text-white font-bold p-3 px-10 rounded-md"
            onClick={generatePDF}
          >
            Download PDF
          </button>
        </div>
      </section>
    </main>
  );
};

export default UploadSummary;