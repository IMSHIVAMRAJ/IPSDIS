import React, { useState, useEffect } from "react";
import { FaArrowRight, FaLeaf, FaImages } from "react-icons/fa";
import { Link } from "react-router-dom";
import Carousel from "../components/Carousel";
import axios from "axios";

// Define the API URL for your news endpoint
const API_URL = "http://localhost:5000/api/news";

function Home() {
  // State to store the fetched news items
  const [latestNews, setLatestNews] = useState([]);

  // useEffect hook to fetch news when the component mounts
  useEffect(() => {
    const fetchLatestNews = async () => {
      try {
        const response = await axios.get(API_URL);
        // Sort news by date to get the newest first, then take the top 5
        const sortedNews = response.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setLatestNews(sortedNews.slice(0, 5));
      } catch (error) {
        console.error("Error fetching latest news:", error);
      }
    };

    fetchLatestNews();
  }, []); // The empty dependency array ensures this runs only once

  return (
    <div className="w-full">
      {/* Main Banner Carousel */}
      <div className="w-full mb-2 sm:mb-8">
        {/* Responsive height and hide arrows on mobile */}
        <div className="h-[90px] sm:h-[180px] md:h-[240px] lg:h-[320px] transition-all duration-300">
          <Carousel
            showArrows={false}
            height="100%"
            arrowClassName="!w-6 !h-6 sm:!w-10 sm:!h-10 sm:!block !hidden"
          />
        </div>
      </div>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 py-3 sm:py-10 px-2 sm:px-6">
        {/* Main Content */}
        <div className="flex-1 space-y-8">
          <section>
            <h1 className="text-4xl font-medium text-green-900 mb-4">Welcome to the Indian Phytopathological Society</h1>
            <p className="mb-4 text-gray-700">
              The Indian Phytopathological Society (IPS) is a professional society for promoting the cause of science of Phytopathology. The Society focuses in the field of Mycology, Plant Pathology, Bacteriology, Virology, Phytoplasmology and Nematology.
            </p>
            <p className="text-gray-700">
              It provides a unique platform to the scientists working in the field of plant pathological related research to share their research achievements. It also keeps members informed the various activities related to the development of plant pathology and about the members of the Society.
            </p>
          </section>

          {/* About the Society Highlight */}
          <section>
          <div className="bg-green-50 border-l-8 border-green-700 rounded-lg shadow p-6 flex items-start gap-4">
    <FaLeaf className="text-green-700 text-4xl mt-1 hidden sm:block" />
    <div>
      <h2 className="text-xl font-bold text-green-800 mb-2">
        About the Society
      </h2>
      <p className="text-green-900 mb-1">
        Agriculture, Entrepreneur, Environment & Technology Development Society (AEETDS) is a nationally recognized, autonomous research and educational organization based in Lucknow, Uttar Pradesh, India. It is registered under the Societies Registration Act XXI of 1860 (Reg. No. LUC/00238/2024-25).
      </p>
      <p className="text-green-900">
        AEETDS is committed to transforming Indian agriculture and rural livelihoods through scientific research, entrepreneurial innovation, environmental stewardship, and educational outreach. It provides a dynamic platform for farmers, researchers, educators, and agri-entrepreneurs to collaborate, share knowledge, and develop sustainable, tech-enabled agricultural solutions for the future.
      </p>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded bg-[#0d6e50] text-white font-semibold shadow hover:bg-[#0a573f] transition-colors duration-200"
                  style={{ lineHeight: 1.25 }}
                >
                  Read More <FaArrowRight style={{ fontSize: '1.0em' }} />
                </Link>
              </div>
            </div>
          </section>

          {/* YouTube Video Section */}
          <section className="bg-white rounded-lg shadow p-3 sm:p-6 flex flex-col items-center mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-green-900 mb-3 sm:mb-4 w-full text-center">IPS on YouTube</h2>
            <div className="w-full flex justify-center mb-3 sm:mb-4">
              <div className="w-full aspect-video max-w-full sm:max-w-2xl">
                <iframe
                  src="https://www.youtube.com/embed/SbLva72F-c4?si=lr5YHw5Eg38rK6FR"
                  title="IPS YouTube Video"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="rounded-lg shadow w-full h-full min-h-[160px] sm:min-h-[240px]"
                  style={{ minHeight: 160 }}
                ></iframe>
              </div>
            </div>
            <a href="#" className="px-4 sm:px-6 py-2 rounded bg-[#0d6e50] text-white font-semibold shadow hover:bg-[#0a573f] transition-colors duration-200 text-base flex items-center gap-2">
              VIEW MORE <FaArrowRight style={{ fontSize: '1em' }} />
            </a>
          </section>
        </div>

        {/* Right Sidebar for Latest News and Gallery */}
        <aside className="w-full md:w-80 flex flex-col gap-6">
          {/* Latest News Section */}
          <section className="bg-white rounded-lg shadow p-4 max-h-[340px] min-h-[340px] flex flex-col">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-xl font-bold text-green-900">Latest News</h2>
              <Link to="/news" className="text-green-600 hover:text-green-800 text-sm font-medium">
                View All
              </Link>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-3">
                {latestNews.map((item) => (
                  <li key={item._id} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0">
                    <Link 
                      to={`/news/${item._id}`}
                      className="text-green-900 font-medium hover:underline text-base"
                    >
                      {item.title}
                    </Link>
                    <span className="text-xs text-gray-500 mt-1">{new Date(item.date).toLocaleDateString()}</span>
                  </li>
                ))}
              </ul>
            </div>
          </section>

          {/* Gallery Carousel Section */}
          <section className="bg-white rounded-lg shadow p-0 flex flex-col items-center">
            <div className="flex items-center gap-2 w-full px-4 pt-4 pb-2">
              <FaImages className="text-[#0d6e50] text-xl" />
              <h2 className="text-xl font-bold text-green-900">Gallery</h2>
            </div>
            <div className="w-full px-2" style={{ maxWidth: 420 }}>
              <div style={{ height: 220, width: '100%' }}>
                <Carousel
                  showArrows={false}
                  height={220}
                  arrowClassName="!w-6 !h-6 sm:!w-10 sm:!h-10 sm:!block !hidden"
                />
              </div>
            </div>
            <div className="w-full flex justify-center pb-4">
              <a href="#" className="mt-4 px-6 py-2 rounded bg-[#0d6e50] text-white font-semibold shadow hover:bg-[#0a573f] transition-colors duration-200 text-base flex items-center gap-2">
                VIEW MORE <FaArrowRight style={{ fontSize: '1em' }} />
              </a>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}

export default Home;