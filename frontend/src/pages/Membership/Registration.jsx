import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

// Toast notification component
const Toast = ({ message, isVisible, onClose }) => {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [isVisible, onClose]);

  if (!isVisible) return null;

  return (
    <div className="fixed top-4 right-4 z-50 bg-green-600 text-white px-6 py-4 rounded-lg shadow-lg flex items-center space-x-3 animate-fade-in">
      <div className="flex-shrink-0">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M5 13l4 4L19 7"
          ></path>
        </svg>
      </div>
      <div className="flex-1">
        <p className="font-medium">{message}</p>
      </div>
      <button onClick={onClose} className="flex-shrink-0 ml-2">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          ></path>
        </svg>
      </button>
    </div>
  );
};

const MEMBERSHIP_API_URL = "http://localhost:5000/api/memberships";
const REGISTER_API_URL =
  "http://localhost:5000/api/membership-registrations/register";

export default function Registration() {
  const [memberType, setMemberType] = useState("Indian");
  const [regTypeId, setRegTypeId] = useState("");
  const [membershipOptions, setMembershipOptions] = useState([]);
  const [cost, setCost] = useState(null);

  const [form, setForm] = useState({
    name: "", // added name field
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
  const [showToast, setShowToast] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMembershipOptions = async () => {
      try {
        const response = await axios.get(`${MEMBERSHIP_API_URL}/get`);
        setMembershipOptions(response.data);
      } catch (err) {
        console.error("Failed to fetch membership options:", err);
        setError("Could not load membership fees. Please refresh.");
      }
    };
    fetchMembershipOptions();
  }, []);

  useEffect(() => {
    if (regTypeId) {
      const selectedOption = membershipOptions.find(
        (opt) => opt._id === regTypeId
      );
      setCost(selectedOption);
    } else {
      setCost(null);
    }
  }, [regTypeId, membershipOptions]);

  useEffect(() => {
    setRegTypeId("");
  }, [memberType]);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (Object.values(form).some((field) => field === "")) {
      return setError("All fields are required.");
    }
    if (!regTypeId || !cost) {
      return setError("Please select a valid membership type.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    const registrationData = {
      name: form.name, // send name to backend
      nationality: memberType,
      membershipType: cost.membershipType,
      membershipFee: cost.total,
      email: form.email,
      contact: form.contact,
      password: form.password,
      designation: form.designation,
      address: form.address,
      areaOfSpecialization: form.specialization,
    };

    try {
      await axios.post(REGISTER_API_URL, registrationData);
      setShowToast(true);
      setTimeout(() => {
        navigate("/");
      }, 3000);
    } catch (err) {
      const message =
        err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    }
  };

  const availableRegTypes = membershipOptions.filter(
    (opt) => opt.nationality === memberType
  );

  return (
    <div className="min-h-screen bg-[#13785f] flex items-center justify-center py-12 px-4">
      <Toast
        message="Registration successful! We will contact you soon!"
        isVisible={showToast}
        onClose={() => setShowToast(false)}
      />
      <div className="w-full max-w-2xl bg-white rounded shadow-lg">
        <div className="flex flex-row items-center border-b py-4 px-6 gap-4">
          <img
            src="/Images/logo.png"
            alt="IPS Logo"
            className="w-20 h-20 object-contain"
          />
          <div className="text-left text-green-900 font-semibold leading-tight">
            <div className="text-lg font-bold">
              INDIAN PHYTOPATHOLOGICAL SOCIETY
            </div>
            <div className="text-xs font-semibold">
              DIVISION OF PLANT PATHOLOGY
            </div>
            <div className="text-xs">
              Indian Agricultural Research Institute, New Delhi - 110012
            </div>
          </div>
        </div>
        <div className="py-8 px-6">
          <h2 className="text-2xl font-semibold text-center text-green-900 mb-6">
            Membership Registration
          </h2>
          <div className="flex justify-center gap-8 mb-6">
            {["Indian", "SAARC", "Foreign"].map((nat) => (
              <label
                key={nat}
                className="flex items-center gap-2 font-medium text-green-900"
              >
                <input
                  type="radio"
                  name="memberType"
                  value={nat}
                  checked={memberType === nat}
                  onChange={() => setMemberType(nat)}
                  className="accent-green-700"
                />
                {nat} Member
              </label>
            ))}
          </div>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex-none">
              <label className="block font-medium text-gray-700 mb-1">
                Registration Fee
              </label>
              <select
                className="border rounded px-3 py-2 w-full max-w-[200px]"
                value={regTypeId}
                onChange={(e) => setRegTypeId(e.target.value)}
              >
                <option value="">Select Type</option>
                {availableRegTypes.map((opt) => (
                  <option key={opt._id} value={opt._id}>
                    {opt.membershipType}
                  </option>
                ))}
              </select>
            </div>
            <div className="font-semibold text-green-900 text-lg">
              Cost:{" "}
              <span className="font-bold text-xl">
                {cost ? `₹${cost.total.toLocaleString("en-IN")}` : "N/A"}
              </span>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-green-900 mb-2">
              Registration Details
            </div>
            {submitted ? (
              <div className="text-green-700 text-lg font-medium text-center py-4">
                Thank you for registering!
                <br />
                Redirecting you to the home page...
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Full Name*"
                  name="name"
                  value={form.name}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Email Address*"
                  name="email"
                  type="email"
                  value={form.email}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Contact*"
                  name="contact"
                  value={form.contact}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Designation*"
                  name="designation"
                  value={form.designation}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Address*"
                  name="address"
                  value={form.address}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Area of Specialization*"
                  name="specialization"
                  value={form.specialization}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Password*"
                  name="password"
                  type="password"
                  value={form.password}
                  onChange={handleChange}
                />
                <input
                  className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700"
                  placeholder="Confirm Password*"
                  name="confirmPassword"
                  type="password"
                  value={form.confirmPassword}
                  onChange={handleChange}
                />
                {error && (
                  <div className="text-red-600 text-sm font-medium">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  className="w-full bg-[#0ac15a] hover:bg-[#0a9e4a] text-white py-3 rounded font-semibold mt-2 shadow transition-colors"
                >
                  SAVE & CONTINUE
                </button>
              </form>
            )}
          </div>
          <div className="text-center mt-6 text-base font-semibold">
            Already Registered?{" "}
            <Link
              to="/login"
              className="text-green-700 underline hover:text-green-900"
            >
              Click here
            </Link>{" "}
            to login.
          </div>
        </div>
      </div>
    </div>
  );
}
