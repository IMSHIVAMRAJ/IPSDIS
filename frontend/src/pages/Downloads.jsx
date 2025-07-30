import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API URL for your downloads endpoint
const API_URL = "http://localhost:5000/api/downloads";

function Downloads() {
  const [downloads, setDownloads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDownloads = async () => {
      try {
        const response = await axios.get(API_URL);
        // Sort data to show the most recently uploaded files first
        const sortedData = response.data.sort((a, b) => new Date(b.uploadedAt) - new Date(a.uploadedAt));
        setDownloads(sortedData);
      } catch (err) {
        console.error("Error fetching downloads:", err);
        setError("Could not load downloads. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchDownloads();
  }, []);

  // Function to handle the file download when a title is clicked
  const handleDownload = async (item) => {
    try {
      const response = await axios.get(item.pdfUrl, {
        responseType: 'blob', // Important to get the file as a binary blob
      });
      // Create a temporary URL for the blob
      const url = window.URL.createObjectURL(new Blob([response.data]));
      // Create a temporary link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${item.title}.pdf`); // Set the filename
      document.body.appendChild(link);
      link.click();
      // Clean up by removing the link and revoking the URL
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Could not download the file.");
    }
  };

  if (loading) {
    return <div className="text-center py-10">Loading Downloads...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-5xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-normal mb-6 text-green-900">Downloads</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-3 text-left font-semibold text-gray-800 w-12">#</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {downloads.map((item, idx) => (
              <tr
                key={item._id}
                className="border-b border-gray-200 last:border-b-0 hover:bg-green-50 transition"
              >
                <td className="px-4 py-3 text-green-700 font-medium">{idx + 1}</td>
                <td className="px-4 py-3">
                  {/* Changed from an <a> tag to a <button> to trigger the download function */}
                  <button
                    onClick={() => handleDownload(item)}
                    className="text-green-700 underline text-left font-medium hover:text-green-900"
                  >
                    {item.title}
                  </button>
                </td>
                <td className="px-4 py-3 text-gray-600 text-sm">
                  {new Date(item.uploadedAt).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Downloads;