import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaShoppingCart, FaCalendarAlt, FaUser, FaFileAlt } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api/books";

function BookDetail() {
  const { bookId } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookDetail = async () => {
      if (!bookId) return;
      try {
        const response = await axios.get(`${API_URL}/${bookId}`);
        setBook(response.data);
      } catch (err) {
        console.error("Error fetching book details:", err);
        setError("Book not found or an error occurred.");
      } finally {
        setLoading(false);
      }
    };
    fetchBookDetail();
  }, [bookId]);

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading Book Details...</div>;
  }

  if (error || !book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">{error || "Book Not Found"}</h1>
          <Link to="/publications/books" className="text-green-600 hover:text-green-800">
            ← Back to Books
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <Link to="/publications/books" className="text-green-600 hover:text-green-800 flex items-center gap-2 mb-4">
            <FaArrowLeft /> Back to Books
          </Link>
          <h1 className="text-4xl font-bold text-green-900 mb-2">{book.name}</h1>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <img
                src={book.image}
                alt={book.name}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
              />
              <div className="space-y-2 text-gray-800">
                {book.editors && book.editors.length > 0 && (
                  <div><FaUser className="inline mr-2 text-green-700" /> <span className="font-semibold">Editors:</span> {book.editors.join(', ')}</div>
                )}
                {book.year && <div><FaCalendarAlt className="inline mr-2 text-green-700" /> <span className="font-semibold">Year:</span> {book.year}</div>}
                {book.pages && <div><FaFileAlt className="inline mr-2 text-green-700" /> <span className="font-semibold">Pages:</span> {book.pages}</div>}
                {book.isbn && <div><span className="font-semibold">ISBN:</span> {book.isbn}</div>}
              </div>
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                {book.price && <div className="text-2xl font-bold text-green-900 mb-2">₹{book.price}</div>}
                <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center justify-center gap-2">
                  <FaShoppingCart /> Order Now
                </button>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 space-y-8">
            {book.about && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-900 mb-4">About This Book</h2>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: book.about }} />
              </div>
            )}
            {book.contents && (
               <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-900 mb-4">Contents</h2>
                <div className="prose prose-lg max-w-none" dangerouslySetInnerHTML={{ __html: book.contents.replace(/\n/g, '<br />') }} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail;