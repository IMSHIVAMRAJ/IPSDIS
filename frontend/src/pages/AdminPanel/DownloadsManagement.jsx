import React, { useState, useEffect } from "react";
import { FaPlus, FaTrash, FaDownload } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api/downloads";

export default function DownloadsManagement() {
  const [downloads, setDownloads] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ title: "" });
  const [pdfFile, setPdfFile] = useState(null);

  const getToken = () => localStorage.getItem("adminToken");

  const fetchDownloads = async () => {
    try {
      const response = await axios.get(API_URL);
      setDownloads(response.data);
    } catch (error) {
      console.error("Error fetching downloads:", error);
      alert("Failed to load downloads.");
    }
  };

  useEffect(() => {
    fetchDownloads();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token || !pdfFile) {
        alert("Authentication and PDF file are required.");
        return;
    }
    const data = new FormData();
    data.append("title", formData.title);
    data.append("pdf", pdfFile);

    const config = {
      headers: {
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.post(API_URL, data, config);
      alert("Download added successfully!");
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error adding download:", error);
      alert("Failed to add download.");
    }
  };

  // --- Start of Changed Code ---
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this download?")) return;
    
    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Download deleted successfully!");
      fetchDownloads();
    } catch (error) {
      console.error("Error deleting download:", error);
      alert("Failed to delete download. Please check your backend route carefully.");
    }
  };
  // --- End of Changed Code ---

  const handleDownload = async (item) => {
    try {
      const response = await axios.get(item.pdfUrl, {
        responseType: 'blob',
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', `${item.title}.pdf`);
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
      window.URL.revokeObjectURL(url);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Could not download the file.");
    }
  };

  const resetFormAndRefresh = () => {
    setFormData({ title: "" });
    setPdfFile(null);
    setShowForm(false);
    fetchDownloads();
  };

  // The rest of the component's JSX remains the same
  return (
    <div className="space-y-6">
      {/* ... form and table JSX ... */}
       <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Downloads Management</h2>
        <button
          onClick={() => {
            setFormData({ title: "" });
            setPdfFile(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Download
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">Add New Download</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input type="text" value={formData.title} onChange={(e) => setFormData({ ...formData, title: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">PDF File</label>
              <input type="file" accept=".pdf" onChange={(e) => setPdfFile(e.target.files[0])} className="w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-green-50 file:text-green-700 hover:file:bg-green-100" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">Save</button>
              <button type="button" onClick={resetFormAndRefresh} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">Cancel</button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Uploaded At</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {downloads.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.uploadedAt).toLocaleDateString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-4">
                    <button onClick={() => handleDownload(item)} className="text-blue-600 hover:text-blue-900" title="Download">
                      <FaDownload />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900" title="Delete">
                      <FaTrash />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}