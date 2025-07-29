import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function EditorialBoardManagement() {
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