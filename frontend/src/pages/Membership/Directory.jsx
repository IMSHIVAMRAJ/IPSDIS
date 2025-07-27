import React, { useState } from "react";

const sampleMembers = [
  {
    id: 1,
    name: "Samad Abdul",
    email: "samad_cimap@yahoo.co.in",
    phone: "9415911805",
    designation: "Chief Scientist & Head (Retd.)",
    address: `Plant Pathology\nDepartment CSIR-\nCentral Institute for Medicinal and Aromatic Plants\n226015 Lucknow\nUttar Pradesh`,
    specialization: "Plant Pathology",
  },
  {
    id: 97,
    name: "D.K. Banyal",
    email: "dkbanyal@gmail.com",
    phone: "9418111480",
    designation: "Head",
    address: `Department of Plant Pathology CSK\nHimachal Pradesh Agricultural University 176062\nPalampur Himachal Pradesh`,
    specialization: "Vegetable Fungal Pathology, Disease Epidemiology, Disease Management, Fungicides and Protected Cultivation, Disease Epidemiology",
  },
  {
    id: 98,
    name: "D. Bap Reddy",
    email: "",
    phone: "",
    designation: "",
    address: `33/U.R.T. Barkatpura\n500013 Hyderabad\nTelangana`,
    specialization: "",
  },
];

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function Directory() {
  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  // Filter and paginate
  const filtered = sampleMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(search.toLowerCase()) ||
      m.email.toLowerCase().includes(search.toLowerCase()) ||
      m.phone.includes(search) ||
      m.designation.toLowerCase().includes(search.toLowerCase()) ||
      m.address.toLowerCase().includes(search.toLowerCase()) ||
      m.specialization.toLowerCase().includes(search.toLowerCase())
  );
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  return (
    <div className="min-h-screen bg-gray-100 py-10 px-2">
      <h1 className="text-5xl font-normal text-center text-green-900 mb-10">IPS Members Contact Information</h1>
      <div className="flex flex-col md:flex-row md:items-center md:justify-between max-w-6xl mx-auto mb-4 gap-4">
        <select
          className="border rounded px-3 py-2 w-32"
          value={pageSize}
          onChange={e => { setPageSize(Number(e.target.value)); setPage(1); }}
        >
          {PAGE_SIZE_OPTIONS.map(opt => (
            <option key={opt} value={opt}>{opt}</option>
          ))}
        </select>
        <input
          className="border rounded px-3 py-2 w-full md:w-80"
          placeholder="Search.."
          value={search}
          onChange={e => { setSearch(e.target.value); setPage(1); }}
        />
      </div>
      <div className="overflow-x-auto max-w-6xl mx-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">SN</th>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Email</th>
              <th className="py-3 px-4 text-left font-semibold">Phone</th>
              <th className="py-3 px-4 text-left font-semibold">Designation</th>
              <th className="py-3 px-4 text-left font-semibold">Address</th>
              <th className="py-3 px-4 text-left font-semibold">Area of Specialization</th>
            </tr>
          </thead>
          <tbody>
            {paginated.length === 0 ? (
              <tr>
                <td colSpan={8} className="text-center py-8 text-gray-500">No members found.</td>
              </tr>
            ) : (
              paginated.map((m, idx) => (
                <tr key={m.id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="py-2 px-4">{m.id}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.name}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.email}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.phone}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.designation}</td>
                  <td className="py-2 px-4 whitespace-pre-line">{m.address}</td>
                  <td className="py-2 px-4 whitespace-pre-line">{m.specialization}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      {/* Pagination */}
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-gray-700">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`px-3 py-1 rounded ${num === page ? "bg-green-800 text-white" : "hover:bg-green-100"}`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <span className="ml-4 text-gray-500 text-sm">
          Showing {(page - 1) * pageSize + 1} to {Math.min(page * pageSize, total)} of {total} entries
        </span>
      </div>
    </div>
  );
} 