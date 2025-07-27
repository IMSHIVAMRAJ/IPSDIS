import React from "react";

const conferences = [
  {
    title: "Current Trends in Plant and Microbial Research for Crop and Crop Health Management",
    date: "September 6, 2024",
    venue: "Raiganj University, Raiganj, West Bengal, India",
    url: "https://raiganjuniversity.ac.in/",
  },
  {
    title: "Plant Health for Food Security: Threats and Promises",
    date: "February 1-3, 2024",
    venue: "ICAR-Indian Institute of Sugarcane Research (IISR), Lucknow, Uttar Pradesh",
    url: "https://iimr.icar.gov.in/",
  },
];

export default function NationalSymposia() {
  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <h1 className="text-5xl font-normal text-center text-green-900 mb-10">National Conference</h1>
      <div className="overflow-x-auto max-w-5xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Title</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Venue</th>
              <th className="py-3 px-4 text-left font-semibold">URL</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conf, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{idx + 1}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.title}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.date}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.venue}</td>
                <td className="py-2 px-4 align-top">
                  <a href={conf.url} target="_blank" rel="noopener noreferrer" className="text-green-800 underline hover:text-green-600">Visit<br />Website</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 