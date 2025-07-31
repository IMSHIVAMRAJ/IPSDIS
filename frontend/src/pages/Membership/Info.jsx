import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define API URLs
const MEMBERSHIP_API_URL = "http://localhost:5000/api/memberships";
const PAYMENT_API_URL = "http://localhost:5000/api/payment-details";

export default function Info() {
  const [indianRates, setIndianRates] = useState([]);
  const [paymentDetails, setPaymentDetails] = useState(null); // New state for payment info
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch both sets of data concurrently
        const [membershipResponse, paymentResponse] = await Promise.all([
          axios.get(`${MEMBERSHIP_API_URL}/get`),
          // Note: This route must be public for this page to work.
          // If it's protected, it will fail for non-logged-in users.
          axios.get(`${PAYMENT_API_URL}/get`) 
        ]);

        // Process membership data
        const indianData = membershipResponse.data
          .filter(item => item.nationality === 'Indian')
          .map(item => ({
            ...item,
            membershipFeeFormatted: `₹${item.membershipFee.toLocaleString('en-IN')}`,
            gstFormatted: `₹${item.gst.toLocaleString('en-IN')}`,
            totalFormatted: `₹${item.total.toLocaleString('en-IN')}`,
          }));
        setIndianRates(indianData);

        // Process payment data (take the first entry)
        if (paymentResponse.data && paymentResponse.data.length > 0) {
          setPaymentDetails(paymentResponse.data[0]);
        }

      } catch (err) {
        console.error("Error fetching page data:", err);
        setError("Could not load all page data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Membership Information...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-normal mb-6 text-green-800">Membership Information</h1>
      <p className="text-base text-gray-700 mb-8 leading-relaxed">
        Nearly 2700 members of the society are spread in India and approximately 50 other countries. It is the third-largest society of plant pathologists in the world...
      </p>
      
      <h2 className="text-2xl font-semibold text-green-800 mb-4 mt-8">Membership and Subscription Rates</h2>
      <div className="overflow-x-auto rounded-lg shadow mb-8">
        <table className="min-w-full bg-white border border-gray-200">
            {/* ... table content remains the same ... */}
            <thead className="bg-gray-100">
                <tr>
                    <th className="py-3 px-4 text-left font-semibold">Membership Type</th>
                    <th className="py-3 px-4 text-left font-semibold">Membership fee (Rs)</th>
                    <th className="py-3 px-4 text-left font-semibold">GST (18%)</th>
                    <th className="py-3 px-4 text-left font-semibold">Total</th>
                    <th className="py-3 px-4 text-left font-semibold"></th>
                </tr>
                <tr>
                    <td colSpan={5} className="py-2 px-4 font-medium text-green-800 bg-gray-50">Indian Members (Amount in Rs.)</td>
                </tr>
            </thead>
            <tbody>
                {indianRates.map((rate, idx) => (
                <tr key={rate._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                    <td className="py-2 px-4 text-green-800 font-medium">{rate.membershipType}</td>
                    <td className="py-2 px-4 text-gray-700">{rate.membershipFeeFormatted}</td>
                    <td className="py-2 px-4 text-gray-700">{rate.gstFormatted}</td>
                    <td className="py-2 px-4 text-gray-700">{rate.totalFormatted}</td>
                    <td className="py-2 px-4">
                    <Link to="/join" className="text-green-800 underline font-medium hover:text-green-600">Join New Member</Link>
                    </td>
                </tr>
                ))}
            </tbody>
        </table>
      </div>

      {/* ... Benefits and How to Join sections remain the same ... */}
      
      {/* --- Start of New Payment Details Section --- */}
      {paymentDetails && (
        <div className="mt-12">
          <h2 className="text-2xl font-semibold text-green-800 mb-4">Payment Details</h2>
          <p className="text-base text-gray-700 mb-6">The payment can be made by using the following details:</p>
          <div className="bg-white rounded-lg shadow border border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 font-semibold text-gray-700">Name of the Account Holder</div>
                <div className="p-4 text-gray-900">{paymentDetails.accountHolderName}</div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
                <div className="p-4 font-semibold text-gray-700">Name of the Bank and Branch</div>
                <div className="p-4 text-gray-900">{paymentDetails.bankAndBranch}</div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 font-semibold text-gray-700">Account Number</div>
                <div className="p-4 text-gray-900">{paymentDetails.accountNumber}</div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2 bg-gray-50">
                <div className="p-4 font-semibold text-gray-700">RTGS/NEFT/IFS Code</div>
                <div className="p-4 text-gray-900">{paymentDetails.ifscCode}</div>
            </div>
             <div className="grid grid-cols-1 md:grid-cols-2">
                <div className="p-4 font-semibold text-gray-700">MICR Code</div>
                <div className="p-4 text-gray-900">{paymentDetails.micrCode}</div>
            </div>
          </div>
        </div>
      )}
      {/* --- End of New Payment Details Section --- */}

    </div>
  );
}