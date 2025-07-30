import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for news
const API_URL = "http://localhost:5000/api/news";

export default function NewsManagement() {
  const [news, setNews] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: "",
    content: "",
    links: ""
  });

  // Helper to get the auth token from localStorage
  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all news from the backend
  const fetchNews = async () => {
    try {
      const response = await axios.get(API_URL);
      setNews(response.data);
    } catch (error) {
      console.error("Error fetching news:", error);
      alert("Failed to load news. Please check your connection.");
    }
  };

  // Fetch news when the component first loads
  useEffect(() => {
    fetchNews();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }

    // Set up the authorization header
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    
    // Map frontend 'content' state to 'bigContent' for the backend model
    const newsData = {
        title: formData.title,
        date: formData.date,
        image: formData.image,
        bigContent: formData.content, 
        links: formData.links,
    };

    try {
      if (editingNews) {
        // UPDATE operation (PUT request)
        await axios.put(`${API_URL}/${editingNews._id}`, newsData, config);
        alert("News updated successfully!");
      } else {
        // CREATE operation (POST request)
        await axios.post(API_URL, newsData, config);
        alert("News created successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving news:", error.response?.data?.message || error.message);
      alert("Failed to save news. Please try again.");
    }
  };
  
  // 3. DELETE: Remove a news item
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this news item?")) return;

    const token = getToken();
     if (!token) {
      alert("Authentication error. Please log in again.");
      return;
    }
    
    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("News deleted successfully!");
      fetchNews(); // Refresh the list after deleting
    } catch (error) {
      console.error("Error deleting news:", error);
      alert("Failed to delete news item.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingNews(item);
    setShowForm(true);
    setFormData({
      title: item.title,
      // Format the date from ISO string to YYYY-MM-DD for the input field
      date: item.date ? new Date(item.date).toISOString().split('T')[0] : "",
      image: item.image || "",
      // Map 'bigContent' from backend to 'content' for the form
      content: item.bigContent || "",
      links: Array.isArray(item.links) ? item.links[0] || "" : ""
    });
  };
  
  const resetFormAndRefresh = () => {
    setFormData({ title: "", date: "", image: "", content: "", links: "" });
    setEditingNews(null);
    setShowForm(false);
    fetchNews(); // Refresh the data grid
  };

  // --- JSX (No major changes needed here) ---
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">News Management</h2>
        <button
          onClick={() => {
            setEditingNews(null);
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add News
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold mb-4">
            {editingNews ? "Edit News" : "Add New News"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">News Title</label>
                <input
                  type="text" value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                <input
                  type="date" value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md" required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text" value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md" placeholder="https://example.com/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32" required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Link (Optional)</label>
              <input
                type="url" value={formData.links}
                onChange={(e) => setFormData({...formData, links: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md" placeholder="https://example.com/related-article"
              />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingNews ? "Update News" : "Save News"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingNews(null);
                  setFormData({ title: "", date: "", image: "", content: "", links: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {new Date(item.date).toLocaleDateString()}
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