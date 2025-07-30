import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for the executive council
// Make sure this matches the base route in your server's main file
const API_URL = "http://localhost:5000/api/executives";

export default function ExecutiveCouncilManagement() {
  const [council, setCouncil] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    designation: "",
    image: "",
    postalAddress: "",
    email: "",
    mobile: "",
    biodata: ""
  });

  // Helper to get the auth token from localStorage
  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all council members
  const fetchCouncilMembers = async () => {
    try {
      // Your route for getting all members is "/get"
      const response = await axios.get(`${API_URL}/get`);
      setCouncil(response.data);
    } catch (error) {
      console.error("Error fetching council members:", error);
      alert("Failed to load council members.");
    }
  };

  // Fetch data when the component first loads
  useEffect(() => {
    fetchCouncilMembers();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    const config = {
      headers: { Authorization: `Bearer ${token}` },
    };

    // The form data matches the model, so we can use it directly
    const memberData = formData;

    try {
      if (editingMember) {
        // UPDATE operation (PUT request)
        await axios.put(`${API_URL}/${editingMember._id}`, memberData, config);
        alert("Member updated successfully!");
      } else {
        // CREATE operation (POST request)
        await axios.post(API_URL, memberData, config);
        alert("Member added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member details.");
    }
  };

  // 3. DELETE: Remove a council member
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this member?")) return;

    const token = getToken();
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Member deleted successfully!");
      fetchCouncilMembers(); // Refresh the list
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingMember(item);
    setShowForm(true);
    // The form data fields directly match the item fields from the database
    setFormData({
      name: item.name || "",
      designation: item.designation || "",
      image: item.image || "",
      postalAddress: item.postalAddress || "",
      email: item.email || "",
      mobile: item.mobile || "",
      biodata: item.biodata || ""
    });
  };
  
  // Clear the form and refresh the data grid
  const resetFormAndRefresh = () => {
    setFormData({ name: "", designation: "", image: "", postalAddress: "", email: "", mobile: "", biodata: "" });
    setEditingMember(null);
    setShowForm(false);
    fetchCouncilMembers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Executive Council Management</h2>
        <button
          onClick={() => {
            setEditingMember(null);
            setFormData({ name: "", designation: "", image: "", postalAddress: "", email: "", mobile: "", biodata: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingMember ? "Edit Council Member" : "Add New Council Member"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* The form JSX remains the same */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text" value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input
                  type="text" value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text" value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md" placeholder="/Images/member.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
              <textarea
                value={formData.postalAddress}
                onChange={(e) => setFormData({...formData, postalAddress: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20" required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input
                  type="email" value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                <input
                  type="tel" value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brief Biodata</label>
              <textarea
                value={formData.biodata}
                onChange={(e) => setFormData({...formData, biodata: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32" required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingMember ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMember(null);
                  setFormData({ name: "", designation: "", image: "", postalAddress: "", email: "", mobile: "", biodata: "" });
                }}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Designation</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Mobile</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {council.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full mr-3 object-cover" src={item.image} alt={item.name} />
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-4">
                    <button onClick={() => handleEdit(item)} className="text-indigo-600 hover:text-indigo-900">
                      <FaEdit />
                    </button>
                    <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-900">
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