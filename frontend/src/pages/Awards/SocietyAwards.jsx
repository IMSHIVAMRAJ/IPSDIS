import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/awards";

export default function SocietyAwards() {
  const [awards, setAwards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAwards = async () => {
      try {
        const response = await axios.get(API_URL);
        // Sort awards by serial number
        setAwards(response.data.sort((a, b) => a.sno - b.sno));
      } catch (err) {
        console.error("Error fetching awards:", err);
        setError("Could not load awards data.");
      } finally {
        setLoading(false);
      }
    };
    fetchAwards();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Awards...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <div className="bg-white p-8 max-w-6xl mx-auto">
        <h1 className="text-5xl font-normal text-green-900 mb-6">Awards</h1>
        <p className="text-gray-800 text-base leading-relaxed mb-6">
          Indian Phytopathological Society instituted several awards time to time, which were instituted in the memory of renound Plant Pathologists of our country and also to recognize their significant contributions.<br /><br />
          Society is grateful to the donors, who contributed liberally to strengthen the activities of the society. These award lectures are presented at the annual meetings of the society.
        </p>
        <h2 className="text-3xl font-semibold text-green-900 mb-6">Awards of the Society</h2>
      </div>
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Name of the Award</th>
              <th className="py-3 px-4 text-left font-semibold">Year of Institution</th>
              <th className="py-3 px-4 text-center font-semibold">Guidelines</th>
              <th className="py-3 px-4 text-center font-semibold">Awardees</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award) => (
              <tr key={award._id} className={award.sno % 2 === 0 ? "bg-gray-50" : "bg-white"}>
                <td className="py-2 px-4 align-top">{award.sno}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{award.name}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{award.year}</td>
                <td className="py-2 px-4 align-top text-center">
                  {/* Link uses the database _id to fetch specific guidelines */}
                  <Link to={`/awards/guidelines/${award._id}`} className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">View</Link>
                </td>
                <td className="py-2 px-4 align-top text-center">
                  {/* Link passes the award name to filter the awardees list */}
                  <Link to={`/awards/awardees/${encodeURIComponent(award.name)}`} className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">View</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}