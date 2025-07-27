import React from "react";
import { FaArrowRight, FaLeaf, FaImages } from "react-icons/fa";
import Carousel from "../components/Carousel";

const newsItems = [
  { text: "Participation in Viksit Krishi Sankalp Abhiyan-2025 and Reorientation of Institutional Research", date: "2025-05-29" },
  { text: "IPS Annual General Body Meeting (AGBM) on January 20, 2025 at 5.00 PM at Nagpur, Maharashtra", date: "2024-12-17" },
  { text: "Final Voting Announcement: IPS Election Announcement (2025)", date: "2024-12-17" },
  { text: "Online IPS Awards application: Submission date extended till 31st August 2024", date: "2024-07-29" },
];

function Home() {
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
                <h2 className="text-xl font-bold text-green-800 mb-2">About the Society</h2>
                <p className="text-green-900 mb-1">
                  The Indian Phytopathological Society (IPS) is a professional society for promoting the cause of science of Phytopathology. The Society focuses in the field of Mycology, Plant Pathology, Bacteriology, Virology, Phytoplasmology and Nematology.
                </p>
                <p className="text-green-900">
                  It provides a unique platform to the scientists working in the field of plant pathological related research to share their research achievements. It also keeps members informed about the various activities related to the development of plant pathology and about the members of the Society.
                </p>
                <a
                  href="/about"
                  className="inline-flex items-center gap-2 mt-4 px-5 py-2 rounded bg-[#0d6e50] text-white font-semibold shadow hover:bg-[#0a573f] transition-colors duration-200"
                  style={{ lineHeight: 1.25 }}
                >
                  Read More <FaArrowRight style={{ fontSize: '1.0em' }} />
                </a>
              </div>
            </div>
          </section>

          {/* YouTube Video Section */}
          <section className="bg-white rounded-lg shadow p-3 sm:p-6 flex flex-col items-center mt-6">
            <h2 className="text-lg sm:text-xl font-bold text-green-900 mb-3 sm:mb-4 w-full text-center">IPS on YouTube</h2>
            <div className="w-full flex justify-center mb-3 sm:mb-4">
              <div className="w-full aspect-video max-w-full sm:max-w-2xl">
                <iframe
                  src="https://www.youtube.com/embed/1G4isv_Fylg"
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
            <h2 className="text-xl font-bold text-green-900 mb-3">Latest News</h2>
            <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar">
              <ul className="space-y-3">
                {newsItems.map((item, idx) => (
                  <li key={idx} className="flex flex-col border-b border-gray-100 pb-2 last:border-b-0">
                    <a href="#" className="text-green-900 font-medium hover:underline text-base">
                      {item.text}
                    </a>
                    <span className="text-xs text-gray-500 mt-1">{item.date}</span>
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