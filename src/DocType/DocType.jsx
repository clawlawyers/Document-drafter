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

const DocType = () => {
  let navigate = useNavigate();
  let dispatch = useDispatch();

  const [selectedValue, setSelectedValue] = useState("");
  const [selectedSubType, setSelectedSubType] = useState("");
  const [loading, setLoading] = useState(false);

  const [optionTypes, setOptionTypes] = useState({});
  const [subOption, setSubOptions] = useState([]);

  useEffect(() => {
    if (selectedValue !== "") {
      setSelectedSubType("");
      const findSelectedValueArr = Object.values(
        optionTypes?.type[selectedValue] || {}
      );
      setSubOptions(findSelectedValueArr);
    }
  }, [selectedValue]);

  const handleSelectChange = (e) => {
    setSelectedValue(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    // Perform submit action
    localStorage.setItem("from", "docType");

    dispatch(setPrompt(selectedSubType.replace(/\s*\(.*?\)\s*/g, "")));

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
    // console.log(parsedType);
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
              {Object?.keys(optionTypes?.type || {}).map((item, index) => (
                <option key={index} value={item}>
                  {item
                    .split(" ")
                    .map((x) => {
                      return x[0].toUpperCase() + x.slice(1);
                    })
                    .join(" ")}
                </option>
              ))}
              {/* </optgroup>
              ))} */}
            </select>
            <select
              className="p-2 w-full bg-slate-200 rounded-md text-neutral-800 border-2 outline-none border-teal-500 text-sm"
              value={selectedSubType}
              onChange={(e) => setSelectedSubType(e.target.value)}
              required
              disabled={loading || selectedValue === ""}
            >
              <option value="" disabled selected>
                Select a Type
              </option>
              {subOption.map((item, index) => (
                <option key={index} value={item}>
                  {item
                    .split(" ")
                    .map((x) => {
                      return x[0].toUpperCase() + x.slice(1);
                    })
                    .join(" ")}
                </option>
              ))}
              {/* </optgroup>
              ))} */}
            </select>
            <button
              disabled={selectedValue === "" && selectedSubType === ""}
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
