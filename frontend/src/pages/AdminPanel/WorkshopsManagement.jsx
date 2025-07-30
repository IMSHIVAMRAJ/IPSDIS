import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for workshops
const API_URL = "http://localhost:5000/api/workshops";

export default function WorkshopsManagement() {
  const [workshops, setWorkshops] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    sno: "",
    year: "",
    topic: "",
    venue: "",
    date: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all workshops
  const fetchWorkshops = async () => {
    try {
      const response = await axios.get(API_URL);
      // Sort by serial number for consistent ordering
      setWorkshops(response.data.sort((a, b) => a.serialNumber - b.serialNumber));
    } catch (error) {
      console.error("Error fetching workshops:", error);
      alert("Failed to load workshops.");
    }
  };

  useEffect(() => {
    fetchWorkshops();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Authentication required. Please log in.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare data payload to match the backend model
    const workshopData = {
      // Map frontend 'sno' to backend 'serialNumber' and ensure it's a number
      serialNumber: Number(formData.sno),
      year: Number(formData.year),
      topic: formData.topic,
      venue: formData.venue,
      date: formData.date,
    };

    try {
      if (editingWorkshop) {
        // UPDATE operation
        await axios.put(`${API_URL}/${editingWorkshop._id}`, workshopData, config);
        alert("Workshop updated successfully!");
      } else {
        // CREATE operation
        await axios.post(API_URL, workshopData, config);
        alert("Workshop added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving workshop:", error);
      alert("Failed to save workshop details.");
    }
  };

  // 3. DELETE: Remove a workshop
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this workshop?")) return;
    
    const token = getToken();
    if (!token) return alert("Authentication required.");
    
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Workshop deleted successfully!");
      fetchWorkshops();
    } catch (error) {
      console.error("Error deleting workshop:", error);
      alert("Failed to delete workshop.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingWorkshop(item);
    setShowForm(true);
    setFormData({
      // Map backend 'serialNumber' back to frontend 'sno'
      sno: item.serialNumber || "",
      year: item.year || "",
      topic: item.topic || "",
      venue: item.venue || "",
      // Format date for the input field
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : "",
    });
  };

  // Clear the form and refresh the data grid
  const resetFormAndRefresh = () => {
    setFormData({ sno: "", year: "", topic: "", venue: "", date: "" });
    setEditingWorkshop(null);
    setShowForm(false);
    fetchWorkshops();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Workshops Management</h2>
        <button
          onClick={() => {
            setEditingWorkshop(null);
            setFormData({ sno: "", year: "", topic: "", venue: "", date: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Workshop
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingWorkshop ? "Edit Workshop" : "Add New Workshop"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">S.No.</label>
                <input type="number" value={formData.sno} onChange={(e) => setFormData({ ...formData, sno: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" min="1900" max="2099" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input type="text" value={formData.topic} onChange={(e) => setFormData({ ...formData, topic: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input type="text" value={formData.venue} onChange={(e) => setFormData({ ...formData, venue: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input type="date" value={formData.date} onChange={(e) => setFormData({ ...formData, date: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingWorkshop ? "Update" : "Save"}
              </button>
              <button type="button" onClick={resetFormAndRefresh} className="bg-gray-500 text-white px-4 py-2 rounded-md hover:bg-gray-600">
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Venue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {workshops.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.serialNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 text-sm text-gray-900">{item.topic}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(item.date).toLocaleDateString()}</td>
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