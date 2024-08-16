import React, { useEffect, useState } from "react";
import UserModal from "../components/Modals/UserModal";
import Footer from "../components/ui/Footer";
import CustomInput from "../components/ui/CustomInput";
import HeroText from "../components/ui/Hero";
import Banner from "../components/ui/Banner";
import { createDoc, getDocFromPrompt } from "../actions/createDoc";
import { useDispatch, useSelector } from "react-redux";

import { setPrompt } from "../features/PromptSlice";
import { useNavigate } from "react-router-dom";

const DocDrafter = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [prompt, setPromptValue] = useState("");
  const [loading, setLoading] = useState(false);


  const onChange = (e) => {
    setPromptValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    localStorage.setItem("from","drafter")
    dispatch(setPrompt(prompt));
    navigate("/Drafter/DrafterArgs");
  };

  return (
    <div className="flex flex-col h-screen w-full p-5">
      <div className="bg-customBlack flex flex-col space-y-10 p-5 px-7 h-full w-full rounded-md">
        <div className="flex flex-col w-full justify-between h-full items-center">
          <div className="flex w-full flex-row justify-between">
            <button className="px-10 py-2 border-white rounded-[0.3125rem] border-2">
              CLAW Home
            </button>
            <UserModal />
          </div>

          {/* Hero and Banner */}
          <HeroText />
          <Banner />

          <div className="flex flex-col gap-2 justify-center w-full">
            <CustomInput
              onSubmit={handleSubmit}
              btn={true}
              placeholder="Select the type of Document to be created"
              onChange={onChange}
              loading={loading}
              value={prompt}
              required={true}
            />
            <Footer />
          </div>
        </div>
      </div>
    </div>
  );
};

export default DocDrafter;
