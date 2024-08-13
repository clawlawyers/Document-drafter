import React from "react";
import HomeNav from "../components/Navbar/HomeNav";
import HeroText from "../components/ui/Hero";
import CustomInput from "../components/ui/CustomInput";
import Footer from "../components/ui/Footer";
import Banner from "../components/ui/Banner";

const DocType = () => {
  return (
    <main className="flex p-5 rounded-md flex-col h-screen w-full items-center justify-center">
      <section className="bg-customBlack flex flex-col  justify-between items-center h-full p-5 rounded-md w-full ">
        <div className="flex flex-col justify-center items-center w-full space-y-20">
          <HomeNav className="w-full" />
          <HeroText />
          <Banner></Banner>
          <CustomInput
            placeholder="Select the type of Document to be created"
            className="w-[60%] "
          />
        </div>
        <Footer />
      </section>
    </main>
  );
};

export default DocType;
