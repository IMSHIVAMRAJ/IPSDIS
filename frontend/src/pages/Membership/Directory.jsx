import React, { useState, useEffect } from "react";
import axios from "axios";

// Define the API URL for your membership registrations endpoint
const API_URL = "http://localhost:5000/api/membership-registrations";

const PAGE_SIZE_OPTIONS = [10, 25, 50, 100];

export default function Directory() {
  const [allMembers, setAllMembers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [search, setSearch] = useState("");
  const [pageSize, setPageSize] = useState(100);
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        const response = await axios.get(API_URL);
        // Filter to show only members with "accepted" status
        const acceptedMembers = response.data.filter(
          (member) => member.status === "accepted"
        );
        setAllMembers(acceptedMembers);
      } catch (err) {
        console.error("Error fetching members:", err);
        setError("Could not load member directory.");
      } finally {
        setLoading(false);
      }
    };
    fetchMembers();
  }, []);

  // Filter and paginate the fetched data on the client-side
  const filtered = allMembers.filter(
    (m) =>
      (m.name?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (m.email?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (m.contact?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (m.designation?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (m.address?.toLowerCase() || '').includes(search.toLowerCase()) ||
      (m.areaOfSpecialization?.toLowerCase() || '').includes(search.toLowerCase())
  );
  
  const total = filtered.length;
  const totalPages = Math.ceil(total / pageSize);
  const paginated = filtered.slice((page - 1) * pageSize, page * pageSize);

  if (loading) {
    return <div className="text-center py-10">Loading Member Directory...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

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
          placeholder="Search members..."
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
                <tr key={m._id} className={idx % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                  <td className="py-2 px-4">{(page - 1) * pageSize + idx + 1}</td>
                  <td className="py-2 px-4 text-xs text-gray-500">{m._id}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.name || 'N/A'}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.email}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.contact}</td>
                  <td className="py-2 px-4 whitespace-nowrap">{m.designation}</td>
                  <td className="py-2 px-4 whitespace-pre-line">{m.address}</td>
                  <td className="py-2 px-4 whitespace-pre-line">{m.areaOfSpecialization}</td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="flex flex-wrap justify-center items-center gap-2 mt-6 text-gray-700">
        {totalPages > 1 && Array.from({ length: totalPages }, (_, i) => i + 1).map(num => (
          <button
            key={num}
            className={`px-3 py-1 rounded ${num === page ? "bg-green-800 text-white" : "hover:bg-green-100"}`}
            onClick={() => setPage(num)}
          >
            {num}
          </button>
        ))}
        <span className="ml-4 text-gray-500 text-sm">
          Showing {Math.min((page - 1) * pageSize + 1, total)} to {Math.min(page * pageSize, total)} of {total} entries
        </span>
      </div>
    </div>
  );
}