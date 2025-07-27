import React from "react";

function ExecutiveCouncil() {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        About the Executive Council
      </h1>

      {/* Main Description */}
      <div className="text-gray-800 text-base leading-relaxed mb-6">
        <p className="mb-4">
          To run the society smoothly, the society is having Executive Council, which takes policy decisions. It consists of 24 members and meets at least twice a year. Following are the members of executive council.
        </p>
      </div>

      {/* Table of Main Positions */}
      <div className="mb-8">
        <table className="min-w-full border border-gray-300 rounded-lg overflow-hidden">
          <thead className="bg-green-100">
            <tr>
              <th className="px-6 py-3 text-left text-base font-semibold text-green-900 border-b border-gray-300">Position</th>
              <th className="px-6 py-3 text-left text-base font-semibold text-green-900 border-b border-gray-300">Selection Method</th>
            </tr>
          </thead>
          <tbody>
            <tr className="odd:bg-white even:bg-green-50">
              <td className="px-6 py-4 border-b border-gray-200">President</td>
              <td className="px-6 py-4 border-b border-gray-200">President Elect will succeed</td>
            </tr>
            <tr className="odd:bg-white even:bg-green-50">
              <td className="px-6 py-4 border-b border-gray-200">President-elect</td>
              <td className="px-6 py-4 border-b border-gray-200">Elected by General Body</td>
            </tr>
            <tr className="odd:bg-white even:bg-green-50">
              <td className="px-6 py-4 border-b border-gray-200">Secretary</td>
              <td className="px-6 py-4 border-b border-gray-200">Elected by General Body</td>
            </tr>
            <tr className="odd:bg-white even:bg-green-50">
              <td className="px-6 py-4 border-b border-gray-200">Joint Secretary</td>
              <td className="px-6 py-4 border-b border-gray-200">Elected by General Body</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Present Executive Council Section */}
      <div className="text-gray-800 text-base leading-relaxed">
        <h2 className="text-xl font-bold text-green-900 mb-3">Present Executive Council</h2>
        {/* Add council members here if needed */}
      </div>
    </div>
  );
}

export default ExecutiveCouncil; 