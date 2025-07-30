import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for books
const API_URL = "http://localhost:5000/api/books";

export default function BooksManagement() {
  const [books, setBooks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingBook, setEditingBook] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    editors: "",
    year: "",
    pages: "",
    price: "",
    isbn: "",
    aboutBook: "",
    contents: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all books
  const fetchBooks = async () => {
    try {
      const response = await axios.get(API_URL);
      setBooks(response.data);
    } catch (error) {
      console.error("Error fetching books:", error);
      alert("Failed to load books.");
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) {
      alert("Authentication required. Please log in.");
      return;
    }

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare data payload to match the backend model
    const bookData = {
      name: formData.name,
      // Convert comma-separated editors string to an array
      editors: formData.editors.split(',').map(editor => editor.trim()),
      // Ensure numeric fields are sent as numbers
      year: Number(formData.year),
      pages: Number(formData.pages),
      // Remove non-numeric characters from price (like '₹' or ',')
      price: Number(String(formData.price).replace(/[^0-9.]/g, '')),
      isbn: formData.isbn,
      // Map frontend `aboutBook` to backend `about` field
      about: formData.aboutBook,
      contents: formData.contents,
    };

    try {
      if (editingBook) {
        // UPDATE operation
        await axios.put(`${API_URL}/${editingBook._id}`, bookData, config);
        alert("Book updated successfully!");
      } else {
        // CREATE operation
        await axios.post(API_URL, bookData, config);
        alert("Book added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving book:", error);
      alert("Failed to save book details.");
    }
  };

  // 3. DELETE: Remove a book
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this book?")) return;
    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Book deleted successfully!");
      fetchBooks();
    } catch (error) {
      console.error("Error deleting book:", error);
      alert("Failed to delete book.");
    }
  };

  // --- Helper Functions ---

  // Pre-fill the form for editing
  const handleEdit = (item) => {
    setEditingBook(item);
    setShowForm(true);
    setFormData({
      name: item.name || "",
      // Convert editors array back to a comma-separated string
      editors: Array.isArray(item.editors) ? item.editors.join(', ') : "",
      year: item.year || "",
      pages: item.pages || "",
      price: item.price || "",
      isbn: item.isbn || "",
      // Map backend `about` field to frontend `aboutBook`
      aboutBook: item.about || "",
      contents: item.contents || "",
    });
  };

  // Clear the form and refresh the data grid
  const resetFormAndRefresh = () => {
    setFormData({ name: "", editors: "", year: "", pages: "", price: "", isbn: "", aboutBook: "", contents: "" });
    setEditingBook(null);
    setShowForm(false);
    fetchBooks();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Books Management</h2>
        <button
          onClick={() => {
            setEditingBook(null);
            setFormData({ name: "", editors: "", year: "", pages: "", price: "", isbn: "", aboutBook: "", contents: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingBook ? "Edit Book" : "Add New Book"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
                <input type="text" value={formData.name} onChange={(e) => setFormData({ ...formData, name: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Editors (comma-separated)</label>
                <input type="text" value={formData.editors} onChange={(e) => setFormData({ ...formData, editors: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input type="number" value={formData.year} onChange={(e) => setFormData({ ...formData, year: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" min="1900" max="2099" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                <input type="number" value={formData.pages} onChange={(e) => setFormData({ ...formData, pages: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" min="1" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input type="text" value={formData.price} onChange={(e) => setFormData({ ...formData, price: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="e.g., ₹1500 or 1500" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input type="text" value={formData.isbn} onChange={(e) => setFormData({ ...formData, isbn: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" placeholder="978-1234567890" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About the Book</label>
              <textarea value={formData.aboutBook} onChange={(e) => setFormData({ ...formData, aboutBook: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md h-24" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contents</label>
              <textarea value={formData.contents} onChange={(e) => setFormData({ ...formData, contents: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md h-32" placeholder="Chapter 1: ..., Chapter 2: ..." required />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingBook ? "Update" : "Save"}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((item) => (
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">ISBN: {item.isbn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{Array.isArray(item.editors) ? item.editors.join(', ') : ''}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">₹{item.price}</td>
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