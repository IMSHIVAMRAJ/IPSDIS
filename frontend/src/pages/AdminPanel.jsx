import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash, FaEye } from "react-icons/fa";

// News Tab Component
function NewsTab() {
  const [news, setNews] = useState([
    {
      id: 1,
      title: "Sample News Title",
      date: "2024-12-20",
      image: "/Images/banner Nagpur.jpg",
      content: "This is a sample news content with detailed information...",
      links: "https://example.com"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    image: "",
    content: "",
    links: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNews) {
      setNews(news.map(item => item.id === editingNews.id ? { ...formData, id: editingNews.id } : item));
      setEditingNews(null);
    } else {
      setNews([...news, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: "", date: "", image: "", content: "", links: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingNews(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNews(news.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">News Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add News
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingNews ? "Edit News" : "Add New News"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  News Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Date
                </label>
                <input
                  type="date"
                  value={formData.date}
                  onChange={(e) => setFormData({...formData, date: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Image URL
              </label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="/Images/image.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Content
              </label>
              <textarea
                value={formData.content}
                onChange={(e) => setFormData({...formData, content: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Links
              </label>
              <input
                type="url"
                value={formData.links}
                onChange={(e) => setFormData({...formData, links: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="https://example.com"
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingNews ? "Update" : "Save"}
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {news.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.title}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.date}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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

// Executive Council Tab Component
function ExecutiveCouncilTab() {
  const [council, setCouncil] = useState([
    {
      id: 1,
      name: "Dr. John Doe",
      designation: "President",
      image: "/Images/logo.png",
      postalAddress: "123 Main Street, City, State 12345",
      email: "john.doe@example.com",
      mobile: "+91-9876543210",
      biodata: "Dr. John Doe has over 20 years of experience in plant pathology..."
    }
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setCouncil(council.map(item => item.id === editingMember.id ? { ...formData, id: editingMember.id } : item));
      setEditingMember(null);
    } else {
      setCouncil([...council, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", designation: "", image: "", postalAddress: "", email: "", mobile: "", biodata: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingMember(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setCouncil(council.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Executive Council Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingMember ? "Edit Council Member" : "Add New Council Member"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Designation</label>
                <input
                  type="text"
                  value={formData.designation}
                  onChange={(e) => setFormData({...formData, designation: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
              <input
                type="text"
                value={formData.image}
                onChange={(e) => setFormData({...formData, image: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="/Images/member.jpg"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Postal Address</label>
              <textarea
                value={formData.postalAddress}
                onChange={(e) => setFormData({...formData, postalAddress: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email ID</label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Mobile No.</label>
                <input
                  type="tel"
                  value={formData.mobile}
                  onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Brief Biodata</label>
              <textarea
                value={formData.biodata}
                onChange={(e) => setFormData({...formData, biodata: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
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
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <img className="h-10 w-10 rounded-full mr-3" src={item.image} alt={item.name} />
                    <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.designation}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.email}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.mobile}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Editorial Board Tab Component
function EditorialBoardTab() {
  const [board, setBoard] = useState([
    {
      id: 1,
      category: "Chief Editor",
      content: "Dr. Jane Smith",
      areasOfSpecialization: "Plant Pathology, Mycology, Disease Management"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({
    category: "",
    content: "",
    areasOfSpecialization: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMember) {
      setBoard(board.map(item => item.id === editingMember.id ? { ...formData, id: editingMember.id } : item));
      setEditingMember(null);
    } else {
      setBoard([...board, { ...formData, id: Date.now() }]);
    }
    setFormData({ category: "", content: "", areasOfSpecialization: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingMember(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setBoard(board.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Editorial Board Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Member
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingMember ? "Edit Board Member" : "Add New Board Member"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({...formData, category: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              >
                <option value="">Select Category</option>
                <option value="Chief Editor">Chief Editor</option>
                <option value="Associate Editor">Associate Editor</option>
                <option value="Editorial Board Member">Editorial Board Member</option>
                <option value="Reviewer">Reviewer</option>
              </select>
            </div>
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
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className="inline-flex px-2 py-1 text-xs font-semibold rounded-full bg-green-100 text-green-800">
                    {item.category}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.content}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.areasOfSpecialization}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Books Tab Component
function BooksTab() {
  const [books, setBooks] = useState([
    {
      id: 1,
      name: "Plant Pathology Handbook",
      editors: "Dr. John Doe, Dr. Jane Smith",
      year: "2023",
      pages: "450",
      price: "₹1500",
      isbn: "978-1234567890",
      aboutBook: "Comprehensive guide to plant pathology...",
      contents: "Chapter 1: Introduction, Chapter 2: Disease Management..."
    }
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingBook) {
      setBooks(books.map(item => item.id === editingBook.id ? { ...formData, id: editingBook.id } : item));
      setEditingBook(null);
    } else {
      setBooks([...books, { ...formData, id: Date.now() }]);
    }
    setFormData({ name: "", editors: "", year: "", pages: "", price: "", isbn: "", aboutBook: "", contents: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingBook(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setBooks(books.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Books Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Book
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingBook ? "Edit Book" : "Add New Book"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Book Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Editors</label>
                <input
                  type="text"
                  value={formData.editors}
                  onChange={(e) => setFormData({...formData, editors: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1900"
                  max="2030"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Pages</label>
                <input
                  type="number"
                  value={formData.pages}
                  onChange={(e) => setFormData({...formData, pages: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
                <input
                  type="text"
                  value={formData.price}
                  onChange={(e) => setFormData({...formData, price: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹1500"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">ISBN</label>
              <input
                type="text"
                value={formData.isbn}
                onChange={(e) => setFormData({...formData, isbn: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                placeholder="978-1234567890"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">About the Book</label>
              <textarea
                value={formData.aboutBook}
                onChange={(e) => setFormData({...formData, aboutBook: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Contents</label>
              <textarea
                value={formData.contents}
                onChange={(e) => setFormData({...formData, contents: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Chapter 1: Introduction, Chapter 2: Disease Management..."
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingBook ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingBook(null);
                  setFormData({ name: "", editors: "", year: "", pages: "", price: "", isbn: "", aboutBook: "", contents: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Book Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Editors</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {books.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm font-medium text-gray-900">{item.name}</div>
                  <div className="text-sm text-gray-500">ISBN: {item.isbn}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.editors}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.price}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Workshops Tab Component
function WorkshopsTab() {
  const [workshops, setWorkshops] = useState([
    {
      id: 1,
      sno: 1,
      year: "2024",
      topic: "Advanced Plant Pathology Techniques",
      venue: "IARI, New Delhi",
      date: "2024-03-15"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingWorkshop, setEditingWorkshop] = useState(null);
  const [formData, setFormData] = useState({
    sno: "",
    year: "",
    topic: "",
    venue: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingWorkshop) {
      setWorkshops(workshops.map(item => item.id === editingWorkshop.id ? { ...formData, id: editingWorkshop.id } : item));
      setEditingWorkshop(null);
    } else {
      setWorkshops([...workshops, { ...formData, id: Date.now() }]);
    }
    setFormData({ sno: "", year: "", topic: "", venue: "", date: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingWorkshop(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setWorkshops(workshops.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Workshops Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Workshop
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingWorkshop ? "Edit Workshop" : "Add New Workshop"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">S.No.</label>
                <input
                  type="number"
                  value={formData.sno}
                  onChange={(e) => setFormData({...formData, sno: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1900"
                  max="2030"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic</label>
              <input
                type="text"
                value={formData.topic}
                onChange={(e) => setFormData({...formData, topic: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Venue</label>
              <input
                type="text"
                value={formData.venue}
                onChange={(e) => setFormData({...formData, venue: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingWorkshop ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingWorkshop(null);
                  setFormData({ sno: "", year: "", topic: "", venue: "", date: "" });
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
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.topic}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.venue}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Awards Tab Component
function AwardsTab() {
  const [awards, setAwards] = useState([
    {
      id: 1,
      sno: 1,
      name: "IPS Excellence Award",
      year: "2024",
      value: "₹50,000",
      periodicity: "Annual",
      eligibility: "Members with 10+ years experience",
      administration: "Award Committee",
      procedure: "Nomination based selection",
      presentation: "Annual Conference"
    }
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAward) {
      setAwards(awards.map(item => item.id === editingAward.id ? { ...formData, id: editingAward.id } : item));
      setEditingAward(null);
    } else {
      setAwards([...awards, { ...formData, id: Date.now() }]);
    }
    setFormData({ sno: "", name: "", year: "", value: "", periodicity: "", eligibility: "", administration: "", procedure: "", presentation: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingAward(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAwards(awards.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Awards Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Award
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingAward ? "Edit Award" : "Add New Award"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">S.No.</label>
                <input
                  type="number"
                  value={formData.sno}
                  onChange={(e) => setFormData({...formData, sno: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Award Name</label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1900"
                  max="2030"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Value</label>
                <input
                  type="text"
                  value={formData.value}
                  onChange={(e) => setFormData({...formData, value: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹50,000"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Periodicity</label>
                <select
                  value={formData.periodicity}
                  onChange={(e) => setFormData({...formData, periodicity: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Periodicity</option>
                  <option value="Annual">Annual</option>
                  <option value="Biennial">Biennial</option>
                  <option value="Triennial">Triennial</option>
                  <option value="One-time">One-time</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Administration</label>
                <input
                  type="text"
                  value={formData.administration}
                  onChange={(e) => setFormData({...formData, administration: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Eligibility</label>
              <textarea
                value={formData.eligibility}
                onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Procedure</label>
              <textarea
                value={formData.procedure}
                onChange={(e) => setFormData({...formData, procedure: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-20"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Presentation</label>
              <input
                type="text"
                value={formData.presentation}
                onChange={(e) => setFormData({...formData, presentation: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingAward ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAward(null);
                  setFormData({ sno: "", name: "", year: "", value: "", periodicity: "", eligibility: "", administration: "", procedure: "", presentation: "" });
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
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.value}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.periodicity}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Awardees Tab Component
function AwardeesTab() {
  const [awardees, setAwardees] = useState([
    {
      id: 1,
      awardName: "IPS Excellence Award",
      sno: 1,
      year: "2024",
      awardeeName: "Dr. John Smith",
      topicOfLecture: "Advances in Plant Disease Management"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingAwardee, setEditingAwardee] = useState(null);
  const [formData, setFormData] = useState({
    awardName: "",
    sno: "",
    year: "",
    awardeeName: "",
    topicOfLecture: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingAwardee) {
      setAwardees(awardees.map(item => item.id === editingAwardee.id ? { ...formData, id: editingAwardee.id } : item));
      setEditingAwardee(null);
    } else {
      setAwardees([...awardees, { ...formData, id: Date.now() }]);
    }
    setFormData({ awardName: "", sno: "", year: "", awardeeName: "", topicOfLecture: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingAwardee(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setAwardees(awardees.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Awardees Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Awardee
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingAwardee ? "Edit Awardee" : "Add New Awardee"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name of Award</label>
                <input
                  type="text"
                  value={formData.awardName}
                  onChange={(e) => setFormData({...formData, awardName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">S.No.</label>
                <input
                  type="number"
                  value={formData.sno}
                  onChange={(e) => setFormData({...formData, sno: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1"
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Year</label>
                <input
                  type="number"
                  value={formData.year}
                  onChange={(e) => setFormData({...formData, year: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  min="1900"
                  max="2030"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Name of Awardee</label>
                <input
                  type="text"
                  value={formData.awardeeName}
                  onChange={(e) => setFormData({...formData, awardeeName: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Topic of Lecture</label>
              <textarea
                value={formData.topicOfLecture}
                onChange={(e) => setFormData({...formData, topicOfLecture: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingAwardee ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingAwardee(null);
                  setFormData({ awardName: "", sno: "", year: "", awardeeName: "", topicOfLecture: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">S.No.</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Award Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Awardee Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Topic of Lecture</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {awardees.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.sno}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.awardName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.year}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{item.awardeeName}</td>
                <td className="px-6 py-4 text-sm text-gray-500">{item.topicOfLecture}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Nominations Tab Component
function NominationsTab() {
  const [nominations, setNominations] = useState([
    {
      id: 1,
      mainContent: "Award nomination guidelines and procedures for IPS Excellence Award",
      instructions: "1. Submit complete application\n2. Include all required documents\n3. Meet eligibility criteria",
      links: "https://example.com/nomination-form"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingNomination, setEditingNomination] = useState(null);
  const [formData, setFormData] = useState({
    mainContent: "",
    instructions: "",
    links: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingNomination) {
      setNominations(nominations.map(item => item.id === editingNomination.id ? { ...formData, id: editingNomination.id } : item));
      setEditingNomination(null);
    } else {
      setNominations([...nominations, { ...formData, id: Date.now() }]);
    }
    setFormData({ mainContent: "", instructions: "", links: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingNomination(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setNominations(nominations.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Award Nominations Management</h2>
        <button
          onClick={() => setShowForm(true)}
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
                onChange={(e) => setFormData({...formData, mainContent: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="Enter main content about the nomination process..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Instructions (in points)</label>
              <textarea
                value={formData.instructions}
                onChange={(e) => setFormData({...formData, instructions: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-32"
                placeholder="1. First instruction\n2. Second instruction\n3. Third instruction..."
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Links</label>
              <input
                type="url"
                value={formData.links}
                onChange={(e) => setFormData({...formData, links: e.target.value})}
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
                onClick={() => {
                  setShowForm(false);
                  setEditingNomination(null);
                  setFormData({ mainContent: "", instructions: "", links: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Main Content</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Instructions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Links</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {nominations.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate">{item.mainContent}</div>
                </td>
                <td className="px-6 py-4 text-sm text-gray-500 max-w-xs">
                  <div className="truncate">{item.instructions}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {item.links && (
                    <a href={item.links} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">
                      View Link
                    </a>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Membership Tab Component
function MembershipTab() {
  const [memberships, setMemberships] = useState([
    {
      id: 1,
      membershipInfo: "Regular membership for professionals in plant pathology",
      nationality: "Indian",
      membershipType: "Regular",
      membershipFee: "₹2000",
      gst: "₹360",
      total: "₹2360"
    }
  ]);
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

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingMembership) {
      setMemberships(memberships.map(item => item.id === editingMembership.id ? { ...formData, id: editingMembership.id } : item));
      setEditingMembership(null);
    } else {
      setMemberships([...memberships, { ...formData, id: Date.now() }]);
    }
    setFormData({ membershipInfo: "", nationality: "", membershipType: "", membershipFee: "", gst: "", total: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingMembership(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setMemberships(memberships.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Membership Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Membership Type
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingMembership ? "Edit Membership Type" : "Add New Membership Type"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Membership Information</label>
              <textarea
                value={formData.membershipInfo}
                onChange={(e) => setFormData({...formData, membershipInfo: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md h-24"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Nationality</label>
                <select
                  value={formData.nationality}
                  onChange={(e) => setFormData({...formData, nationality: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Nationality</option>
                  <option value="Indian">Indian</option>
                  <option value="Foreign">Foreign</option>
                  <option value="International">International</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Type</label>
                <select
                  value={formData.membershipType}
                  onChange={(e) => setFormData({...formData, membershipType: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                >
                  <option value="">Select Type</option>
                  <option value="Regular">Regular</option>
                  <option value="Student">Student</option>
                  <option value="Life">Life</option>
                  <option value="Honorary">Honorary</option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Membership Fee</label>
                <input
                  type="text"
                  value={formData.membershipFee}
                  onChange={(e) => setFormData({...formData, membershipFee: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹2000"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">GST</label>
                <input
                  type="text"
                  value={formData.gst}
                  onChange={(e) => setFormData({...formData, gst: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹360"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Total</label>
                <input
                  type="text"
                  value={formData.total}
                  onChange={(e) => setFormData({...formData, total: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="₹2360"
                  required
                />
              </div>
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingMembership ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingMembership(null);
                  setFormData({ membershipInfo: "", nationality: "", membershipType: "", membershipFee: "", gst: "", total: "" });
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
              <tr key={item.id}>
                <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                  <div className="truncate">{item.membershipInfo}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.nationality}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.membershipType}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.membershipFee}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.gst}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.total}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Payment Details Tab Component
function PaymentDetailsTab() {
  const [paymentDetails, setPaymentDetails] = useState([
    {
      id: 1,
      accountHolder: "Indian Phytopathological Society",
      bankAndBranch: "State Bank of India, IARI Branch",
      accountNumber: "1234567890",
      rtgsNeftIfsc: "SBIN0001234",
      micrCode: "110002123"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    accountHolder: "",
    bankAndBranch: "",
    accountNumber: "",
    rtgsNeftIfsc: "",
    micrCode: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingPayment) {
      setPaymentDetails(paymentDetails.map(item => item.id === editingPayment.id ? { ...formData, id: editingPayment.id } : item));
      setEditingPayment(null);
    } else {
      setPaymentDetails([...paymentDetails, { ...formData, id: Date.now() }]);
    }
    setFormData({ accountHolder: "", bankAndBranch: "", accountNumber: "", rtgsNeftIfsc: "", micrCode: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingPayment(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setPaymentDetails(paymentDetails.filter(item => item.id !== id));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Payment Details Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Payment Details
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingPayment ? "Edit Payment Details" : "Add New Payment Details"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Account Holder</label>
              <input
                type="text"
                value={formData.accountHolder}
                onChange={(e) => setFormData({...formData, accountHolder: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Bank and Branch</label>
              <input
                type="text"
                value={formData.bankAndBranch}
                onChange={(e) => setFormData({...formData, bankAndBranch: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input
                  type="text"
                  value={formData.accountNumber}
                  onChange={(e) => setFormData({...formData, accountNumber: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RTGS/NEFT/IFSC Code</label>
                <input
                  type="text"
                  value={formData.rtgsNeftIfsc}
                  onChange={(e) => setFormData({...formData, rtgsNeftIfsc: e.target.value})}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  required
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MICR Code</label>
              <input
                type="text"
                value={formData.micrCode}
                onChange={(e) => setFormData({...formData, micrCode: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingPayment ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingPayment(null);
                  setFormData({ accountHolder: "", bankAndBranch: "", accountNumber: "", rtgsNeftIfsc: "", micrCode: "" });
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
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Holder</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Bank & Branch</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Account Number</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">IFSC Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">MICR Code</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {paymentDetails.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.accountHolder}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bankAndBranch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.rtgsNeftIfsc}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.micrCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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
// Downloads Tab Component
function DownloadsTab() {
  const [downloads, setDownloads] = useState([
    {
      id: 1,
      title: "Proceedings of Annual General Body Meeting 2024",
      date: "2024-12-20"
    }
  ]);
  const [showForm, setShowForm] = useState(false);
  const [editingDownload, setEditingDownload] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    date: ""
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (editingDownload) {
      setDownloads(downloads.map(item => item.id === editingDownload.id ? { ...formData, id: editingDownload.id } : item));
      setEditingDownload(null);
    } else {
      setDownloads([...downloads, { ...formData, id: Date.now() }]);
    }
    setFormData({ title: "", date: "" });
    setShowForm(false);
  };

  const handleEdit = (item) => {
    setEditingDownload(item);
    setFormData(item);
    setShowForm(true);
  };

  const handleDelete = (id) => {
    setDownloads(downloads.filter(item => item.id !== id));
  };

  const handleDownload = (item) => {
    // This would typically trigger a file download
    alert(`Downloading: ${item.title}`);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Downloads Management</h2>
        <button
          onClick={() => setShowForm(true)}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Download
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            {editingDownload ? "Edit Download" : "Add New Download"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
              <input
                type="text"
                value={formData.title}
                onChange={(e) => setFormData({...formData, title: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
              <input
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({...formData, date: e.target.value})}
                className="w-full p-2 border border-gray-300 rounded-md"
                required
              />
            </div>
            <div className="flex gap-2">
              <button
                type="submit"
                className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700"
              >
                {editingDownload ? "Update" : "Save"}
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowForm(false);
                  setEditingDownload(null);
                  setFormData({ title: "", date: "" });
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
            {downloads.map((item) => (
              <tr key={item.id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.title}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.date}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex gap-2">
                    <button
                      onClick={() => handleDownload(item)}
                      className="text-green-600 hover:text-green-900"
                      title="Download"
                    >
                      <FaEye />
                    </button>
                    <button
                      onClick={() => handleEdit(item)}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      <FaEdit />
                    </button>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="text-red-600 hover:text-red-900"
                    >
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

const TABS = [
  { label: "News", component: <NewsTab /> },
  { label: "Executive Council", component: <ExecutiveCouncilTab /> },
  { label: "Editorial Board", component: <EditorialBoardTab /> },
  { label: "Books", component: <BooksTab /> },
  { label: "Workshops", component: <WorkshopsTab /> },
  { label: "Awards", component: <AwardsTab /> },
  { label: "Awardees", component: <AwardeesTab /> },
  { label: "Nominations", component: <NominationsTab /> },
  { label: "Membership", component: <MembershipTab /> },
  { label: "Payment Details", component: <PaymentDetailsTab /> },
  { label: "Downloads", component: <DownloadsTab /> },
];

export default function AdminPanel() {
  const [activeTab, setActiveTab] = useState(0);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-6xl mx-auto bg-white rounded shadow-lg">
        <h1 className="text-5xl font-normal text-center text-green-900 py-8 border-b">Admin Panel</h1>
        <div className="flex flex-wrap">
          {TABS.map((tab, idx) => (
            <button
              key={tab.label}
              className={`px-6 py-3 font-semibold focus:outline-none ${
                activeTab === idx
                  ? "border-b-4 border-green-700 text-green-900 bg-gray-100"
                  : "text-gray-600 hover:text-green-700"
              }`}
              onClick={() => setActiveTab(idx)}
            >
              {tab.label}
            </button>
          ))}
        </div>
        <div className="p-6">{TABS[activeTab].component}</div>
      </div>
    </div>
  );
} 