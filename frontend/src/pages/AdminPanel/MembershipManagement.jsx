import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function MembershipManagement() {
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