import React, { useEffect } from "react";
import HomeNav from "../components/Navbar/HomeNav";
import HeroText from "../components/ui/Hero";
import Footer from "../components/ui/Footer";
import Banner from "../components/ui/Banner";
import { useState } from "react";
import CustomDropdown from "../components/ui/CustomSelect";
// import { options } from "./Options";
import { setPrompt } from "../features/PromptSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { driver } from "driver.js";
import "driver.js/dist/driver.css";
import { steps } from "../utils/tour";
import { NODE_API_ENDPOINT } from "../utils/utils";
import { setIsThisBypromptFalse } from "../features/DocumentSlice";

const DocType = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  const [optionTypes, setOptionTypes] = useState([]);
  console.log(optionTypes);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  useEffect(() => {
    dispatch(setIsThisBypromptFalse());
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform submit action
    localStorage.setItem("from", "docType");

    dispatch(setPrompt(selectedValue.replace(/\s*\(.*?\)\s*/g, "")));

    navigate("/Drafter/DrafterArgs");
    setLoading(false);
  };

  useEffect(() => {
    getType();
  }, []);

  const getType = async () => {
    const type = await fetch(`${NODE_API_ENDPOINT}/ai-drafter/api/get_types`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (!type.ok) {
      console.error("Error fetching types");
      return;
    }

    const parsedType = await type.json();
    // console.log(parsedType);
    setOptionTypes(parsedType.data.fetchedData.type);
  };

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center p-5">
      <section className="bg-customBlack flex flex-col justify-between items-center h-fit rounded-md w-full ">
        <div className="flex flex-col justify-center items-center w-full space-y-10 p-5">
          <HomeNav className="w-full" />
          <HeroText />
          <CustomDropdown
            className="w-full"
            options={optionTypes}
            placeholder="Select an option"
            onChange={handleSelectChange}
            onSubmit={handleSubmit}
            loading={loading}
            value={selectedValue}
          />
          <Banner />
        </div>
        <Footer className="w-full" />
      </section>
    </main>
  );
};

export default DocType;
