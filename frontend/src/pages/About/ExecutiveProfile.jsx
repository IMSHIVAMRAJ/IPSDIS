import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const API_URL = "http://localhost:5000/api/executives";

function ExecutiveProfile() {
  const { profileId } = useParams();
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axios.get(`${API_URL}/${profileId}`);
        const data = response.data;
        // The biodata is stored as a string in the DB, so we must parse it into an object here.
        if (data.biodata) {
          try {
            data.biodata = JSON.parse(data.biodata);
          } catch (e) {
            console.error("Failed to parse biodata JSON:", e);
            // If parsing fails, treat it as a plain string.
            data.biodata = { plainText: data.biodata }; 
          }
        }
        setProfile(data);
      } catch (err) {
        console.error("Error fetching profile:", err);
        setError("Could not load profile.");
      } finally {
        setLoading(false);
      }
    };
    if (profileId) {
      fetchProfile();
    }
  }, [profileId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Profile...</div>;
  }

  if (error || !profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Profile Not Found"}</h1>
          <Link to="/present-executive-council" className="text-green-600 hover:text-green-800">
            ← Back to Executive Council
          </Link>
        </div>
      </div>
    );
  }

  // Handle case where biodata could not be parsed
  if (profile.biodata?.plainText) {
    return (
         <div className="min-h-screen bg-gray-100 py-8">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-8">
                <h1 className="text-3xl font-bold">{profile.name}</h1>
                <p className="whitespace-pre-line mt-4">{profile.biodata.plainText}</p>
            </div>
        </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
        <div className="bg-green-900 text-white p-6">
          <div className="flex items-center justify-between">
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <Link to="/present-executive-council" className="text-white hover:text-green-200 transition-colors">
              ← Back to Council
            </Link>
          </div>
          <p className="text-xl mt-2">{profile.designation}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1 text-center">
              <img src={profile.image} alt={profile.name} className="w-64 h-80 object-cover rounded-lg shadow-lg mx-auto" />
            </div>
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div><span className="font-semibold text-gray-700">Designation:</span><span className="ml-2">{profile.designation}</span></div>
                  <div><span className="font-semibold text-gray-700">Address:</span><span className="ml-2">{profile.postalAddress}</span></div>
                  <div><span className="font-semibold text-gray-700">Email:</span><a href={`mailto:${profile.email}`} className="ml-2 text-green-600 hover:text-green-800">{profile.email}</a></div>
                  <div><span className="font-semibold text-gray-700">Mobile:</span><a href={`tel:${profile.mobile}`} className="ml-2 text-green-600 hover:text-green-800">{profile.mobile}</a></div>
                </div>
              </div>
            </div>
          </div>
          {profile.biodata && (
            <div className="mt-8">
              <h2 className="text-2xl font-bold text-green-900 mb-6">Brief Biodata</h2>
              <div className="space-y-6">
                {/* Render biodata sections only if they exist */}
                {profile.biodata.birth && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Birth & Education</h3>
                        <div className="space-y-3">
                            <p><span className="font-semibold">Birth:</span> {profile.biodata.birth}</p>
                            {profile.biodata.education && (
                                <div>
                                <span className="font-semibold">Education:</span>
                                <ul className="ml-4 mt-2 space-y-1 list-disc list-inside">
                                    {Object.values(profile.biodata.education).map((edu, i) => <li key={i}>{edu}</li>)}
                                </ul>
                                </div>
                            )}
                        </div>
                    </div>
                )}
                {profile.biodata.positions && (
                    <div className="bg-white border border-gray-200 rounded-lg p-6">
                        <h3 className="text-xl font-semibold text-green-800 mb-4">Positions Held</h3>
                        <ul className="space-y-2 list-disc list-inside">
                            {profile.biodata.positions.map((pos, i) => <li key={i}>{pos}</li>)}
                        </ul>
                    </div>
                )}
                {/* Add other biodata sections similarly */}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ExecutiveProfile;