import React, { useState } from "react";
import { Link, Routes, Route, useLocation } from "react-router-dom";

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
  const currentPath = location.pathname.split('/').pop() || 'news';

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-lg">
        <h1 className="text-5xl font-normal text-center text-green-900 py-8 border-b">Admin Panel</h1>
        
        {/* Navigation Tabs */}
        <div className="flex flex-wrap border-b">
          {TABS.map((tab) => (
            <Link
              key={tab.path}
              to={`/admin/${tab.path}`}
              className={`px-6 py-3 font-semibold focus:outline-none transition-colors ${
                currentPath === tab.path
                  ? "border-b-4 border-green-700 text-green-900 bg-gray-100"
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
  );
} 