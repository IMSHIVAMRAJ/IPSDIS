import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const MEMBERSHIP_API_URL = "http://localhost:5000/api/memberships";
const REGISTER_API_URL = "http://localhost:5000/api/membership-registrations/register";

export default function Registration() {
  const [memberType, setMemberType] = useState("Indian"); // Corresponds to 'nationality'
  const [regTypeId, setRegTypeId] = useState(""); // Will store the selected membership's _id
  
  const [membershipOptions, setMembershipOptions] = useState([]);
  const [cost, setCost] = useState(null);

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
  const navigate = useNavigate();

  // 1. Fetch all available membership types on component load
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

  // 2. Update the cost whenever the user selects a registration type
  useEffect(() => {
    if (regTypeId) {
      const selectedOption = membershipOptions.find(opt => opt._id === regTypeId);
      setCost(selectedOption);
    } else {
      setCost(null);
    }
  }, [regTypeId, membershipOptions]);
  
  // Reset registration type when nationality changes
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

    if (Object.values(form).some(field => field === "")) {
      return setError("All fields are required.");
    }
    if (!regTypeId || !cost) {
      return setError("Please select a valid membership type.");
    }
    if (form.password !== form.confirmPassword) {
      return setError("Passwords do not match.");
    }

    const registrationData = {
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
      setSubmitted(true);
      setTimeout(() => {
        navigate("/login");
      }, 3000);
    } catch (err) {
      const message = err.response?.data?.message || "Registration failed. Please try again.";
      setError(message);
    }
  };
  
  // Filter available registration types based on selected nationality
  const availableRegTypes = membershipOptions.filter(opt => opt.nationality === memberType);

  return (
    <div className="min-h-screen bg-[#13785f] flex items-center justify-center py-12 px-4">
      <div className="w-full max-w-2xl bg-white rounded shadow-lg">
        <div className="flex flex-row items-center border-b py-4 px-6 gap-4">
          <img src="/Images/logo.png" alt="IPS Logo" className="w-20 h-20 object-contain" />
          <div className="text-left text-green-900 font-semibold leading-tight">
            <div className="text-lg font-bold">INDIAN PHYTOPATHOLOGICAL SOCIETY</div>
            <div className="text-xs font-semibold">DIVISION OF PLANT PATHOLOGY</div>
            <div className="text-xs">Indian Agricultural Research Institute, New Delhi - 110012</div>
          </div>
        </div>
        <div className="py-8 px-6">
          <h2 className="text-2xl font-semibold text-center text-green-900 mb-6">Membership Registration</h2>
          <div className="flex justify-center gap-8 mb-6">
            {["Indian", "SAARC", "Foreign"].map(nat => (
                <label key={nat} className="flex items-center gap-2 font-medium text-green-900">
                    <input type="radio" name="memberType" value={nat} checked={memberType === nat} onChange={() => setMemberType(nat)} className="accent-green-700" />
                    {nat} Member
                </label>
            ))}
          </div>
          <div className="flex items-center gap-6 mb-6">
            <div className="flex-none">
              <label className="block font-medium text-gray-700 mb-1">Registration Fee</label>
              {/* --- Start of Changed Code --- */}
              <select 
                className="border rounded px-3 py-2 w-full max-w-[200px]" 
                value={regTypeId} 
                onChange={e => setRegTypeId(e.target.value)}
              >
                <option value="">Select Type</option>
                {availableRegTypes.map(opt => (
                  <option key={opt._id} value={opt._id}>
                    {opt.membershipType}
                  </option>
                ))}
              </select>
              {/* --- End of Changed Code --- */}
            </div>
            <div className="font-semibold text-green-900 text-lg">
              Cost: <span className="font-bold text-xl">{cost ? `₹${cost.total.toLocaleString('en-IN')}` : 'N/A'}</span>
            </div>
          </div>
          <div className="mb-6">
            <div className="font-semibold text-green-900 mb-2">Registration Details</div>
            {submitted ? (
              <div className="text-green-700 text-lg font-medium text-center py-4">
                Thank you for registering!<br />Redirecting you to the login page...
              </div>
            ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Email Address*" name="email" type="email" value={form.email} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Contact*" name="contact" value={form.contact} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Designation*" name="designation" value={form.designation} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Address*" name="address" value={form.address} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Area of Specialization*" name="specialization" value={form.specialization} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Password*" name="password" type="password" value={form.password} onChange={handleChange} />
              <input className="w-full border-b px-2 py-2 focus:outline-none focus:border-green-700" placeholder="Confirm Password*" name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} />
              {error && <div className="text-red-600 text-sm font-medium">{error}</div>}
              <button type="submit" className="w-full bg-[#0ac15a] hover:bg-[#0a9e4a] text-white py-3 rounded font-semibold mt-2 shadow transition-colors">
                SAVE & CONTINUE
              </button>
            </form>
            )}
          </div>
          <div className="text-center mt-6 text-base font-semibold">
            Already Registered?{" "}
            <Link to="/login" className="text-green-700 underline hover:text-green-900">
              Click here
            </Link>{" "}
            to login.
          </div>
        </div>
      </div>
    </div>
  );
}