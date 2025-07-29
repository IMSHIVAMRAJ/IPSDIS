import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaCalendarAlt } from "react-icons/fa";

const newsData = [
  {
    id: "participation-viksit-krishi-sankalp-abhiyan-2025",
    title: "Participation in Viksit Krishi Sankalp Abhiyan-2025 and Reorientation of Institutional Research",
    date: "2025-05-29",
    content: `
      <p>The Indian Phytopathological Society is pleased to announce its participation in the Viksit Krishi Sankalp Abhiyan-2025, a nationwide initiative aimed at transforming agricultural practices and promoting sustainable farming methods.</p>
      
      <p>This initiative will include workshops on modern plant pathology techniques, demonstration of disease-resistant crop varieties, training sessions for farmers on disease identification, and research presentations by leading scientists.</p>
      
      <p>The reorientation of institutional research will focus on enhanced collaboration between research institutions, development of new diagnostic tools, implementation of integrated pest management strategies, and capacity building for young researchers.</p>
      
      <p>For more information about participation, please contact the IPS Secretariat.</p>
    `
  },
  {
    id: "ips-annual-general-body-meeting-2025",
    title: "IPS Annual General Body Meeting (AGBM) on January 20, 2025 at 5.00 PM at Nagpur, Maharashtra",
    date: "2024-12-17",
    content: `
      <p>The Indian Phytopathological Society is pleased to announce the Annual General Body Meeting (AGBM) for the year 2025.</p>
      
      <p><strong>Meeting Details:</strong></p>
      <ul>
        <li>Date: January 20, 2025</li>
        <li>Time: 5:00 PM IST</li>
        <li>Venue: Nagpur, Maharashtra</li>
        <li>Type: Annual General Body Meeting</li>
      </ul>
      
      <p><strong>Agenda:</strong></p>
      <ol>
        <li>Welcome address by the President</li>
        <li>Approval of minutes of the previous AGM</li>
        <li>Secretary's report on society activities</li>
        <li>Treasurer's report and financial statement</li>
        <li>Election of new office bearers</li>
        <li>Discussion on upcoming conferences and events</li>
        <li>Any other business with permission of the chair</li>
      </ol>
      
      <p>For registration and further details, please contact the IPS Secretariat.</p>
    `
  },
  {
    id: "final-voting-announcement-ips-election-2025",
    title: "Final Voting Announcement: IPS Election Announcement (2025)",
    date: "2024-12-17",
    content: `
      <p>The Election Commission of the Indian Phytopathological Society announces the final voting schedule for the 2025 elections.</p>
      
      <p><strong>Election Schedule:</strong></p>
      <ul>
        <li>Nomination Period: December 1-15, 2024</li>
        <li>Scrutiny of Nominations: December 16, 2024</li>
        <li>Withdrawal of Candidature: December 17, 2024</li>
        <li>Final List of Candidates: December 18, 2024</li>
        <li>Voting Period: January 1-15, 2025</li>
        <li>Result Declaration: January 20, 2025</li>
      </ul>
      
      <p><strong>Positions Open for Election:</strong></p>
      <ul>
        <li>President-Elect (1 position)</li>
        <li>Vice President (2 positions)</li>
        <li>Executive Council Members (5 positions)</li>
        <li>Regional Representatives (8 positions)</li>
      </ul>
      
      <p>For any queries regarding the election process, please contact the Election Commission.</p>
    `
  },
  {
    id: "online-ips-awards-application-extension",
    title: "Online IPS Awards application: Submission date extended till 31st August 2024",
    date: "2024-07-29",
    content: `
      <p>The Indian Phytopathological Society is pleased to announce the extension of the submission deadline for the 2024 IPS Awards.</p>
      
      <p><strong>Extended Deadline:</strong></p>
      <ul>
        <li>New Submission Deadline: August 31, 2024</li>
        <li>Previous Deadline: July 31, 2024</li>
        <li>Extension Period: 1 month</li>
      </ul>
      
      <p><strong>Available Awards:</strong></p>
      <ul>
        <li>Young Scientist Award: For researchers under 35 years</li>
        <li>Best Paper Award: For outstanding research publications</li>
        <li>Lifetime Achievement Award: For senior scientists</li>
        <li>Innovation Award: For novel research methodologies</li>
        <li>Student Research Award: For outstanding student research</li>
      </ul>
      
      <p>For technical support or queries, please contact the Awards Committee at awards@ipsdis.org</p>
    `
  },
  {
    id: "international-conference-plant-pathology-2025",
    title: "International Conference on Plant Pathology 2025: Call for Papers",
    date: "2024-11-15",
    content: `
      <p>The Indian Phytopathological Society is organizing the International Conference on Plant Pathology 2025 in collaboration with leading institutions worldwide.</p>
      
      <p><strong>Conference Details:</strong></p>
      <ul>
        <li>Theme: "Advancing Plant Pathology for Food Security"</li>
        <li>Date: March 15-18, 2025</li>
        <li>Venue: New Delhi, India</li>
        <li>Type: International Conference</li>
      </ul>
      
      <p><strong>Call for Papers:</strong></p>
      <p>We invite researchers, scientists, and students to submit abstracts for oral and poster presentations in the following areas:</p>
      <ul>
        <li>Molecular Plant Pathology</li>
        <li>Disease Resistance Breeding</li>
        <li>Biological Control Methods</li>
        <li>Epidemiology and Disease Modeling</li>
        <li>Plant-Microbe Interactions</li>
        <li>Emerging Plant Diseases</li>
        <li>Climate Change and Plant Diseases</li>
        <li>Digital Agriculture and Plant Pathology</li>
      </ul>
      
      <p>For more information and submission guidelines, visit our conference website.</p>
    `
  }
];

