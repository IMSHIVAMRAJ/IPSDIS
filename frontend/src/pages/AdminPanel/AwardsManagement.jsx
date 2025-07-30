import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for awards
const API_URL = "http://localhost:5000/api/awards";

export default function AwardsManagement() {
  const [awards, setAwards] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingAward, setEditingAward] = useState(null);
  const [formData, setFormData] = useState({
    sno: "",
    name: "",
    year: "",
    value: "",
    periodicity: "",
    eligibility: "",
    administration: "",
    procedure: "",
    presentation: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all awards
  const fetchAwards = async () => {
    try {
      const response = await axios.get(API_URL);
      // Sort by serial number for consistent ordering
      setAwards(response.data.sort((a, b) => a.sno - b.sno));
    } catch (error) {
      console.error("Error fetching awards:", error);
      alert("Failed to load awards.");
    }
  };

  useEffect(() => {
    fetchAwards();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Authentication required. Please log in.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare data payload, ensuring numeric fields are numbers
    const awardData = {
      ...formData,
      sno: Number(formData.sno),
      year: Number(formData.year),
    };

    try {
      if (editingAward) {
        // UPDATE operation
        await axios.put(`${API_URL}/${editingAward._id}`, awardData, config);
        alert("Award updated successfully!");
      } else {
        // CREATE operation
        await axios.post(API_URL, awardData, config);
        alert("Award added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving award:", error);
      alert("Failed to save award details.");
    }
  };

  // 3. DELETE: Remove an award
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this award?")) return;
    
    const token = getToken();
    if (!token) return alert("Authentication required.");
    
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Award deleted successfully!");
      fetchAwards();
    } catch (error) {
      console.error("Error deleting award:", error);
      alert("Failed to delete award.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingAward(item);
    setShowForm(true);
    // The form data fields directly match the item fields from the database
    setFormData({
        sno: item.sno || "",
        name: item.name || "",
        year: item.year || "",
        value: item.value || "",
        periodicity: item.periodicity || "",
        eligibility: item.eligibility || "",
        administration: item.administration || "",
        procedure: item.procedure || "",
        presentation: item.presentation || ""
    });
  };

  // Clear the form and refresh the data grid
  const resetFormAndRefresh = () => {
    setFormData({ sno: "", name: "", year: "", value: "", periodicity: "", eligibility: "", administration: "", procedure: "", presentation: "" });
    setEditingAward(null);
    setShowForm(false);
    fetchAwards();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Awards Management</h2>
        <button
          onClick={() => {
            setEditingAward(null);
            setFormData({ sno: "", name: "", year: "", value: "", periodicity: "", eligibility: "", administration: "", procedure: "", presentation: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Award
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingAward ? "Edit Award" : "Add New Award"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">S.No.</label>
                <input type="number" value={formData.sno} onChange={(e) => setFormData({...formData, sno: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" value={formData.year} onChange={(e) => setFormData({...formData, year: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" min="1900" max="2099" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input type="text" value={formData.value} onChange={(e) => setFormData({...formData, value: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" placeholder="₹50,000" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Periodicity</label>
                <select value={formData.periodicity} onChange={(e) => setFormData({...formData, periodicity: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" required>
                  <option value="">Select Periodicity</option>
                  <option value="Annual">Annual</option>
                  <option value="Biennial">Biennial</option>
                  <option value="Triennial">Triennial</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Administration</label>
                <input type="text" value={formData.administration} onChange={(e) => setFormData({...formData, administration: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
              <textarea value={formData.eligibility} onChange={(e) => setFormData({...formData, eligibility: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md h-20" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Procedure</label>
              <textarea value={formData.procedure} onChange={(e) => setFormData({...formData, procedure: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md h-20" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presentation</label>
              <input type="text" value={formData.presentation} onChange={(e) => setFormData({...formData, presentation: e.target.value})} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingAward ? "Update" : "Save"}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Value</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Periodicity</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {awards.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.periodicity}</td>
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