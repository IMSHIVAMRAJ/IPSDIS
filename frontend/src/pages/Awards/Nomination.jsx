import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API URL for your award nominations endpoint
const API_URL = "http://localhost:5000/api/award-nomination";

export default function Nomination() {
  const [nominationInfo, setNominationInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNominationData = async () => {
      try {
        const response = await axios.get(API_URL);
        // The API returns an array; we'll use the first document found.
        if (response.data && response.data.length > 0) {
          setNominationInfo(response.data[0]);
        } else {
          setError("No nomination information has been configured yet.");
        }
      } catch (err) {
        console.error("Error fetching nomination data:", err);
        setError("Could not load the page. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchNominationData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading...</div>;
  }

  if (error || !nominationInfo) {
    return <div className="text-center py-10 text-red-500">{error || "Nomination information is not available."}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-normal text-green-900 mb-6">
          Announcement: Online application of the IPS Awards
        </h2>
        
        {/* Dynamic "Apply" Button */}
        {nominationInfo.links && nominationInfo.links.length > 0 && (
          <div className="mb-6">
            <a
              href={nominationInfo.links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-100 text-green-900 font-semibold py-3 rounded hover:bg-green-100 transition mb-4"
            >
              CLICK HERE TO APPLY
            </a>
          </div>
        )}

        {/* Dynamic Main Content */}
        <div 
          className="mb-6 text-gray-800 prose"
          dangerouslySetInnerHTML={{ __html: nominationInfo.mainContent }}
        />
        
        {/* This list of awards appears to be static and not part of the model, so it remains as is. */}
        <ol className="list-decimal list-inside mb-6 text-green-900 font-medium space-y-1">
            <li>S.N. Dasgupta Lecture Award</li>
            <li>J.F. Dastur Memorial Award</li>
            <li>Sharda Lele Memorial Award</li>
            <li>K.C. Mehta and Manoranjan Mitra Award</li>
            <li>S. Sinha Memorial Award</li>
            <li>B.N. Chakraborty and Usha Chakraborty IPS Best Teacher Award</li>
            <li>A.K. Sarbhoy Memorial Award</li>
            <li>B.P. Misra &amp; R.N. Pandey IPS Best Women Scientist Award</li>
            <li>A.N. Mukhopadhyay Oration Award</li>
            <li>M.K. Patel Memorial Young Scientist Award</li>
            <li>Fellow of Indian Phytopathological Society (FPSI)</li>
        </ol>

        {/* Dynamic Instructions */}
        {nominationInfo.instructions && nominationInfo.instructions.length > 0 && (
          <div className="mb-6">
            <div className="font-bold text-red-700 mb-2">General Instructions:</div>
            <ol className="list-decimal list-inside space-y-2 text-gray-800 text-sm">
              {nominationInfo.instructions.map((instruction, index) => (
                <li key={index} dangerouslySetInnerHTML={{ __html: instruction }} />
              ))}
            </ol>
          </div>
        )}
        
        {/* Dynamic "Apply" Button (repeated at the bottom) */}
        {nominationInfo.links && nominationInfo.links.length > 0 && (
          <div className="mb-10">
            <a
              href={nominationInfo.links[0]}
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full text-center bg-gray-100 text-green-900 font-semibold py-3 rounded hover:bg-green-100 transition"
            >
              CLICK HERE TO APPLY
            </a>
          </div>
        )}
      </div>
    </div>
  );
}