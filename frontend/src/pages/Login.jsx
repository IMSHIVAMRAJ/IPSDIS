import React, { useState } from "react";
import { Link } from "react-router-dom";

function Login() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    alert(`Login attempted for: ${email}`);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#11735c]">
      <div className="bg-white rounded shadow-md w-full max-w-4xl">
        {/* Header */}
        <div className="flex flex-row items-center py-6 border-b px-6">
          <img
            src="/public/Images/logo.png"
            alt="IPS Logo"
            className="h-20 w-20 object-contain mr-6"
          />
          <div className="text-left">
            <div className="text-lg font-semibold text-green-900">
              INDIAN PHYTOPATHOLOGICAL SOCIETY
            </div>
            <div className="text-sm font-medium text-green-800">
              DIVISION OF PLANT PATHOLOGY
            </div>
            <div className="text-xs text-gray-700 mt-1">
              Indian Agricultural Research Institute, New Delhi – 110012 <br />
              Telefax: 011-25840023 &nbsp; E-mail: ipsdis@yahoo.com <br />
              Website : www.ipsdis.org
            </div>
          </div>
        </div>
        {/* Login Form */}
        <form className="p-8 flex flex-col items-center" onSubmit={handleSubmit}>
          <h2 className="text-2xl font-semibold text-[#11735c] mb-6">Member Login</h2>
          <div className="w-full mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              className="w-full border-b-2 border-gray-200 focus:border-green-600 outline-none py-2 px-1 text-lg"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              autoFocus
            />
          </div>
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-8 rounded transition-colors"
          >
            PROCEED
          </button>
          <div className="mt-8 text-gray-700 text-base">
            If you haven't registered, you can{" "}
            <Link to="/register" className="text-green-500 hover:underline">
              Click here
            </Link>{" "}
            to register
          </div>
        </form>
      </div>
    </div>
  );
}

export default Login;
