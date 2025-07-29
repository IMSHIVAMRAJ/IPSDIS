import React, { useState } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";

export default function PaymentDetailsManagement() {
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