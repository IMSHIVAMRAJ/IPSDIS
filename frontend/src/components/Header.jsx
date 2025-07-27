import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaChevronDown, FaBars, FaTimes } from "react-icons/fa";

function Header() {
  const location = useLocation();
  const [aboutDropdownOpen, setAboutDropdownOpen] = useState(false);
  const [publicationsDropdownOpen, setPublicationsDropdownOpen] = useState(false);
  const [awardsDropdownOpen, setAwardsDropdownOpen] = useState(false);
  const [conferenceDropdownOpen, setConferenceDropdownOpen] = useState(false);
  const [membershipDropdownOpen, setMembershipDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { label: "About us", dropdown: true },
    { label: "Publications", dropdown: true },
    { label: "Awards", dropdown: true },
    { label: "Conference", dropdown: true },
    { label: "Membership", dropdown: true },
    { to: "/downloads", label: "Downloads" },
  ];

  // Dropdown content for each menu
  const dropdownContent = {
    "About us": [
      {
        section: "The Society",
        links: [
          { to: "/about", label: "Who We Are" },
          { to: "/our_legacy", label: "Our Legacy" },
          { to: "/vision", label: "Vision" },
        ],
      },
      {
        section: "Executive Council",
        links: [
          { to: "/executive-council", label: "About The Council" },
          { to: "/present-executive-council", label: "Present Executive Council" },
          { to: "/present-executive-council?filter=President", label: "Presidents" },
          { to: "/present-executive-council?filter=Secretary", label: "Secretaries" },
          { to: "/present-executive-council?filter=Joint Secretary", label: "Joint Secretaries" },
          { to: "/present-executive-council?filter=Treasurer", label: "Treasurers" },
          { to: "/present-executive-council?filter=Chief Editor", label: "Chief Editors" },
        ],
      },
    ],
    Publications: [
      {
        section: "Publications",
        links: [
          { to: "/publications/journal", label: "Journal - Indian Phytopathology" },
          { to: "/publications/editorial-board", label: "Editorial Board" },
          { to: "/publications/books", label: "Books" },
          { to: "/publications/abstract-books", label: "Abstract Books" },
          { to: "/publications/annual-reports", label: "Annual Reports" },
        ],
      },
    ],
    Awards: [
      {
        section: "Awards",
        links: [
          { to: "/awards/society", label: "Awards of the Society" },
          { to: "/awards/nomination", label: "Award Nomination/Application" },
        ],
      },
    ],
    Conference: [
      {
        section: "Conference",
        links: [
          { to: "/conference/national-symposia", label: "National Symposia" },
          { to: "/conference/international-conferences", label: "International Conferences" },
          { to: "/conference/workshop", label: "Workshop/Brain Storming" },
        ],
      },
    ],
    Membership: [
      {
        section: "Membership",
        links: [
          { to: "/membership/info", label: "Membership Information" },
          { to: "/membership/directory", label: "Members Directory" },
          { to: "/membership/registration", label: "Online Registration" },
        ],
      },
    ],
  };

  // Helper for dropdowns
  const dropdowns = {
    "About us": [aboutDropdownOpen, setAboutDropdownOpen],
    Publications: [publicationsDropdownOpen, setPublicationsDropdownOpen],
    Awards: [awardsDropdownOpen, setAwardsDropdownOpen],
    Conference: [conferenceDropdownOpen, setConferenceDropdownOpen],
    Membership: [membershipDropdownOpen, setMembershipDropdownOpen],
  };

  // Render dropdown menu content
  function renderDropdownContent(label) {
    const content = dropdownContent[label];
    if (!content) return null;
    return (
      <div className={`absolute left-0 top-full ${label === "About us" ? "w-[700px] flex p-4" : "w-[350px] flex flex-col p-6"} bg-white shadow-lg rounded-lg border border-gray-100 z-50`}>
        {content.map((section, idx) => (
          <div key={section.section} className={label === "About us" ? "flex-1 min-w-[220px]" : "mb-2"}>
            <div className="font-bold text-green-800 mb-2">{section.section}</div>
            <ul className="space-y-1">
              {section.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    );
  }

  // Render dropdown menu content for mobile
  function renderMobileDropdownContent(label) {
    const content = dropdownContent[label];
    if (!content) return null;
    return (
      <div className="pl-4 border-l border-green-200 mt-1 flex flex-col gap-1">
        {content.map((section) => (
          <React.Fragment key={section.section}>
            <div className="font-bold text-green-800 mb-2">{section.section}</div>
            <ul className="space-y-1 mb-2">
              {section.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="hover:underline">{l.label}</Link>
                </li>
              ))}
            </ul>
          </React.Fragment>
        ))}
      </div>
    );
  }

  return (
    <header className="bg-white shadow-md sticky top-0 z-50 w-full pb-3">
      {/* Top Row: Logo, Title, Login/Join */}
      <div className="flex flex-col sm:flex-row items-center justify-between pt-0 pb-0 w-full relative px-2 sm:px-0">
        <div className="flex items-center gap-4 w-full sm:w-auto ml-2 sm:ml-4 mt-1">
          {/* Logo - replace src with actual logo later */}
          <img
            src="https://www.ipsdis.org/images/logo.png"
            alt="IPS Logo"
            className="h-16 w-16 sm:h-24 sm:w-24 object-contain rounded-full"
          />
          <div>
            <h1 className="text-xl sm:text-2xl md:text-3xl font-normal text-[#0d6e50] leading-tight">Indian Phytopathological Society</h1>
            <div className="text-green-700 text-xs sm:text-sm mt-0">
              (Regn. No. S399 of 1949-50 under the Societies Registration Act XXI of 1860)
            </div>
          </div>
        </div>
        {/* Hamburger for mobile */}
        <div className="sm:hidden absolute right-4 top-6 z-50"> {/* Increased top spacing */}
          <button onClick={() => setMobileMenuOpen((v) => !v)} className="text-green-900 text-2xl focus:outline-none">
            {mobileMenuOpen ? <FaTimes /> : <FaBars />}
          </button>
        </div>
        {/* Login/Join - move to absolute top right with more breathing space */}
        <div className="hidden sm:flex absolute right-8 top-2 justify-end w-auto space-x-2 bg-white bg-opacity-90 rounded-bl-lg px-3 py-1 shadow-sm">
          <Link to="/login" className="text-green-900 hover:underline text-sm font-medium">Login</Link>
          <span className="mx-1 text-green-700">|</span>
          <Link to="/membership/registration" className="text-green-900 hover:underline text-sm font-medium">Join New Member</Link>
        </div>
      </div>
      {/* Nav Row - Desktop */}
      <nav className="hidden sm:flex flex-wrap justify-center gap-2 sm:gap-6 pt-0 pb-1 border-green-100 w-full relative">
        {navLinks.map((link) => {
          if (link.dropdown) {
            const [open, setOpen] = dropdowns[link.label];
            return (
              <div
                key={link.label}
                className="relative group"
                onMouseEnter={() => setOpen(true)}
                onMouseLeave={() => setOpen(false)}
              >
                <button
                  className="px-2 sm:px-3 py-1 text-base font-semibold text-green-800 hover:underline flex items-center gap-1 transition-colors duration-150 focus:outline-none"
                  type="button"
                  aria-haspopup="true"
                  aria-expanded={open}
                >
                  {link.label}
                  <FaChevronDown className="ml-1 text-xs" />
                </button>
                {open && renderDropdownContent(link.label)}
              </div>
            );
          }
          return (
            <div key={link.to} className="relative group">
              <Link
                to={link.to}
                className={`px-2 sm:px-3 py-1 text-lg font-semibold text-green-800 hover:underline flex items-center gap-1 transition-colors duration-150 ${
                  location.pathname === link.to ? "underline" : ""
                }`}
              >
                {link.label}
              </Link>
            </div>
          );
        })}
      </nav>
      {/* Nav Row - Mobile */}
      {mobileMenuOpen && (
        <nav className="sm:hidden flex flex-col gap-2 bg-white border-t border-green-100 px-4 py-4 w-full shadow-md z-40">
          {navLinks.map((link) => {
            if (link.dropdown) {
              const [open, setOpen] = dropdowns[link.label];
              return (
                <div key={link.label} className="relative">
                  <button
                    className="w-full flex justify-between items-center px-2 py-2 text-base font-semibold text-green-800 hover:underline focus:outline-none"
                    onClick={() => setOpen((v) => !v)}
                  >
                    {link.label}
                    <FaChevronDown className={`ml-1 text-xs transition-transform ${open ? "rotate-180" : ""}`} />
                  </button>
                  {open && renderMobileDropdownContent(link.label)}
                </div>
              );
            }
            return (
              <Link
                key={link.to}
                to={link.to}
                className={`px-2 py-2 text-base font-semibold text-green-800 hover:underline flex items-center gap-1 transition-colors duration-150 ${
                  location.pathname === link.to ? "underline" : ""
                }`}
                onClick={() => setMobileMenuOpen(false)}
              >
                {link.label}
              </Link>
            );
          })}
          <div className="flex flex-col gap-2 mt-4">
            <Link to="/login" className="text-green-900 hover:underline text-base font-medium">Login</Link>
            <Link to="/join" className="text-green-900 hover:underline text-base font-medium">Join New Member</Link>
          </div>
        </nav>
      )}
    </header>
  );
}

export default Header;