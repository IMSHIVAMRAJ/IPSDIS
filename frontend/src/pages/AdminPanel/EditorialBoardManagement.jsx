import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api/editorials";

export default function EditorialBoardManagement() {
  const [board, setBoard] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    content: "",
    areasOfSpecialization: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  const fetchBoardMembers = async () => {
    try {
      const response = await axios.get(API_URL);
      setBoard(response.data);
    } catch (error) {
      console.error("Error fetching board members:", error);
      alert("Failed to load board members.");
    }
  };

  useEffect(() => {
    fetchBoardMembers();
  }, []);

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

    const memberData = {
      category: formData.category,
      content: formData.content,
      areasOfSpecialization: formData.areasOfSpecialization.split(',').map(area => area.trim()),
    };

    try {
      if (editingMember) {
        await axios.put(`${API_URL}/${editingMember._id}`, memberData, config);
        alert("Member updated successfully!");
      } else {
        await axios.post(API_URL, memberData, config);
        alert("Member added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving member:", error);
      alert("Failed to save member details.");
    }
  };

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
      fetchBoardMembers();
    } catch (error) {
      console.error("Error deleting member:", error);
      alert("Failed to delete member.");
    }
  };

  const handleEdit = (item) => {
    setEditingMember(item);
    setShowForm(true);
    setFormData({
      category: item.category || "",
      content: item.content || "",
      areasOfSpecialization: Array.isArray(item.areasOfSpecialization) 
        ? item.areasOfSpecialization.join(', ') 
        : "",
    });
  };

  const resetFormAndRefresh = () => {
    setFormData({ category: "", content: "", areasOfSpecialization: "" });
    setEditingMember(null);
    setShowForm(false);
    fetchBoardMembers();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Editorial Board Management</h2>
        <button
          onClick={() => {
            setEditingMember(null);
            setFormData({ category: "", content: "", areasOfSpecialization: "" });
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
            {editingMember ? "Edit Board Member" : "Add New Board Member"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {/* --- Start of Changed Code --- */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <input
                type="text"
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="e.g., Chief Editor, Reviewer"
                required
              />
            </div>
            {/* --- End of Changed Code --- */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content/Name</label>
              <input
                type="text"
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Areas of Specialization</label>
              <textarea
                value={formData.areasOfSpecialization}
                onChange={(e) => setFormData({...formData, areasOfSpecialization: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Enter areas of specialization separated by commas"
                required
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
                  setFormData({ category: "", content: "", areasOfSpecialization: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Content/Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Areas of Specialization</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {board.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.content}</td>
                <td className="px-6 py-4 text-sm text-gray-500">
                  {Array.isArray(item.areasOfSpecialization) ? item.areasOfSpecialization.join(', ') : ''}
                </td>
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