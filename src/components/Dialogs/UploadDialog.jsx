import { useState, useRef } from "react";
import { Avatar, LinearProgress, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GoogleDriveImage from "../../assets/icons/Google_Drive_logo 1.svg";
import FolderImage from "../../assets/icons/dropbox.svg";
import DropBox from "../../assets/icons/—Pngtree—dropbox icon_3584851 1.svg";
import analyzingGif from "../../assets/icons/analyze.gif";
import { useNavigate } from "react-router-dom";
import UserModal from "../Modals/UserModal";
import ResponseDialog from "../Dialogs/EditableDialog"; // Import the new dialog
import { useDispatch, useSelector } from "react-redux";
import { setFileBlob } from "../../features/authSlice";
const UploadDialog = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(""); // "uploading", "complete", "analyzing"
  const [responseText, setResponseText] = useState(""); // State for response text
  const [openResponseDialog, setOpenResponseDialog] = useState(false); // State for dialog visibility
  const fileInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { fileBlob } = useSelector((state) => state.auth);

  const handleGoogleDriveUpload = () => {
    console.log("Upload from Google Drive clicked");
  };

  const handleComputerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleDropboxUpload = () => {
    console.log("Upload from Dropbox clicked");
  };

  const handleFileChange = async (event) => {
    const file = event.target.files[0];
    if (file) {
      setFile(file);
      setUploadStatus("uploading");
      console.log("File selected:", file.name);

      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus("complete");
        dispatch(setFileBlob(true));

        setTimeout(() => setUploadStatus("analyzing"), 1000);
        setTimeout(() => {
          setUploadStatus("");

          setFile(null);
          // Set some example response text
          setResponseText("This is the generated response text.");
          setOpenResponseDialog(true); // Open the response dialog
        }, 3000);
      }
    }, 500);
  };

  const handleSaveResponse = (text) => {
    // Handle the save action, e.g., save to backend or local storage
    console.log("Saved response text:", text);
  };

  const uploadOptions = [
    {
      src: GoogleDriveImage,
      alt: "Google Drive",
      text: "Upload from Drive",
      hasText: true,
      textClass: "text-neutral-800 font-semibold mt-2",
      onClick: handleGoogleDriveUpload,
    },
    {
      src: FolderImage,
      alt: "Upload from Computer",
      text: "Upload from Computer",
      textClass: "text-neutral-800 font-semibold mt-2",
      hasText: true,
      containerClass: "-mt-5",
      onClick: handleComputerUpload,
    },
    {
      src: DropBox,
      alt: "Dropbox",
      text: "Upload from DropBox",
      textClass: "text-neutral-800 font-semibold ",
      containerClass: "-mt-2",
      hasText: true,
      onClick: handleDropboxUpload,
    },
  ];

  return (
    <div className="bg-customBlack h-full p-3 rounded-md">
      <div className="flex flex-row justify-end w-full">
        <UserModal />
      </div>

      <div className="flex flex-row justify-center w-full px-96 items-center h-[70vh]">
        <div className="flex flex-col w-full p-5 bg-upload-card rounded-md space-y-7">
          <div>
            <div className="w-full flex justify-end">
              <HighlightOffIcon className="text-teal-500 text-2xl scale-150 cursor-pointer" />
            </div>

            <div className="flex justify-center">
              <p className="text-teal-700 font-bold text-2xl">
                {!file ? "Upload Your Document" : ""}
              </p>
            </div>
          </div>

          {file ? (
            <div className="flex flex-col w-full items-center space-y-4 mt-5">
              {uploadStatus === "uploading" && (
                <div className="flex flex-col w-full space-y-5 ">
                  <p className="text-2xl font-semibold text-teal-600 text-center">
                    Uploading... {uploadProgress}%
                  </p>

                  <LinearProgress
                    variant="determinate"
                    value={uploadProgress}
                    sx={{ height: "4px", width: "90%", padding: "5px" }}
                  />
                </div>
              )}

              {uploadStatus === "complete" && (
                <p className="text-2xl font-semibold text-teal-600 text-center">
                  Upload Complete
                </p>
              )}

              {uploadStatus === "analyzing" && (
                <div className="flex flex-col items-center">
                  <img
                    src={analyzingGif}
                    alt="Analyzing"
                    className="w-80 h-80"
                  />
                  <p className="text-2xl font-semibold text-teal-600 text-center">
                    Analyzing Documents
                  </p>
                </div>
              )}
            </div>
          ) : (
            <div className="flex flex-row justify-center items-center space-x-12">
              {uploadOptions.map((option, index) => (
                <div
                  key={index}
                  className={`flex flex-col justify-center items-center ${
                    option.containerClass || ""
                  }`}
                >
                  <img
                    className="hover:scale-110 duration-300 cursor-pointer"
                    src={option.src}
                    alt={option.alt}
                    onClick={option.onClick}
                  />
                  {option.hasText && (
                    <p className={option.textClass}>{option.text}</p>
                  )}
                  {option.alt === "Upload from Computer" && (
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx, .txt"
                      onChange={handleFileChange}
                      ref={fileInputRef}
                      className="hidden"
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Response Dialog */}
      <ResponseDialog
        open={openResponseDialog}
        onClose={() => setOpenResponseDialog(false)}
        responseText={responseText}
        onSave={handleSaveResponse}
      />
    </div>
  );
};

export default UploadDialog;
