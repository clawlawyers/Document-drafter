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

const optionTypesArr = {
  type: {
    "business and commercial agreements": [
      "agency agreement",
      "broker agreement",
      "consultancy agreement",
      "distribution agreement",
      "franchise agreement",
      "joint venture agreement",
      "license agreement",
      "partenership deed",
      "service agreement",
      "shareholder agreement",
      "supply agreement",
    ],
    "employment and labor contracts": ["employement contract"],
    "financial and loan documents": ["loan agreement", "promissory note"],
    "legal authority and confidentiality": [
      "indemnity bond",
      "nondisclosure agreement",
      "power of attorney",
    ],
    "miscellaneous legal documents": [
      "gift deed",
      "memorandum of understanding",
      "will agreement",
    ],
    "real estate and property agreements": [
      "construction contract",
      "development agreement",
      "lease agreement",
      "master development agreement",
      "mortgage deed",
      "property management agreement",
      "rent agreement",
      "sale agreement",
      "sale deed",
      "title deed",
    ],
  },
};

const DocType = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(false);
  console.log(loading);

  const [optionTypes, setOptionTypes] = useState({});

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

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
    setLoading(true);
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
    console.log(parsedType);
    setOptionTypes(parsedType.data.fetchedData);
    setLoading(false);
  };

  return (
    <main className="flex flex-col h-screen w-full items-center justify-center p-5">
      <section className="bg-customBlack flex flex-col justify-between items-center h-fit rounded-md w-full ">
        <div className="flex flex-col justify-center items-center w-full space-y-10 p-5">
          <HomeNav className="w-full" />
          <HeroText />
          {/* <CustomDropdown
            className="w-full"
            options={optionTypes}
            placeholder="Select an option"
            onChange={handleSelectChange}
            onSubmit={handleSubmit}
            loading={loading}
            value={selectedValue}
          /> */}
          <form onSubmit={handleSubmit} className="flex w-full gap-2">
            <select
              className="p-2 w-full bg-slate-200 rounded-md text-neutral-800 border-2 outline-none border-teal-500 text-sm"
              value={selectedValue}
              onChange={handleSelectChange}
              required
              disabled={loading}
            >
              <option value="" disabled selected>
                Select an Option
              </option>
              {Object?.keys(optionTypes?.type || {}).map((x, index) => (
                <optgroup
                  key={index}
                  label={x
                    .split(" ")
                    .map((x) => {
                      return x[0].toUpperCase() + x.slice(1);
                    })
                    .join(" ")}
                >
                  {Object?.values(optionTypes?.type[x] || {}).map(
                    (item, index) => (
                      <option key={index} value={item}>
                        {item
                          .split(" ")
                          .map((x) => {
                            return x[0].toUpperCase() + x.slice(1);
                          })
                          .join(" ")}
                      </option>
                    )
                  )}
                </optgroup>
              ))}
            </select>
            <button
              disabled={selectedValue === ""}
              className="bg-btn-gradient  p-2 px-9 rounded-md"
              type="submit"
            >
              Send
            </button>
          </form>

          <Banner />
        </div>
        <Footer className="w-full" />
      </section>
    </main>
  );
};

export default DocType;
