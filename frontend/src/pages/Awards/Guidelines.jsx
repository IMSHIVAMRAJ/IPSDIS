import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/awards";

export default function Guidelines() {
  // ✅ FIX: Changed from { awardId } to { id } to match the route parameter
  const { id } = useParams(); 
  const [award, setAward] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAwardDetails = async () => {
      try {
        const response = await axios.get(`${API_URL}/${id}`);
        setAward(response.data);
      } catch (err) {
        console.error("Error fetching award guidelines:", err);
        setError("Could not load guidelines for this award.");
      } finally {
        setLoading(false);
      }
    };
    
    // Only fetch if an ID is present in the URL
    if (id) {
        fetchAwardDetails();
    } else {
        setLoading(false);
        setError("No award ID provided.");
    }
  }, [id]); // Effect now depends on 'id'

  if (loading) {
    return <div className="text-center py-10">Loading Guidelines...</div>;
  }

  if (error || !award) {
    return (
        <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
            <h1 className="text-4xl font-bold text-green-900 mb-6">Guidelines Not Found</h1>
            <p className="text-gray-800 text-base leading-relaxed">
                {error || "No guidelines available for this award yet."}
            </p>
            <Link to="/awards" className="text-green-600 mt-4 inline-block">← Back to Awards</Link>
        </div>
    );
  }

  return (
    <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        {award.name} - Guidelines
      </h1>
      <div className="text-gray-800 text-base leading-relaxed space-y-6">
        <div><b>Name of the Award</b><div>{award.name}</div></div>
        {award.value && <div><b>Value of the Award</b><div>{award.value}</div></div>}
        {award.periodicity && <div><b>Periodicity of the Award</b><div>{award.periodicity}</div></div>}
        {award.eligibility && <div><b>Eligibility of the Award</b><div className="whitespace-pre-line">{award.eligibility}</div></div>}
        {award.administration && <div><b>Administration of the Award</b><div className="whitespace-pre-line">{award.administration}</div></div>}
        {award.procedure && <div><b>Procedure for selection of Recipients</b><div className="whitespace-pre-line">{award.procedure}</div></div>}
        {award.presentation && <div><b>Presentation of the Award</b><div className="whitespace-pre-line">{award.presentation}</div></div>}
      </div>
    </div>
  );
}