import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for award nominations
const API_URL = "http://localhost:5000/api/award-nomination";

export default function NominationsManagement() {
  const [nominations, setNominations] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNomination, setEditingNomination] = useState(null);
  const [formData, setFormData] = useState({
    mainContent: "",
    instructions: "",
    links: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all nomination info
  const fetchNominations = async () => {
    try {
      const response = await axios.get(API_URL);
      setNominations(response.data);
    } catch (error) {
      console.error("Error fetching nominations:", error);
      alert("Failed to load nomination info.");
    }
  };

  useEffect(() => {
    fetchNominations();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Authentication required. Please log in.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare data payload to match the backend model
    const nominationData = {
      mainContent: formData.mainContent,
      // Convert multiline instructions string into an array
      instructions: formData.instructions.split('\n').filter(line => line.trim() !== ''),
      // Convert single link string into an array
      links: formData.links ? [formData.links] : [],
    };

    try {
      if (editingNomination) {
        // UPDATE operation
        await axios.put(`${API_URL}/${editingNomination._id}`, nominationData, config);
        alert("Nomination info updated successfully!");
      } else {
        // CREATE operation
        await axios.post(API_URL, nominationData, config);
        alert("Nomination info added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving nomination info:", error);
      alert("Failed to save nomination info.");
    }
  };

  // 3. DELETE: Remove nomination info
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this information?")) return;

    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Nomination info deleted successfully!");
      fetchNominations();
    } catch (error) {
      console.error("Error deleting nomination info:", error);
      alert("Failed to delete nomination info.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingNomination(item);
    setShowForm(true);
    setFormData({
      mainContent: item.mainContent || "",
      // Join instructions array into a multiline string for the textarea
      instructions: Array.isArray(item.instructions) ? item.instructions.join('\n') : "",
      // Take the first link from the array for the input field
      links: Array.isArray(item.links) && item.links.length > 0 ? item.links[0] : "",
    });
  };

  // Clear the form and refresh the data grid
  const resetFormAndRefresh = () => {
    setFormData({ mainContent: "", instructions: "", links: "" });
    setEditingNomination(null);
    setShowForm(false);
    fetchNominations();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Award Nominations Management</h2>
        <button
          onClick={() => {
            setEditingNomination(null);
            setFormData({ mainContent: "", instructions: "", links: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Nomination Info
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingNomination ? "Edit Nomination Info" : "Add New Nomination Info"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Main Content</label>
              <textarea
                value={formData.mainContent}
                onChange={(e) => setFormData({ ...formData, mainContent: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Enter main content about the nomination process..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (one per line)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({ ...formData, instructions: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="1. First instruction...\n2. Second instruction...\n3. Third instruction..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
              <input
                type="url"
                value={formData.links}
                onChange={(e) => setFormData({ ...formData, links: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://example.com/nomination-form"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingNomination ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={resetFormAndRefresh}
                className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-white rounded-lg shadow overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Main Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nominations.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm text-gray-900">
                  <p className="line-clamp-2">{item.mainContent}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.links && item.links.length > 0 && (
                    <a href={item.links[0]} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Link
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900"><FaEdit /></button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900"><FaTrash /></button>
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