function News() {
  const { newsId } = useParams();

  // If a specific news ID is provided, show that news article
  if (newsId) {
    const newsArticle = newsData.find(news => news.id === newsId);
    
    if (!newsArticle) {
      return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">News Article Not Found</h1>
            <Link to="/news" className="text-green-600 hover:text-green-800">
              ← Back to News
            </Link>
          </div>
        </div>
      );
    }

    return (
      <div className="min-h-screen bg-gray-100 py-8">
        <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-green-900 text-white p-6">
            <div className="flex items-center justify-between">
              <Link 
                to="/news" 
                className="text-white hover:text-green-200 transition-colors flex items-center gap-2"
              >
                <FaArrowLeft /> Back to News
              </Link>
            </div>
            <h1 className="text-3xl font-bold mt-4">{newsArticle.title}</h1>
            <div className="flex items-center gap-4 mt-2 text-green-200">
              <span className="flex items-center gap-1">
                <FaCalendarAlt /> {newsArticle.date}
              </span>
            </div>
          </div>

          <div className="p-8">
            <div 
              className="prose prose-lg max-w-none"
              dangerouslySetInnerHTML={{ __html: newsArticle.content }}
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <h1 className="text-4xl font-bold text-green-900 mb-4">Latest News</h1>
          <p className="text-gray-600">
            Stay updated with the latest news, events, and announcements from the Indian Phytopathological Society. 
            Our news section provides information about upcoming events, meetings, awards, conferences, and other important updates related to plant pathology and agricultural sciences.
          </p>
        </div>

        {/* News List */}
        <div className="space-y-6">
          {newsData.map((news) => (
            <div key={news.id} className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow duration-300">
              <div className="flex items-center gap-2 mb-3">
                <span className="text-gray-500 text-sm flex items-center gap-1">
                  <FaCalendarAlt /> {news.date}
                </span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">
                {news.title}
              </h3>
              <p className="text-gray-600 mb-4">
                {news.content.replace(/<[^>]*>/g, '').substring(0, 200)}...
              </p>
              <Link
                to={`/news/${news.id}`}
                className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition-colors duration-200 inline-block"
              >
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