import React, { useState } from "react";

export default function Registration() {
  const [memberType, setMemberType] = useState("indian");
  const [regType, setRegType] = useState("");
  const [form, setForm] = useState({
    email: "",
    contact: "",
    password: "",
    confirmPassword: "",
    designation: "",
    address: "",
    specialization: "",
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  // Dummy cost logic
  const cost = regType === "" ? "" : regType === "life" ? "₹2000" : "₹1000";

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.email || !form.contact || !form.password || !form.confirmPassword || !form.designation || !form.address || !form.specialization) {
      setError("All fields are required.");
      return;
    }
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    setSubmitted(true);
  }

  return (
    <div className="min-h-screen bg-[#13785f] flex items-center justify-center py-15 px-4">
      <div className="w-full max-w-5xl bg-white rounded shadow-lg"> {/* changed max-w-lg to max-w-2xl */}
        {/* Header */}
        <div className="flex flex-row items-center border-b py-6 px-4 gap-6"> {/* changed flex-col to flex-row and added gap */}
          <img
            src="/Images/logo.png"
            alt="IPS Logo"
            className="w-24 h-24 object-contain mb-2"
            style={{ minWidth: 80 }}
          />
          <div className="text-left text-green-900 font-semibold leading-tight text-base">
            <div className="text-lg font-bold">INDIAN PHYTOPATHOLOGICAL SOCIETY</div>
            <div className="text-xs font-semibold">DIVISION OF PLANT PATHOLOGY</div>
            <div className="text-xs">
              Indian Agricultural Research Institute, New Delhi - 110012<br />
              Telefax: 011-25840023 &nbsp; E-mail : ipsdis@yahoo.com<br />
              Website : www.ipsdis.org
            </div>
          </div>
        </div>
        {/* Registration Form */}
        <div className="py-8 px-6">
          <h2 className="text-2xl font-semibold text-center text-green-900 mb-6">Membership Registration</h2>
          {/* Member Type */}
          <div className="flex justify-center gap-8 mb-6">
            <label className="flex items-center gap-2 font-medium text-green-900">
              <input
                type="radio"
                name="memberType"
                value="indian"
                checked={memberType === "indian"}
                onChange={() => setMemberType("indian")}
                className="accent-green-700"
              />
              Indian Member
            </label>
            <label className="flex items-center gap-2 font-medium text-green-900">
              <input
                type="radio"
                name="memberType"
                value="foreign"
                checked={memberType === "foreign"}
                onChange={() => setMemberType("foreign")}
                className="accent-green-700"
              />
              Foreign Member
            </label>
          </div>
          {/* Registration Fee */}
          <div className="flex items-center gap-6 mb-6">
            <div className="flex-none" style={{ minWidth: 180, maxWidth: 220 }}>
              <label className="block font-medium text-gray-700 mb-1">Registration Fee</label>
              <select
                className="border rounded px-3 py-2 w-full"
                style={{ maxWidth: 180 }}
                value={regType}
                onChange={e => setRegType(e.target.value)}
              >
                <option value="">Select Type</option>
                <option value="life">Life Member</option>
                <option value="annual">Annual Member</option>
              </select>
            </div>
            <div className="font-semibold text-green-900 text-base ml-6">
              Cost: <span className="font-normal">{cost}</span>
            </div>
          </div>
          {/* Registration Details */}
          <div className="mb-6">
            <div className="font-semibold text-green-900 mb-2">Registration Details</div>
            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Email Address"
                name="email"
                type="email"
                value={form.email}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Contact"
                name="contact"
                value={form.contact}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Designation"
                name="designation"
                value={form.designation}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Address"
                name="address"
                value={form.address}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Area of Specialization"
                name="specialization"
                value={form.specialization}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Password"
                name="password"
                type="password"
                value={form.password}
                onChange={handleChange}
                autoComplete="off"
              />
              <input
                className="w-full border-b border-gray-300 px-2 py-2 focus:outline-none focus:border-green-700 placeholder-gray-500"
                placeholder="Confirm Password"
                name="confirmPassword"
                type="password"
                value={form.confirmPassword}
                onChange={handleChange}
                autoComplete="off"
              />
              {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
              {submitted ? (
                <div className="text-green-700 text-lg font-medium text-center py-4">
                  Thank you for registering!<br />Your information has been submitted.
                </div>
              ) : (
                <button
                  type="submit"
                  className="w-full bg-[#0ac15a] hover:bg-[#0a9e4a] text-white py-3 rounded font-semibold text-base mt-2 shadow transition-colors"
                >
                  SAVE & CONTINUE
                </button>
              )}
            </form>
          </div>
          {/* Already Registered */}
          <div className="text-center mt-6 text-base font-semibold">
            Already Registered?{" "}
            <a href="/login" className="text-green-700 underline hover:text-green-900">
              Click here
            </a>{" "}
            to login.
          </div>
        </div>
      </div>
    </div>
  );
}