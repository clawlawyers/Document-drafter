import React from "react";
import HomeNav from "../components/Navbar/HomeNav";
import HeroText from "../components/ui/Hero";
import CustomInput from "../components/ui/CustomInput";
import Footer from "../components/ui/Footer";
import Banner from "../components/ui/Banner";

const DocType = () => {
  return (
    <main className="flex flex-col h-screen w-full items-center justify-center p-5">
      <section className="bg-customBlack flex flex-col justify-between items-center h-fit rounded-md w-full ">
        <div className="flex flex-col justify-center items-center w-full space-y-14 p-5">
          <HomeNav className="w-full" />
          <HeroText />
          <CustomInput
            placeholder="Select the type of Document to be created"
            className="w-full "
          />
          <Banner />
        </div>
        <Footer className="w-full" />
      </section>
    </main>
  );
};

export default DocType;
