import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/awardees";

export default function Awardees() {
  const { awardName } = useParams();
  const decodedName = decodeURIComponent(awardName);

  const [awardees, setAwardees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAndFilterAwardees = async () => {
      try {
        // Fetch ALL awardees from the database
        const response = await axios.get(API_URL);
        
        // Filter the list on the frontend to find matches for the current award name
        const filteredAwardees = response.data.filter(
          (awardee) => awardee.awardName === decodedName
        );

        // Sort the filtered list by year
        setAwardees(filteredAwardees.sort((a,b) => a.year - b.year));
      } catch (err) {
        console.error("Error fetching awardees:", err);
        setError("Could not load awardees data.");
      } finally {
        setLoading(false);
      }
    };

    fetchAndFilterAwardees();
  }, [decodedName]);

  if (loading) {
    return <div className="text-center py-10">Loading Awardees...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }
  
  if (awardees.length === 0) {
    return (
        <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-green-900 mb-6">Awardees of {decodedName}</h1>
            <p className="text-gray-800 text-base leading-relaxed">
                No awardees data available for this award yet.
            </p>
             <Link to="/awards" className="text-green-600 mt-4 inline-block">← Back to Awards</Link>
        </div>
    );
  }

  return (
    <div className="bg-white p-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        {decodedName} - Awardees
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Title of lecture</th>
            </tr>
          </thead>
          <tbody>
            {awardees.map((awardee) => (
              <tr key={awardee._id} className={awardee.sno % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{awardee.sno}</td>
                <td className="py-2 px-4 align-top">{awardee.year}</td>
                <td className="py-2 px-4 align-top">{awardee.awardeeName}</td>
                <td className="py-2 px-4 align-top">{awardee.lectureTopic}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}