import React, { useState, useEffect } from "react";
import { FaPlus, FaEdit, FaTrash } from "react-icons/fa";
import axios from "axios";

// Define your backend API URL for payment details
const API_URL = "http://localhost:5000/api/payment-details";

export default function PaymentDetailsManagement() {
  const [paymentDetails, setPaymentDetails] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editingPayment, setEditingPayment] = useState(null);
  const [formData, setFormData] = useState({
    accountHolder: "",
    bankAndBranch: "",
    accountNumber: "",
    rtgsNeftIfsc: "",
    micrCode: ""
  });

  const getToken = () => localStorage.getItem("adminToken");

  // --- API Functions ---

  // 1. READ: Fetch all payment details
  const fetchPaymentDetails = async () => {
    const token = getToken();
    if (!token) {
      alert("Authentication required to view payment details.");
      return;
    }
    const config = { headers: { Authorization: `Bearer ${token}` } };
    
    try {
      // Your route for getting all is "/get"
      const response = await axios.get(`${API_URL}/get`, config);
      setPaymentDetails(response.data);
    } catch (error) {
      console.error("Error fetching payment details:", error);
      alert("Failed to load payment details.");
    }
  };

  useEffect(() => {
    fetchPaymentDetails();
  }, []);

  // 2. CREATE / UPDATE: Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    // Prepare data payload to match the backend model
    const paymentData = {
      accountHolderName: formData.accountHolder,
      bankAndBranch: formData.bankAndBranch,
      accountNumber: formData.accountNumber,
      ifscCode: formData.rtgsNeftIfsc,
      micrCode: formData.micrCode,
    };

    try {
      if (editingPayment) {
        // UPDATE operation
        await axios.put(`${API_URL}/${editingPayment._id}`, paymentData, config);
        alert("Payment details updated successfully!");
      } else {
        // CREATE operation (route is "/create")
        await axios.post(`${API_URL}/create`, paymentData, config);
        alert("Payment details added successfully!");
      }
      resetFormAndRefresh();
    } catch (error) {
      console.error("Error saving payment details:", error);
      alert("Failed to save payment details.");
    }
  };

  // 3. DELETE: Remove payment details
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete these payment details?")) return;

    const token = getToken();
    if (!token) return alert("Authentication required.");

    const config = { headers: { Authorization: `Bearer ${token}` } };

    try {
      await axios.delete(`${API_URL}/${id}`, config);
      alert("Payment details deleted successfully!");
      fetchPaymentDetails();
    } catch (error) {
      console.error("Error deleting payment details:", error);
      alert("Failed to delete payment details.");
    }
  };

  // --- Helper Functions ---

  const handleEdit = (item) => {
    setEditingPayment(item);
    setShowForm(true);
    setFormData({
      // Map backend fields back to frontend form state
      accountHolder: item.accountHolderName || "",
      bankAndBranch: item.bankAndBranch || "",
      accountNumber: item.accountNumber || "",
      rtgsNeftIfsc: item.ifscCode || "",
      micrCode: item.micrCode || ""
    });
  };

  const resetFormAndRefresh = () => {
    setFormData({ accountHolder: "", bankAndBranch: "", accountNumber: "", rtgsNeftIfsc: "", micrCode: "" });
    setEditingPayment(null);
    setShowForm(false);
    fetchPaymentDetails();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Payment Details Management</h2>
        <button
          onClick={() => {
            setEditingPayment(null);
            setFormData({ accountHolder: "", bankAndBranch: "", accountNumber: "", rtgsNeftIfsc: "", micrCode: "" });
            setShowForm(true);
          }}
          className="bg-green-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-green-700"
        >
          <FaPlus /> Add Payment Details
        </button>
      </div>

      {showForm && (
        <div className="bg-gray-50 p-6 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">{editingPayment ? "Edit Payment Details" : "Add New Payment Details"}</h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Account Holder</label>
              <input type="text" value={formData.accountHolder} onChange={(e) => setFormData({ ...formData, accountHolder: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Name of the Bank and Branch</label>
              <input type="text" value={formData.bankAndBranch} onChange={(e) => setFormData({ ...formData, bankAndBranch: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Account Number</label>
                <input type="text" value={formData.accountNumber} onChange={(e) => setFormData({ ...formData, accountNumber: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">RTGS/NEFT/IFSC Code</label>
                <input type="text" value={formData.rtgsNeftIfsc} onChange={(e) => setFormData({ ...formData, rtgsNeftIfsc: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">MICR Code</label>
              <input type="text" value={formData.micrCode} onChange={(e) => setFormData({ ...formData, micrCode: e.target.value })} className="w-full p-2 border border-gray-300 rounded-md" required />
            </div>
            <div className="flex gap-2">
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700">
                {editingPayment ? "Update" : "Save"}
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
              <tr key={item._id}>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.accountHolderName}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.bankAndBranch}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.accountNumber}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.ifscCode}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.micrCode}</td>
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