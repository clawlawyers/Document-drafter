import { useState, useRef } from "react";
import { Avatar, LinearProgress, Box, Typography } from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import GoogleDriveImage from "../../assets/icons/Google_Drive_logo 1.svg";
import FolderImage from "../../assets/icons/dropbox.svg";
import DropBox from "../../assets/icons/—Pngtree—dropbox icon_3584851 1.svg";
import analyzingGif from "../../assets/icons/analyze.gif"; // Add your analyzing GIF here
import { useNavigate } from "react-router-dom"; // Import useNavigate

const UploadDialog = () => {
  const [file, setFile] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadStatus, setUploadStatus] = useState(""); // "uploading", "complete", "analyzing"
  const fileInputRef = useRef(null); // Create a ref for the file input
  const navigate = useNavigate(); // Initialize useNavigate

  const handleGoogleDriveUpload = () => {
    console.log("Upload from Google Drive clicked");
    // Add your Google Drive upload logic here
  };

  const handleComputerUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click(); // Trigger the file input click
    }
  };

  const handleDropboxUpload = () => {
    console.log("Upload from Dropbox clicked");
    // Add your Dropbox upload logic here
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (file) {
      setFile(file); // Save the file to state
      setUploadStatus("uploading");
      console.log("File selected:", file.name);

      // Simulate upload progress
      simulateUpload();
    }
  };

  const simulateUpload = () => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10; // Increment progress
      setUploadProgress(progress);

      if (progress >= 100) {
        clearInterval(interval);
        setUploadStatus("complete");
        setTimeout(() => setUploadStatus("analyzing"), 1000); // Show analyzing GIF after a delay
        // Simulate analysis duration
        setTimeout(() => {
          setUploadStatus(""); // Hide analysis GIF
          setFile(null); // Reset file selection
          navigate("/new-page"); // Navigate to a new URL
        }, 3000); // Hide analysis GIF after a delay
      }
    }, 500); // Adjust interval for realistic progress
  };

  const uploadOptions = [
    {
      src: GoogleDriveImage,
      alt: "Google Drive",
      text: "Upload from Drive",
      hasText: true,
      textClass: "text-neutral-800 font-semibold mt-2",
      onClick: handleGoogleDriveUpload, // Attach Google Drive upload handler
    },
    {
      src: FolderImage,
      alt: "Upload from Computer",
      text: "Upload from Computer",
      textClass: "text-neutral-800 font-semibold mt-2",
      hasText: true,
      containerClass: "-mt-5",
      onClick: handleComputerUpload, // Attach Computer upload handler
    },
    {
      src: DropBox,
      alt: "Dropbox",
      text: "Upload from DropBox",
      textClass: "text-neutral-800 font-semibold ",
      containerClass: "-mt-2",
      hasText: true,
      onClick: handleDropboxUpload, // Attach Dropbox upload handler
    },
  ];

  return (
    <div className="bg-customBlack h-full p-3 rounded-md">
      {/* Avatar */}
      <div className="flex flex-row justify-end w-full">
        <Avatar
          sx={{ bgcolor: "#018081" }}
          alt="Remy Sharp"
          src="/broken-image.jpg"
        >
          S
        </Avatar>
      </div>

      {/* Devices or Upload Status */}
      <div className="flex flex-row justify-center w-full px-96 items-center h-[70vh]">
        <div className="flex flex-col w-full  p-5 bg-upload-card rounded-md space-y-7">
          {/* Close Button */}
          <div>
            <div className="w-full flex justify-end">
              <HighlightOffIcon className="text-teal-500 text-2xl scale-150 cursor-pointer" />
            </div>

            {/* Title */}
            <div className="flex justify-center">
              <p className="text-teal-700 font-bold text-2xl">
                {!file ? "Upload Your Document" : ""}
              </p>
            </div>
          </div>

          {/* Conditional Rendering */}
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
                    onClick={option.onClick} // Attach onClick handler
                  />
                  {option.hasText && (
                    <p className={option.textClass}>{option.text}</p>
                  )}
                  {option.alt === "Upload from Computer" && (
                    <input
                      type="file"
                      accept=".pdf, .doc, .docx, .txt" // Adjust file types as needed
                      onChange={handleFileChange}
                      ref={fileInputRef} // Attach ref to the file input
                      className="hidden" // Hide file input
                    />
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UploadDialog;
