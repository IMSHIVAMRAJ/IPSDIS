import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import About from "./pages/About/About";
import History from "./pages/About/History";
import Vision from "./pages/About/Vision";
import ExecutiveCouncil from "./pages/About/ExecutiveCouncil";
import Publications from "./pages/Publications/Publications";
import Journal from "./pages/Publications/Journal";
import EditorialBoard from "./pages/Publications/EditorialBoard";
import Books from "./pages/Publications/Books";
import AbstractBooks from "./pages/Publications/AbstractBooks";
import AnnualReports from "./pages/Publications/AnnualReports";
import Awards from "./pages/Awards/Awards";
import SocietyAwards from "./pages/Awards/SocietyAwards";
import Nomination from "./pages/Awards/Nomination";
import Conference from "./pages/Conference/Conference";
import NationalSymposia from "./pages/Conference/NationalSymposia";
import InternationalConferences from "./pages/Conference/InternationalConferences";
import Workshop from "./pages/Conference/Workshop";
import Membership from "./pages/Membership/Membership";
import Info from "./pages/Membership/Info";
import Directory from "./pages/Membership/Directory";
import Registration from "./pages/Membership/Registration";
import Downloads from "./pages/Downloads";
import Contact from "./pages/Contact";
import PresentExecutiveCouncil from "./pages/About/PresentExecutiveCouncil";
import { FaArrowUp } from "react-icons/fa";
import Login from "./pages/Login";
import Guidelines from "./pages/Awards/Guidelines";
import Awardees from "./pages/Awards/Awardees";
import AdminPanel from "./pages/AdminPanel";

function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > 200);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return visible ? (
    <button
      onClick={scrollToTop}
      className="fixed bottom-6 right-6 z-50 p-3 rounded-full shadow-lg bg-[#0d6e50] text-white hover:bg-[#0a573f] transition-colors duration-200 flex items-center justify-center"
      aria-label="Scroll to top"
      style={{ fontSize: 28 }}
    >
      <FaArrowUp />
    </button>
  ) : null;
}

function App() {
  return (
    <div className="app-container">
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/our_legacy" element={<History />} />
          <Route path="/vision" element={<Vision />} />
          <Route path="/executive-council" element={<ExecutiveCouncil />} />
          <Route path="/present-executive-council" element={<PresentExecutiveCouncil />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/publications/journal" element={<Journal />} />
          <Route path="/publications/editorial-board" element={<EditorialBoard />} />
          <Route path="/publications/books" element={<Books />} />
          <Route path="/publications/abstract-books" element={<AbstractBooks />} />
          <Route path="/publications/annual-reports" element={<AnnualReports />} />
          <Route path="/awards" element={<Awards />} />
          <Route path="/awards/society" element={<SocietyAwards />} />
          <Route path="/awards/nomination" element={<Nomination />} />
          <Route path="/awards/guidelines/:awardName" element={<Guidelines />} />
          <Route path="/awards/awardees/:awardName" element={<Awardees />} />
          <Route path="/conference" element={<Conference />} />
          <Route path="/conference/national-symposia" element={<NationalSymposia />} />
          <Route path="/conference/international-conferences" element={<InternationalConferences />} />
          <Route path="/conference/workshop" element={<Workshop />} />
          <Route path="/membership" element={<Membership />} />
          <Route path="/membership/info" element={<Info />} />
          <Route path="/membership/directory" element={<Directory />} />
          <Route path="/membership/registration" element={<Registration />} />
          <Route path="/downloads" element={<Downloads />} />
          <Route path="/admin" element={<AdminPanel />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
