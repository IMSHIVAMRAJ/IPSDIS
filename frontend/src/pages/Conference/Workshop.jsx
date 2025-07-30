import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API URL for your workshops endpoint
const API_URL = "http://localhost:5000/api/workshops";

export default function Workshop() {
  const [workshops, setWorkshops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWorkshops = async () => {
      try {
        const response = await axios.get(API_URL);
        // Sort the data by serial number for consistent ordering
        const sortedData = response.data.sort((a, b) => a.serialNumber - b.serialNumber);
        setWorkshops(sortedData);
      } catch (err) {
        console.error("Error fetching workshops:", err);
        setError("Could not load workshop data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchWorkshops();
  }, []); // The empty dependency array ensures this runs only once

  if (loading) {
    return <div className="text-center py-10">Loading Workshops...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <h1 className="text-5xl font-normal text-center text-green-900 mb-2">Workshop/Brain Storming</h1>
      <p className="text-center text-lg text-gray-700 mb-10">Brain storming sessions organized by the Society</p>
      <div className="overflow-x-auto max-w-5xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-left font-semibold">Topic</th>
              <th className="py-3 px-4 text-left font-semibold">Venue</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((ws) => (
              <tr key={ws._id} className={ws.serialNumber % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4 align-top">{ws.serialNumber}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.year}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.topic}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.venue}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">
                  {new Date(ws.date).toLocaleDateString('en-GB', {
                    day: 'numeric', month: 'long', year: 'numeric'
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}