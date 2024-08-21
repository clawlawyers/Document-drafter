import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import HomeNav from "../components/Navbar/HomeNav";
import NavbarRight from "../components/Navbar/NavbarRight";
import NavbarLeft from "../components/Navbar/NavbarLeft";
import { useSelector } from "react-redux";
import loaderGif from "../assets/icons/2.gif";
import EditSidebar from "../components/ui/EditSidebar";
import { useNavigate } from "react-router-dom";

const DocEdit = ({ onSave }) => {
  let navigate = useNavigate();
  const ediText = useSelector((state) => state.document.uploadDocText);
  const texteditable = useSelector((state) => state.document.uploadDocText);
  const [text, setText] = useState("");

  const [loading, setLoading] = useState(true);
  const [activeSidebar, setActiveSidebar] = useState("preview");

  // useEffect(() => {
  //     setText(ediText);
  // }, [ediText]);

  useEffect(() => {
    if (ediText) {
      setText(ediText);
    } else setText(texteditable);
  }, [texteditable]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  const handleEditClick = () => {
    setActiveSidebar("edit");
  };

  const handlePreviewClick = () => {
    navigate("/summary");
  };

  const handleSave = () => {
    navigate("/Snippets");
  };

  return (
    <main className="h-screen w-full">
      <section className="flex flex-col p-5 space-y-5 items-center w-full h-full">
        {/* navbar */}
        <div className="w-full justify-between items-center flex flex-row ">
          <NavbarRight />
          <NavbarLeft />
        </div>

        <div className="flex flex-row w-full  space-x-5 rounded-md h-full justify-center items-start">
          <div className="flex flex-col bg-customBlack rounded-md  w-[70%] h-full space-y-5 p-5">
            <div className="border-white bg-card-gradient flex flex-col justify-center items-center border-2 rounded-md w-full h-full">
              {loading ? (
                <img
                  className="flex flex-row justify-center items-center w-40 h-40"
                  src={loaderGif}
                  alt="Loading..."
                />
              ) : (
                <textarea
                  className="hide-scrollbar w-full bg-transparent outline-none h-full p-2"
                  readOnly
                  value={text}
                  style={{ whiteSpace: "pre-wrap" }}
                />
              )}
            </div>
            <div className="flex flex-row justify-end items-center gap-5">
              <button
                className="rounded-md p-2 bg-card-gradient text-white font-semibold"
                onClick={handleEditClick}
              >
                Edit Document With AI
              </button>
              <button
                className="p-2 px-5 rounded-md border-2 border-teal-700"
                onClick={handlePreviewClick}
              >
                Summary
              </button>
              <button
                onClick={handleSave}
                className="p-2 rounded-md px-10 border-2 border-teal-700"
              >
                Save
              </button>
            </div>
          </div>

          <div className="w-[30%] h-full overflow-hidden bg-customBlack rounded-md p-5  ">
            <AnimatePresence mode="wait">
              {activeSidebar === "edit" ? (
                <motion.div
                  key="edit"
                  initial={{ x: 300, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  exit={{ x: -300, opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className=" bg-transparent rounded-md w-full h-full "
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
