import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for memberships
const API_URL = "http://localhost:5000/api/memberships";

export default function MembershipManagement() {
  const [memberships, setMemberships] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMembership, setEditingMembership] = useState(null);
  const [formData, setFormData] = useState({
    membershipInfo: "",
    nationality: "",
    membershipType: "",
    membershipFee: "",
    gst: "",
    total: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  const fetchMemberships = async () => {
    try {
      const response = await axios.get(`${API_URL}/get`);
      setMemberships(response.data);
    } catch (error) {
      console.error("Error fetching memberships:", error);
      alert("Failed to load memberships.");
    }
  };

  useEffect(() => {
    fetchMemberships();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Authentication required. Please log in.");

    const config = { headers: { Authorization: `Bearer ${token}` } };
    const parseCurrency = (value) => Number(String(value).replace(/[^0-9.]/g, ''));

    const membershipData = {
      membershipInfo: formData.membershipInfo,
      nationality: formData.nationality,
      membershipType: formData.membershipType,
      membershipFee: parseCurrency(formData.membershipFee),
      gst: parseCurrency(formData.gst),
      total: parseCurrency(formData.total),
    };

    try {
      if (editingMembership) {
        await axios.put(`${API_URL}/${editingMembership._id}`, membershipData, config);
        alert("Membership updated successfully!");
      } else {
        await axios.post(`${API_URL}/create`, membershipData, config);
        alert("Membership added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving membership:", error);
      alert("Failed to save membership details.");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this membership type?")) return;

    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Membership deleted successfully!");
      fetchMemberships();
    } catch (error) {
      console.error("Error deleting membership:", error);
      alert("Failed to delete membership.");
    }
  };

  // --- Helper Functions ---

  const handleEdit = (item) => {
    setEditingMembership(item);
    setShowForm(true);
    setFormData({
      membershipInfo: item.membershipInfo || "",
      nationality: item.nationality || "",
      membershipType: item.membershipType || "",
      membershipFee: item.membershipFee || "",
      gst: item.gst || "",
      total: item.total || ""
    });
  };

  const resetFormAndRefresh = () => {
    setFormData({ membershipInfo: "", nationality: "", membershipType: "", membershipFee: "", gst: "", total: "" });
    setEditingMembership(null);
    setShowForm(false);
    fetchMemberships();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Membership Management</h2>
        <button
          onClick={() => {
            setEditingMembership(null);
            setFormData({ membershipInfo: "", nationality: "", membershipType: "", membershipFee: "", gst: "", total: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Membership Type
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingMembership ? "Edit Membership Type" : "Add New Membership Type"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Membership Information</label>
              <textarea value={formData.membershipInfo} onChange={(e) => setFormData({ ...formData, membershipInfo: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md h-24" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <select value={formData.nationality} onChange={(e) => setFormData({ ...formData, nationality: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required>
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="SAARC">SAARC</option>
                  <option value="Foreign">Foreign</option>
                </select>
              </div>
              {/* --- Start of Changed Code --- */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                <input
                  type="text"
                  value={formData.membershipType}
                  onChange={(e) => setFormData({ ...formData, membershipType: e.target.value })}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="e.g., Annual, Life, Student"
                  required
                />
              </div>
              {/* --- End of Changed Code --- */}
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Fee</label>
                <input type="text" value={formData.membershipFee} onChange={(e) => setFormData({ ...formData, membershipFee: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., ₹2000 or 2000" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST</label>
                <input type="text" value={formData.gst} onChange={(e) => setFormData({ ...formData, gst: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., ₹360 or 360" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <input type="text" value={formData.total} onChange={(e) => setFormData({ ...formData, total: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., ₹2360 or 2360" required />
              </div>
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingMembership ? "Update" : "Save"}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Membership Info</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nationality</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Fee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">GST</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {memberships.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <p className="line-clamp-2">{item.membershipInfo}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.membershipType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.membershipFee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.gst}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">₹{item.total}</td>
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