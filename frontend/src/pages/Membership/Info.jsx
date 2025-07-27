import React from "react";
import { Link } from "react-router-dom";

const subscriptionRates = [
  { type: "Life Membership", fee: "₹12,000.00", gst: "₹2,160.00", total: "₹14,160.00" },
  { type: "Student Annual Membership", fee: "₹1,000.00", gst: "₹180.00", total: "₹1,180.00" },
  { type: "General Annual Membership", fee: "₹1,500.00", gst: "₹270.00", total: "₹1,770.00" },
  { type: "Admission fee (for new members)", fee: "₹100.00", gst: "₹18.00", total: "₹118.00" },
];

export default function Info() {
  return (
    <div className="max-w-6xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-normal mb-6 text-green-800">Membership Information</h1>
      <p className="text-base text-gray-700 mb-8 leading-relaxed">
        Nearly 2700 members of the society are spread in India and approximately 50 other countries. It is the third-largest society of plant pathologists in the world. They comprise scientists, teachers, technicians, students, extension workers, company professionals, private consultants, administrators, agricultural field representatives and pest management personnel. Their professions vary, but they have a single common goal – to promote knowledge on plant diseases. Any person interested in the science of Plant Pathology shall be eligible for membership. The Society shall have annual members, students members, patrons, fellows and honorary fellows.
      </p>
      <h2 className="text-2xl font-semibold text-green-800 mb-4 mt-8">Membership and Subscription Rates</h2>
      <div className="overflow-x-auto rounded-lg shadow mb-8">
        <table className="min-w-full bg-white border border-gray-200">
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
            {subscriptionRates.map((rate, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 text-green-800 font-medium">{rate.type}</td>
                <td className="py-2 px-4 text-gray-700">{rate.fee}</td>
                <td className="py-2 px-4 text-gray-700">{rate.gst}</td>
                <td className="py-2 px-4 text-gray-700">{rate.total}</td>
                <td className="py-2 px-4">
                  <Link to="/join" className="text-green-800 underline font-medium hover:text-green-600">Join New Member</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <h2 className="text-xl font-semibold text-green-800 mb-2">Benefits of Membership</h2>
      <ul className="list-disc list-inside mb-8 text-gray-700">
        <li>Access to society journals and publications</li>
        <li>Discounted registration for conferences and events</li>
        <li>Networking opportunities with professionals and researchers</li>
        <li>Eligibility for awards and recognitions</li>
      </ul>
      <h2 className="text-xl font-semibold text-green-800 mb-2">How to Join</h2>
      <ol className="list-decimal list-inside mb-8 text-gray-700">
        <li>Review the membership types and select the one that suits you.</li>
        <li>Fill out the online application form.</li>
        <li>Submit the required documents and pay the membership fee.</li>
      </ol>
      <div className="mt-8">
        <Link to="/join" className="inline-block bg-green-800 text-white px-8 py-3 rounded-md font-semibold text-lg shadow hover:bg-green-700 transition-colors">
          Join New Member
        </Link>
      </div>
    </div>
  );
} 