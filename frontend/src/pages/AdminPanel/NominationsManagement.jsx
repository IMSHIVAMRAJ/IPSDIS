import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function NominationsManagement() {
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