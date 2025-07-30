import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API URL for your editorials endpoint
const API_URL = "http://localhost:5000/api/editorials";

export default function EditorialBoard() {
  // State to hold the data grouped by category
  const [boardData, setBoardData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBoardData = async () => {
      try {
        const response = await axios.get(API_URL);
        // Group the flat array of members by their category
        const groupedData = response.data.reduce((acc, member) => {
          const { category } = member;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(member);
          return acc;
        }, {});
        
        setBoardData(groupedData);
      } catch (err) {
        console.error("Error fetching editorial board data:", err);
        setError("Could not load data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchBoardData();
  }, []); // The empty dependency array ensures this runs only once

  if (loading) {
    return <div className="text-center py-10">Loading Editorial Board...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-10 text-center">
          Editorial Board
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-gray-900">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-lg font-semibold border-b border-gray-300 w-1/2">
                  &nbsp;
                </th>
                <th className="px-4 py-3 text-left text-lg font-semibold border-b border-gray-300">
                  Area of Specialization
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamically render categories and members */}
              {Object.keys(boardData).map((category) => (
                <React.Fragment key={category}>
                  {/* Category Header Row */}
                  <tr className="bg-gray-50">
                    <td className="px-4 py-3 font-bold bg-gray-100 border-b border-gray-300" colSpan={2}>
                      {category}
                    </td>
                  </tr>
                  {/* Member Rows for this category */}
                  {boardData[category].map((member) => (
                    <tr key={member._id}>
                      <td className="px-4 py-3 align-top border-b border-gray-300" dangerouslySetInnerHTML={{ __html: member.content.replace(/\n/g, '<br />') }}>
                      </td>
                      <td className="px-4 py-3 align-top border-b border-gray-300">
                        {Array.isArray(member.areasOfSpecialization) ? member.areasOfSpecialization.join(', ') : ''}
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}