import React from "react";
import HeroSection from "../components/Layouts/HeroSection";
import Navbar from "../components/Layouts/Navbar";
import Main from "../components/Main";

const Home = () => {
  return (
    <div>
      <Navbar />
      <HeroSection />
      <Main />
    </div>
  );
};

export default Home;
