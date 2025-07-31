import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/executives";

function PresentExecutiveCouncil() {
  const [councilMembers, setCouncilMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';

  useEffect(() => {
    const fetchCouncilMembers = async () => {
      try {
        const response = await axios.get(`${API_URL}/get`);
        // The backend model doesn't have a 'category', so we create one here for filtering.
        const membersWithCategory = response.data.map(member => {
          // ✅ FIX: Safely handle cases where designation might be missing
          const designation = (member.designation || '').toLowerCase();
          
          let category = "Member"; // Default
          if (designation.includes("president")) category = "President";
          else if (designation.includes("secretary")) category = "Secretary";
          else if (designation.includes("joint secretary")) category = "Joint Secretary";
          else if (designation.includes("treasurer")) category = "Treasurer";
          else if (designation.includes("chief editor")) category = "Chief Editor";
          return { ...member, category };
        });
        setCouncilMembers(membersWithCategory);
      } catch (err) {
        console.error("Error fetching council members:", err);
        setError("Could not load council members.");
      } finally {
        setLoading(false);
      }
    };
    fetchCouncilMembers();
  }, []);

  const filteredMembers = activeFilter === "all" 
    ? councilMembers 
    : councilMembers.filter(member => member.category === activeFilter);
  
  if (loading) {
    return <div className="text-center py-10">Loading Executive Council...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white p-8 max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-normal text-green-900 mb-10 text-center">Present Executive Council</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {filteredMembers.map((member) => (
          <div
            key={member._id}
            className="bg-white rounded-lg shadow border border-gray-200 flex flex-col items-center p-4 w-full max-w-xs hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-300 ease-in-out"
          >
            <img
              src={member.image}
              alt={member.name}
              className="w-40 h-48 object-cover rounded mb-4 border border-gray-300"
            />
            <div className="text-lg font-bold text-green-800 mb-1 text-center">{member.name}</div>
            <div className="text-base text-gray-700 mb-4 text-center">{member.designation}</div>
            <Link
              to={`/executive-profile/${member._id}`}
              className="px-5 py-2 rounded bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors duration-200 text-base"
            >
              VIEW PROFILE
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PresentExecutiveCouncil;