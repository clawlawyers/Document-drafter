import React from "react";
import HomeNav from "../components/Navbar/HomeNav";
import HeroText from "../components/ui/Hero";
import Footer from "../components/ui/Footer";
import Banner from "../components/ui/Banner";
import { useState } from "react";
import CustomDropdown from "../components/ui/CustomSelect";
import { options } from "./Options";
import { setPrompt } from "../features/PromptSlice";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const DocType = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    setLoading(true);
    // Perform submit action
    localStorage.setItem("from","docType")

    dispatch(setPrompt(selectedValue));

    navigate("/Drafter/DrafterArgs");
    setLoading(false);
    
  };

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center p-5">
      <section className="bg-customBlack flex flex-col justify-between items-center h-fit rounded-md w-full ">
        <div className="flex flex-col justify-center items-center w-full space-y-10 p-5">
          <HomeNav className="w-full" />
          <HeroText />
          <CustomDropdown
            className="w-full"
            options={options}
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
