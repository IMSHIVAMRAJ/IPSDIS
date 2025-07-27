import React from "react";

const conferences = [
  {
    year: 2023,
    title: "International Congress on Plant Pathology",
    venue: "Kyoto International Conference Center, Kyoto, Japan",
    date: "August 20-25, 2023",
    url: "https://www.icpp2023.org/",
  },
  {
    year: 2022,
    title: "Global Plant Health Summit",
    venue: "FAO Headquarters, Rome, Italy",
    date: "May 12-14, 2022",
    url: "https://www.fao.org/plant-health-2022/",
  },
];

export default function InternationalConferences() {
  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <h1 className="text-5xl font-normal text-center text-green-900 mb-2">International Conferences</h1>
      <p className="text-center text-lg text-gray-700 mb-10">Major international conferences attended or organized by the Society</p>
      <div className="overflow-x-auto max-w-5xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-left font-semibold">Title</th>
              <th className="py-3 px-4 text-left font-semibold">Venue</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">URL</th>
            </tr>
          </thead>
          <tbody>
            {conferences.map((conf, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{idx + 1}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.year}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.title}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.venue}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{conf.date}</td>
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