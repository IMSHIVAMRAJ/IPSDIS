import React from "react";
import { FaFacebook, FaYoutube, FaLinkedin, FaTwitter, FaEnvelope, FaArrowUp, FaLocationArrow, FaAngleRight } from "react-icons/fa";

function Footer() {
  return (
    <footer className="pt-12 pb-4 px-2 sm:px-4" style={{ backgroundColor: '#0d6e50', color: 'white' }}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Contact Us */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <div className="text-lg mb-2">Dr. Kajal Kumar Biswas</div>
          <div className="mb-2">Secretary</div>
          <div className="flex items-start gap-2 mb-2">
            <FaLocationArrow className="mt-1" />
            <div>
              Indian Phytopathological Society<br />
              New Delhi, INDIA
            </div>
          </div>
          <div className="flex items-center gap-2">
            <FaEnvelope />
            <span>ipsdis@yahoo.com</span>
          </div>
        </div>
        {/* Useful Links */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Useful Links</h2>
          <ul className="space-y-2 text-lg">
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">About</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Membership</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Executive Council</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Awards</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Contact Us</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Feedback</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Terms & Conditions</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Privacy Policy</a></li>
            <li className="flex items-center gap-2"><FaAngleRight /><a href="#" className="hover:underline">Refund Policy</a></li>
          </ul>
        </div>
        {/* Subscribe Us */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Subscribe Us</h2>
          <form className="mb-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full rounded px-4 py-2 text-black mb-3 focus:outline-none placeholder-gray-500 bg-transparent border bg-white border-white"
              style={{ '::placeholder': { color: 'white' } }}
            />
            <button
              type="submit"
              className="bg-white text-green-800 font-semibold px-6 py-2 rounded shadow hover:bg-green-100 transition"
            >
              AGREE & SUBSCRIBE
            </button>
          </form>
          <div className="text-lg">
            By subscribing to our newsletter, you thereby agree to our Terms & Conditions and Privacy Policy.
          </div>
        </div>
        {/* Social */}
        <div>
          <h2 className="text-3xl font-bold mb-4">Social</h2>
          <div className="flex gap-4 text-4xl mb-8">
            <a href="#" aria-label="Facebook"><FaFacebook /></a>
            <a href="#" aria-label="YouTube"><FaYoutube /></a>
            <a href="#" aria-label="LinkedIn"><FaLinkedin /></a>
            <a href="#" aria-label="Twitter"><FaTwitter /></a>
          </div>
        </div>
      </div>
      {/* Copyright and up arrow */}
      <div className="w-screen relative left-1/2 right-1/2 -ml-[50vw] -mr-[50vw] flex justify-center items-center mt-8 p-4 border-t border-green-900 text-center text-white text-lg sm:text-lg text-xs sm:p-4 p-2" style={{ backgroundColor: '#0a573f' }}>
        <span className="mx-auto">© {new Date().getFullYear()} The Indian Phytopathological Society. All rights Reserved. Developed by DiGrows.</span>
      </div>
    </footer>
  );
}

export default Footer; 