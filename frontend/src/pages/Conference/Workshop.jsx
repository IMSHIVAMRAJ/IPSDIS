import React from "react";

const workshops = [
  {
    year: 2011,
    topic: "Plant Pathology: Vision 2030",
    venue: "University of Hyderabad, Hyderabad, Telangana",
    date: "2nd December 2011",
  },
  {
    year: 2014,
    topic: "Present status and future strategies on Rhizoctonia research in India",
    venue: "Division of Plant Pathology, IARI, New Delhi",
    date: "6th March 2014",
  },
];

export default function Workshop() {
  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <h1 className="text-5xl font-normal text-center text-green-900 mb-2">Workshop/Brain Storming</h1>
      <p className="text-center text-lg text-gray-700 mb-10">Brain storming sessions organized by the Society</p>
      <div className="overflow-x-auto max-w-5xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-left font-semibold">Topic</th>
              <th className="py-3 px-4 text-left font-semibold">Venue</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
            </tr>
          </thead>
          <tbody>
            {workshops.map((ws, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{idx + 1}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.year}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.topic}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.venue}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{ws.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 