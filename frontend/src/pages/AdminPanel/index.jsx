import React, { useState } from "react";
import { Link, Routes, Route, useLocation, useNavigate } from "react-router-dom";
import { FaSignOutAlt } from "react-icons/fa";

// Import all admin page components
import NewsManagement from "./NewsManagement";
import ExecutiveCouncilManagement from "./ExecutiveCouncilManagement";
import EditorialBoardManagement from "./EditorialBoardManagement";
import BooksManagement from "./BooksManagement";
import WorkshopsManagement from "./WorkshopsManagement";
import AwardsManagement from "./AwardsManagement";
import AwardeesManagement from "./AwardeesManagement";
import NominationsManagement from "./NominationsManagement";
import MembershipManagement from "./MembershipManagement";
import PaymentDetailsManagement from "./PaymentDetailsManagement";
import DownloadsManagement from "./DownloadsManagement";

const TABS = [
  { label: "News", path: "news", component: <NewsManagement /> },
  { label: "Executive Council", path: "executive-council", component: <ExecutiveCouncilManagement /> },
  { label: "Editorial Board", path: "editorial-board", component: <EditorialBoardManagement /> },
  { label: "Books", path: "books", component: <BooksManagement /> },
  { label: "Workshops", path: "workshops", component: <WorkshopsManagement /> },
  { label: "Awards", path: "awards", component: <AwardsManagement /> },
  { label: "Awardees", path: "awardees", component: <AwardeesManagement /> },
  { label: "Nominations", path: "nominations", component: <NominationsManagement /> },
  { label: "Membership", path: "membership", component: <MembershipManagement /> },
  { label: "Payment Details", path: "payment-details", component: <PaymentDetailsManagement /> },
  { label: "Downloads", path: "downloads", component: <DownloadsManagement /> },
];

export default function AdminPanel() {
  const location = useLocation();
  const navigate = useNavigate();
  const currentPath = location.pathname.split('/').pop() || 'news';

  const handleLogout = () => {
    localStorage.removeItem("adminToken");
    navigate("/admin-login");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header with Logout */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-3xl font-bold text-green-900">Admin Panel</h1>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors duration-200"
            >
              <FaSignOutAlt />
              Logout
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto p-8">
        <div className="bg-white rounded-lg shadow-lg">
          {/* Navigation Tabs */}
          <div className="flex flex-wrap border-b">
            {TABS.map((tab) => (
              <Link
                key={tab.path}
                to={`/admin/${tab.path}`}
                className={`px-6 py-3 font-semibold focus:outline-none transition-colors ${
                  currentPath === tab.path
                    ? "border-b-4 border-green-700 text-green-900 bg-gray-50"
                    : "text-gray-600 hover:text-green-700 hover:bg-gray-50"
                }`}
              >
                {tab.label}
              </Link>
            ))}
          </div>

          {/* Content Area */}
          <div className="p-6">
            <Routes>
              {TABS.map((tab) => (
                <Route
                  key={tab.path}
                  path={tab.path}
                  element={tab.component}
                />
              ))}
              {/* Default route */}
              <Route path="*" element={<NewsManagement />} />
            </Routes>
          </div>
        </div>
      </div>
    </div>
  );
} 