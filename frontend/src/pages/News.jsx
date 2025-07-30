import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt, FaLink } from "react-icons/fa";
import axios from "axios";

const API_URL = "http://localhost:5000/api/news";

function News() {
  const { newsId } = useParams();
  
  // State for both list and detail views
  const [allNews, setAllNews] = useState([]);
  const [newsArticle, setNewsArticle] = useState(null);
  
  // State for loading and errors
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        if (newsId) {
          // --- Fetch a single article for the detail view ---
          const response = await axios.get(`${API_URL}/${newsId}`);
          setNewsArticle(response.data);
        } else {
          // --- Fetch all articles for the list view ---
          const response = await axios.get(API_URL);
          // Sort by date, newest first
          const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
          setAllNews(sortedNews);
        }
      } catch (err) {
        setError("Could not load the requested content. Please try again later.");
        console.error("Error fetching news:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, [newsId]); // Re-run the effect if the newsId in the URL changes

  // Display a loading message
  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading...</div>;
  }
  
  // Display an error message
  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-red-500">{error}</div>;
  }

  // --- RENDER DETAILED ARTICLE VIEW ---
  if (newsId) {
    if (!newsArticle) {
        return (
            <div className="min-h-screen bg-gray-100 flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-gray-800 mb-4">News Article Not Found</h1>
                    <Link to="/news" className="text-green-600 hover:text-green-800">← Back to News</Link>
                </div>
            </div>
        );
    }
    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          <div className="bg-green-900 text-white p-6">
            <Link to="/news" className="text-white hover:text-green-200 transition-colors flex items-center gap-2">
              <FaArrowLeft /> Back to All News
            </Link>
            <h1 className="text-3xl font-bold mt-4">{newsArticle.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-green-200">
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {new Date(newsArticle.date).toLocaleDateString()}
              </span>
            </div>
          </div>

          <div className="p-8">
            {/* Display the image if it exists */}
            {newsArticle.image && (
              <img src={newsArticle.image} alt={newsArticle.title} className="w-full h-auto max-h-96 object-cover rounded-lg mb-6" />
            )}
            {/* Display the main content */}
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: newsArticle.bigContent }}
            />
            {/* Display links if they exist */}
            {newsArticle.links && newsArticle.links.length > 0 && (
              <div className="mt-8 border-t pt-4">
                <h3 className="text-xl font-semibold text-gray-800 mb-3 flex items-center gap-2"><FaLink /> Related Links</h3>
                <ul className="space-y-2">
                  {newsArticle.links.map((link, index) => (
                    <li key={index}>
                      <a href={link} target="_blank" rel="noopener noreferrer" className="text-green-600 hover:underline break-all">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  }

  // --- RENDER NEWS LIST VIEW ---
  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Latest News</h1>
          <p className="text-gray-600">
            Stay updated with the latest news, events, and announcements from the Indian Phytopathological Society.
          </p>
        </div>
        <div className="space-y-6">
          {allNews.map((news) => (
            <div key={news._id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaCalendarAlt /> {new Date(news.date).toLocaleDateString()}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{news.title}</h3>
              <p className="text-gray-600 mb-4 line-clamp-3">
                {news.bigContent.replace(/<[^>]*>/g, '')}
              </p>
              <Link to={`/news/${news._id}`} className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-200 inline-block">
                Read More
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default News;