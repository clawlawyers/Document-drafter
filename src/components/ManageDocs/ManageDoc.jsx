import React, { useState } from "react";
import HomeNav from "../Navbar/HomeNav";
import Footer from "../ui/Footer";
import folderIcon from "../../assets/icons/folder.png";
import { Popover } from "@mui/material";
import { Close } from "@mui/icons-material";
import backIcon from "../../assets/icons/goBack.png";
import { useNavigate } from "react-router-dom";

const folderArr = [1, 2, 3, 4, 5];

const ManageDoc = () => {
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [editNameDialog, setEditNameDialog] = useState(false);
  const [deleteFolderDialog, setDeleteFolderDialog] = useState(false);

  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleEditName = () => {
    setAnchorEl(null);
    setEditNameDialog(true);
  };

  const handleDeleteFolder = () => {
    setAnchorEl(null);
    setDeleteFolderDialog(true);
  };

  return (
    <div className="p-3 w-full h-screen ">
      <div className="bg-[#222222] h-full flex flex-col rounded p-2">
        <HomeNav className="w-full" />
        <div className="flex-1 flex flex-col h-[80%] bg-[#001616] rounded mt-2 p-2 ">
          <div className="flex justify-end items-center gap-3">
            <input
              className="py-2 px-5 text-xs rounded-full border-2 border-[#00A9AB] text-black"
              placeholder="Search for a File or Folder"
            />
            <button className="py-1 px-4 bg-[#00A9AB] rounded">
              + Add New
            </button>
          </div>
          <div className="flex-1 overflow-auto h-[88%] flex flex-wrap gap-4">
            {folderArr.map((x, index) => (
              <div className="flex flex-col items-center gap-2">
                <img
                  onClick={(e) => {
                    setOpenDialog(true);
                    setAnchorEl(e.currentTarget);
                  }}
                  className="w-28 h-24 cursor-pointer"
                  src={folderIcon}
                />
                {openDialog && (
                  <Popover
                    id={id}
                    open={open}
                    anchorEl={anchorEl}
                    onClose={handleClose}
                    anchorOrigin={{
                      vertical: "center",
                      horizontal: "center",
                    }}
                  >
                    <div className="flex flex-col bg-gray-400 p-3 text-white gap-1">
                      <p className="border-b border-white py-1 cursor-pointer">
                        Open
                      </p>
                      <p
                        onClick={handleEditName}
                        className="border-b border-white py-1 cursor-pointer"
                      >
                        Edit Name
                      </p>
                      <p
                        onClick={handleDeleteFolder}
                        className="cursor-pointer"
                      >
                        Delete Folder
                      </p>
                    </div>
                  </Popover>
                )}
                <p>Folder Name</p>
              </div>
            ))}
          </div>
          <div className="flex justify-end">
            <div
              onClick={() => {
                navigate(-1);
              }}
              className="flex justify-end gap-2"
            >
              <img className="w-7 h-7" src={backIcon} />
              <button className="text-lg">Go Back</button>
            </div>
          </div>
        </div>
        <Footer className="w-full" />
      </div>
      {editNameDialog && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          <div className="bg-[#D2D2D2] w-2/6 rounded p-3 flex flex-col gap-3 justify-center">
            <div className="flex justify-between items-center">
              <p className="text-[#004343] text-xl font-bold">Folder Name</p>
              <Close
                onClick={() => setEditNameDialog(false)}
                sx={{ color: "#004343", cursor: "pointer" }}
              />
            </div>
            <input
              className="w-full rounded py-2 px-1 text-xs"
              placeholder="Enter New Folder Name"
            />
            <div className="flex justify-end">
              <button className="bg-[#004343] py-1 px-5 rounded">Create</button>
            </div>
          </div>
        </div>
      )}
      {deleteFolderDialog && (
        <div
          style={{
            width: "100%",
            height: "100%",
            position: "absolute",
            left: "0",
            right: "0",
            top: "0",
            backgroundColor: "rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(3px)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            zIndex: "20",
          }}
        >
          <div className="bg-[#D2D2D2] w-2/6 rounded p-5 flex flex-col gap-3 justify-center">
            <div className="flex justify-center items-center">
              <p className="text-[#004343] text-xl font-bold">
                Are You Sure You Want To Delete Folder
              </p>
            </div>
            <div className="flex justify-center gap-5">
              <button
                onClick={() => setDeleteFolderDialog(false)}
                className="border-2 border-[#004343] py-1 px-5 rounded text-[#00A9AB] font-semibold"
              >
                Cancel
              </button>
              <button className="bg-[#00A9AB] py-1 px-5 rounded text-[#004343] font-semibold">
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageDoc;
