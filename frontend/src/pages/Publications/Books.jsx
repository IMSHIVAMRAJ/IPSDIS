import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

// Define the API URL for your books endpoint
const API_URL = "http://localhost:5000/api/books";

export default function Books() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get(API_URL);
        setBooks(response.data);
      } catch (err) {
        console.error("Error fetching books:", err);
        setError("Could not load books. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchBooks();
  }, []);

  if (loading) {
    return <div className="text-center py-10">Loading Books...</div>;
  }

  if (error) {
    return <div className="text-center py-10 text-red-500">{error}</div>;
  }

  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-6">
          Books &amp; Bulletins
        </h1>
        <p className="mb-2 text-gray-800">
          The Indian Phytopathological Society is offering the following new books for your ready reference, record, selection and placing your valuable order. We hope that you will find above books useful for your department / library.
        </p>
        <div className="mb-4">
          <span className="text-xl text-red-600 font-semibold">
            Place your order to:
          </span>
        </div>
        <div className="mb-6 text-gray-800">
          The Secretary, Indian Phytopathological Society, Division of Plant Pathology, IARI, New Delhi 110012, INDIA
          <br />
          Tel.: 011-25840023,
          <br />
          Email:{" "}
          <a href="mailto:ipsdis@yahoo.com" className="text-blue-700 underline">ipsdis@yahoo.com</a>
          {" "}; Website:{" "}
          <a href="http://ipsdis.org" className="text-blue-700 underline" target="_blank" rel="noopener noreferrer">http://ipsdis.org</a>
        </div>
        <div className="flex flex-wrap gap-6">
          {books.map((book) => (
            <Link
              key={book._id}
              to={`/publications/book/${book._id}`} // Use the database _id
              className="w-48 bg-white rounded shadow hover:shadow-lg transition flex flex-col items-center transform hover:scale-105 duration-200"
            >
              <img
                src={book.image} // Use the image field from the database
                alt={book.name}   // Use the name field
                className="w-full h-64 object-cover rounded-t"
                loading="lazy"
              />
              <div className="p-2 text-center text-base text-green-900 font-medium">
                {book.name} {/* Use the name field */}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}