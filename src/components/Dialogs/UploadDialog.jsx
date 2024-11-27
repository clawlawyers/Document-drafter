import { useState, useRef } from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Checkbox,
  Button,
  FormControlLabel,
  Typography,
  Box,
} from "@mui/material";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import driveLogo from "../../assets/icons/driveLogo.png";
import pcLogo from "../../assets/icons/pcLogo.png";
import dropboxLogo from "../../assets/icons/dropboxLogo.png";

const UploadDialog = () => {
  const [languageDialogOpen, setLanguageDialogOpen] = useState(false); // State for language dialog
  const [selectedLanguages, setSelectedLanguages] = useState([]); // Selected languages
  const [file, setFile] = useState(null); // File upload state
  const fileInputRef = useRef(null);

  const languages = ["English", "Hindi", "Telugu", "Tamil", "Kannada"];

  const handleLanguageChange = (event) => {
    const { value, checked } = event.target;
    setSelectedLanguages((prev) =>
      checked ? [...prev, value] : prev.filter((lang) => lang !== value)
    );
  };

  const handleLanguageConfirm = () => {
    setLanguageDialogOpen(false);
    // Proceed with file selection
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleCancelLanguageSelection = () => {
    setLanguageDialogOpen(false);
  };

  const handleComputerUpload = () => {
    setLanguageDialogOpen(true);
  };

  const handleGoogleDriveUpload = () => {
    console.log("Google Drive upload selected");
  };

  const handleDropboxUpload = () => {
    console.log("Dropbox upload selected");
  };

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      console.log("Selected file:", selectedFile);
    }
  };

  const uploadOptions = [
    {
      src: driveLogo,
      alt: "Upload from Drive",
      text: "Upload from Drive",
      onClick: handleGoogleDriveUpload,
    },
    {
      src: pcLogo,
      alt: "Upload from Computer",
      text: "Upload from Computer",
      onClick: handleComputerUpload,
    },
    {
      src: dropboxLogo,
      alt: "Upload from Dropbox",
      text: "Upload from Dropbox",
      onClick: handleDropboxUpload,
    },
  ];

  return (
    <div className="bg-black bg-opacity-80 h-full p-4 rounded-md">
      <div className="flex flex-row justify-center w-full items-center h-[80vh]">
        <div className="flex flex-col w-1/2 p-5 bg-upload-card rounded-md space-y-7">
          <div>
            <div className="w-full flex justify-end">
              <HighlightOffIcon
                className="text-teal-700 text-2xl scale-150 cursor-pointer"
              />
            </div>
            <div className="flex justify-center">
              <Typography variant="h5" className="text-teal-700 font-bold">
                Upload Your Document
              </Typography>
            </div>
          </div>

          <div className="flex flex-row justify-center items-start space-x-12">
            {uploadOptions.map((option, index) => (
              <div
                key={index}
                className="flex flex-col justify-start items-center"
              >
                <img
                  className="hover:scale-110 duration-300 cursor-pointer"
                  src={option.src}
                  width="100"
                  alt={option.alt}
                  onClick={option.onClick}
                  height="100"
                />
                <Typography className="text-neutral-800 text-center font-semibold">
                  {option.text}
                </Typography>
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

          {file && (
            <Typography
              variant="body1"
              className="text-teal-700 text-center mt-5"
            >
              Selected File: {file.name}
            </Typography>
          )}
        </div>
      </div>

      {/* Stylish Language Selection Dialog */}
      <Dialog
        open={languageDialogOpen}
        onClose={handleCancelLanguageSelection}
        PaperProps={{
          style: {
            background: "linear-gradient(135deg, #1f4037, #99f2c8)",
            color: "#fff",
            borderRadius: "15px",
          },
        }}
      >
        <DialogTitle>
          <Typography variant="h5" style={{ fontWeight: "bold" }}>
            Select Languages
          </Typography>
        </DialogTitle>
        <DialogContent>
          <Box display="flex" flexDirection="column" gap={1}>
            {languages.map((language) => (
              <FormControlLabel
                key={language}
                control={
                  <Checkbox
                    value={language}
                    checked={selectedLanguages.includes(language)}
                    onChange={handleLanguageChange}
                    style={{ color: "#fff" }}
                  />
                }
                label={<Typography style={{ color: "#fff" }}>{language}</Typography>}
              />
            ))}
          </Box>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={handleCancelLanguageSelection}
            style={{
              backgroundColor: "transparent",
              color: "#fff",
              border: "2px solid #fff",
              borderRadius: "20px",
              padding: "5px 15px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleLanguageConfirm}
            disabled={selectedLanguages.length === 0}
            style={{
              backgroundColor: "#00b894",
              color: "#fff",
              borderRadius: "20px",
              padding: "5px 15px",
              fontWeight: "bold",
              textTransform: "none",
            }}
          >
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default UploadDialog;
