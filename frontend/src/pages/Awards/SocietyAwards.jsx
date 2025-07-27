import React from "react";
import { Link } from "react-router-dom";

const awards = [
  {
    name: "Mundkur Memorial Award",
    year: 1962,
    guidelines: "#",
    awardees: "#",
    registration: "#",
  },
  {
    name: "Jeersannidhi Award",
    year: 1981,
    guidelines: "#",
    awardees: "#",
    registration: "#",
  },
  {
    name: "S.N. Dasgupta Memorial Award",
    year: 1994,
    guidelines: "#",
    awardees: "#",
    registration: "#",
  },
];

export default function SocietyAwards() {
  return (
    <div className="min-h-screen bg-white py-10 px-2">
      <div className="bg-white p-8 max-w-6xl mx-auto">
        <h1 className="text-5xl font-normal text-green-900 mb-6">Awards</h1>
        <p className="text-gray-800 text-base leading-relaxed mb-6">
          Indian Phytopathological Society instituted several awards time to time, which were instituted in the memory of renound Plant Pathologists of our country and also to recognize their significant contributions.<br /><br />
          Society is grateful to the donors, who contributed liberally to strengthen the activities of the society. These award lectures are presented at the annual meetings of the society.
        </p>
        <h2 className="text-3xl font-semibold text-green-900 mb-6">Awards of the Society</h2>
      </div>
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Name of the Award</th>
              <th className="py-3 px-4 text-left font-semibold">Year of Institution</th>
              <th className="py-3 px-4 text-center font-semibold">Guidelines</th>
              <th className="py-3 px-4 text-center font-semibold">Awardees</th>
              <th className="py-3 px-4 text-center font-semibold">Online Registration</th>
            </tr>
          </thead>
          <tbody>
            {awards.map((award, idx) => (
              <tr key={idx} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{idx + 1}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{award.name}</td>
                <td className="py-2 px-4 align-top whitespace-pre-line">{award.year}</td>
                <td className="py-2 px-4 align-top text-center">
                  <Link to={`/awards/guidelines/${encodeURIComponent(award.name)}`} className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">View</Link>
                </td>
                <td className="py-2 px-4 align-top text-center">
                  <Link to={`/awards/awardees/${encodeURIComponent(award.name)}`} className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">View</Link>
                </td>
                <td className="py-2 px-4 align-top text-center">
                  <a href={award.registration} className="bg-green-800 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold">View</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 