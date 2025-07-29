import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function AwardsManagement() {
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