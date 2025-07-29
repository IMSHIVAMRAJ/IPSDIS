import React from "react";
import { useParams, Link } from "react-router-dom";
import { FaArrowLeft, FaDownload, FaShoppingCart, FaEye, FaCalendarAlt, FaUser, FaFileAlt } from "react-icons/fa";

const bookData = {
  "recent-approaches-management-plant-diseases": {
    title: "Recent Approaches for Management of Plant Diseases",
    subtitle: "Comprehensive Guide to Modern Plant Pathology",
    author: "Dr. Dinesh Singh & Dr. Kajal K. Biswas",
    editor: "Dr. R. Viswanathan",
    publisher: "Indian Phytopathological Society",
    year: "2024",
    isbn: "978-81-939-1234-5",
    pages: "450",
    language: "English",
    category: "Plant Pathology",
    price: "₹1200",
    image: "/Images/book1.jpg",
    description: `
      <p>This comprehensive book provides an in-depth analysis of modern approaches to plant disease management, covering both traditional and cutting-edge techniques used in contemporary plant pathology.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Comprehensive coverage of disease management strategies</li>
        <li>Integration of traditional and modern approaches</li>
        <li>Case studies from various agricultural systems</li>
        <li>Practical implementation guidelines</li>
        <li>Latest research findings and methodologies</li>
      </ul>
    `,
    tableOfContents: [
      "Chapter 1: Introduction to Plant Disease Management",
      "Chapter 2: Traditional Approaches and Their Evolution",
      "Chapter 3: Modern Diagnostic Techniques",
      "Chapter 4: Biological Control Methods",
      "Chapter 5: Chemical Management Strategies",
      "Chapter 6: Integrated Disease Management",
      "Chapter 7: Emerging Technologies in Plant Pathology",
      "Chapter 8: Case Studies and Practical Applications",
      "Chapter 9: Future Perspectives and Challenges",
      "Chapter 10: Conclusion and Recommendations"
    ],
    targetAudience: [
      "Plant Pathologists",
      "Agricultural Scientists",
      "Research Scholars",
      "Students of Plant Pathology",
      "Extension Workers",
      "Farmers and Agricultural Professionals"
    ],
    specifications: {
      format: "Hardcover",
      dimensions: "8.5 x 11 inches",
      weight: "1.2 kg",
      binding: "Perfect Bound",
      paper: "80 GSM",
      printing: "Full Color"
    },
    availability: "In Stock",
    shipping: "3-5 business days",
    reviews: [
      {
        reviewer: "Dr. A.K. Sharma",
        rating: 5,
        comment: "Excellent compilation of modern plant disease management approaches. Highly recommended for researchers and practitioners."
      },
      {
        reviewer: "Prof. M.K. Patel",
        rating: 4,
        comment: "Comprehensive coverage with practical examples. Very useful for students and professionals alike."
      }
    ]
  },
  "diseases-ornamental-crops-2017": {
    title: "Diseases of Ornamental Crops (2017)",
    subtitle: "Identification, Management and Control",
    author: "Dr. Lakshman Prasad & Dr. Malkhan S. Gurjar",
    editor: "Dr. R. Viswanathan",
    publisher: "Indian Phytopathological Society",
    year: "2017",
    isbn: "978-81-939-1234-6",
    pages: "380",
    language: "English",
    category: "Ornamental Crops",
    price: "₹950",
    image: "/Images/book2.jpg",
    description: `
      <p>A specialized guide focusing on diseases affecting ornamental crops, providing detailed information on identification, diagnosis, and management strategies for various ornamental plant diseases.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Comprehensive disease identification guide</li>
        <li>High-quality color photographs</li>
        <li>Detailed management protocols</li>
        <li>Economic impact analysis</li>
        <li>Prevention and control strategies</li>
      </ul>
    `,
    tableOfContents: [
      "Chapter 1: Introduction to Ornamental Crops",
      "Chapter 2: Fungal Diseases of Ornamentals",
      "Chapter 3: Bacterial Diseases",
      "Chapter 4: Viral Diseases",
      "Chapter 5: Nematode Problems",
      "Chapter 6: Physiological Disorders",
      "Chapter 7: Integrated Disease Management",
      "Chapter 8: Disease Prevention Strategies",
      "Chapter 9: Case Studies",
      "Chapter 10: Future Challenges"
    ],
    targetAudience: [
      "Ornamental Crop Growers",
      "Plant Pathologists",
      "Horticulturists",
      "Nursery Managers",
      "Landscape Professionals",
      "Students of Horticulture"
    ],
    specifications: {
      format: "Hardcover",
      dimensions: "8.5 x 11 inches",
      weight: "1.0 kg",
      binding: "Perfect Bound",
      paper: "80 GSM",
      printing: "Full Color"
    },
    availability: "Limited Stock",
    shipping: "5-7 business days",
    reviews: [
      {
        reviewer: "Dr. S.K. Verma",
        rating: 5,
        comment: "Excellent resource for ornamental crop disease management. The color photographs are very helpful for identification."
      }
    ]
  },
  "padap-rogon-chunautiyan-samadhan-2016": {
    title: "पादप रोगों को चुनौतियाँ एवं समाधान (2016) - हिंदी प्रकाशन",
    subtitle: "Plant Disease Challenges and Solutions",
    author: "Dr. Dinesh Singh & Dr. Kajal K. Biswas",
    editor: "Dr. R. Viswanathan",
    publisher: "Indian Phytopathological Society",
    year: "2016",
    isbn: "978-81-939-1234-7",
    pages: "320",
    language: "Hindi",
    category: "Plant Pathology",
    price: "₹750",
    image: "/Images/book3.jpg",
    description: `
      <p>यह पुस्तक हिंदी भाषा में पादप रोगों की चुनौतियों और उनके समाधान पर विस्तृत जानकारी प्रदान करती है। यह किसानों, छात्रों और शोधकर्ताओं के लिए उपयोगी है।</p>
      
      <h3>मुख्य विशेषताएं:</h3>
      <ul>
        <li>हिंदी में विस्तृत जानकारी</li>
        <li>सरल और समझने योग्य भाषा</li>
        <li>व्यावहारिक उदाहरण</li>
        <li>रोग पहचान के तरीके</li>
        <li>नियंत्रण के उपाय</li>
      </ul>
    `,
    tableOfContents: [
      "अध्याय 1: पादप रोगों का परिचय",
      "अध्याय 2: फफूंदी रोग",
      "अध्याय 3: जीवाणु रोग",
      "अध्याय 4: विषाणु रोग",
      "अध्याय 5: निमेटोड रोग",
      "अध्याय 6: रोग नियंत्रण",
      "अध्याय 7: एकीकृत रोग प्रबंधन",
      "अध्याय 8: रोकथाम के उपाय",
      "अध्याय 9: केस स्टडी",
      "अध्याय 10: भविष्य की चुनौतियां"
    ],
    targetAudience: [
      "किसान",
      "कृषि छात्र",
      "विस्तार कार्यकर्ता",
      "शोधकर्ता",
      "कृषि अधिकारी"
    ],
    specifications: {
      format: "Paperback",
      dimensions: "8.5 x 11 inches",
      weight: "0.8 kg",
      binding: "Perfect Bound",
      paper: "70 GSM",
      printing: "Black & White"
    },
    availability: "In Stock",
    shipping: "3-5 business days",
    reviews: [
      {
        reviewer: "राजेश कुमार",
        rating: 5,
        comment: "बहुत उपयोगी पुस्तक है। हिंदी में होने के कारण समझने में आसान है।"
      }
    ]
  },
  "diseases-field-crops-2016": {
    title: "Diseases of Field Crops (2016)",
    subtitle: "Comprehensive Guide to Field Crop Pathology",
    author: "Dr. R. Viswanathan & Dr. Lakshman Prasad",
    editor: "Dr. Dinesh Singh",
    publisher: "Indian Phytopathological Society",
    year: "2016",
    isbn: "978-81-939-1234-8",
    pages: "520",
    language: "English",
    category: "Field Crops",
    price: "₹1100",
    image: "/Images/book3.jpg",
    description: `
      <p>A comprehensive guide covering diseases of major field crops, including cereals, pulses, oilseeds, and commercial crops. This book provides detailed information on disease identification, epidemiology, and management strategies.</p>
      
      <h3>Key Features:</h3>
      <ul>
        <li>Coverage of major field crops</li>
        <li>Detailed disease descriptions</li>
        <li>Management strategies</li>
        <li>Economic considerations</li>
        <li>Research findings</li>
      </ul>
    `,
    tableOfContents: [
      "Chapter 1: Introduction to Field Crop Diseases",
      "Chapter 2: Cereal Crop Diseases",
      "Chapter 3: Pulse Crop Diseases",
      "Chapter 4: Oilseed Crop Diseases",
      "Chapter 5: Commercial Crop Diseases",
      "Chapter 6: Disease Epidemiology",
      "Chapter 7: Integrated Disease Management",
      "Chapter 8: Economic Impact Assessment",
      "Chapter 9: Future Research Directions",
      "Chapter 10: Conclusion"
    ],
    targetAudience: [
      "Field Crop Specialists",
      "Plant Pathologists",
      "Agricultural Scientists",
      "Farmers",
      "Students",
      "Extension Workers"
    ],
    specifications: {
      format: "Hardcover",
      dimensions: "8.5 x 11 inches",
      weight: "1.3 kg",
      binding: "Perfect Bound",
      paper: "80 GSM",
      printing: "Full Color"
    },
    availability: "In Stock",
    shipping: "3-5 business days",
    reviews: [
      {
        reviewer: "Dr. P.K. Singh",
        rating: 4,
        comment: "Comprehensive coverage of field crop diseases. Very useful for researchers and practitioners."
      }
    ]
  }
};

function BookDetail() {
  const { bookId } = useParams();
  const book = bookData[bookId];

  if (!book) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Book Not Found</h1>
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
        {/* Header */}
        <div className="bg-white rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center justify-between mb-4">
            <Link 
              to="/publications/books" 
              className="text-green-600 hover:text-green-800 flex items-center gap-2"
            >
              <FaArrowLeft /> Back to Books
            </Link>
            <div className="flex gap-2">
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <FaEye />
              </button>
              <button className="p-2 hover:bg-gray-100 rounded transition-colors">
                <FaDownload />
              </button>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-green-900 mb-2">{book.title}</h1>
          {book.subtitle && <p className="text-xl text-gray-600 mb-4">{book.subtitle}</p>}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Book Image and Basic Info */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-lg p-6 sticky top-8">
              <img
                src={book.image}
                alt={book.title}
                className="w-full h-96 object-cover rounded-lg shadow-lg mb-6"
              />
              
              {/* Basic Information */}
              <div className="space-y-4">
                <div>
                  <span className="font-semibold text-gray-700">Author:</span>
                  <span className="ml-2">{book.author}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Editor:</span>
                  <span className="ml-2">{book.editor}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Publisher:</span>
                  <span className="ml-2">{book.publisher}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Year:</span>
                  <span className="ml-2">{book.year}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">ISBN:</span>
                  <span className="ml-2">{book.isbn}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Pages:</span>
                  <span className="ml-2">{book.pages}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Language:</span>
                  <span className="ml-2">{book.language}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Category:</span>
                  <span className="ml-2">{book.category}</span>
                </div>
              </div>

              {/* Price and Availability */}
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <div className="text-2xl font-bold text-green-900 mb-2">{book.price}</div>
                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Availability:</span> {book.availability}
                </div>
                <div className="text-sm text-gray-600 mb-4">
                  <span className="font-semibold">Shipping:</span> {book.shipping}
                </div>
                <button className="w-full bg-green-700 text-white py-3 rounded-lg hover:bg-green-800 transition-colors duration-200 flex items-center justify-center gap-2">
                  <FaShoppingCart /> Order Now
                </button>
              </div>
            </div>
          </div>

          {/* Right Column - Detailed Information */}
          <div className="lg:col-span-2 space-y-8">
            {/* Description */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Description</h2>
              <div 
                className="prose prose-lg max-w-none"
                dangerouslySetInnerHTML={{ __html: book.description }}
              />
            </div>

            {/* Table of Contents */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Table of Contents</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                {book.tableOfContents.map((chapter, index) => (
                  <div key={index} className="flex items-start">
                    <span className="text-green-600 mr-2 font-semibold">{index + 1}.</span>
                    <span className="text-gray-700">{chapter}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Target Audience */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Target Audience</h2>
              <div className="flex flex-wrap gap-2">
                {book.targetAudience.map((audience, index) => (
                  <span 
                    key={index}
                    className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm"
                  >
                    {audience}
                  </span>
                ))}
              </div>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-lg shadow-lg p-6">
              <h2 className="text-2xl font-bold text-green-900 mb-4">Book Specifications</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <span className="font-semibold text-gray-700">Format:</span>
                  <span className="ml-2">{book.specifications.format}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Dimensions:</span>
                  <span className="ml-2">{book.specifications.dimensions}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Weight:</span>
                  <span className="ml-2">{book.specifications.weight}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Binding:</span>
                  <span className="ml-2">{book.specifications.binding}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Paper:</span>
                  <span className="ml-2">{book.specifications.paper}</span>
                </div>
                <div>
                  <span className="font-semibold text-gray-700">Printing:</span>
                  <span className="ml-2">{book.specifications.printing}</span>
                </div>
              </div>
            </div>

            {/* Reviews */}
            {book.reviews.length > 0 && (
              <div className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-2xl font-bold text-green-900 mb-4">Customer Reviews</h2>
                <div className="space-y-4">
                  {book.reviews.map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4 last:border-b-0">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-semibold text-gray-700">{review.reviewer}</span>
                        <div className="flex gap-1">
                          {[...Array(5)].map((_, i) => (
                            <span key={i} className={`text-sm ${i < review.rating ? 'text-yellow-500' : 'text-gray-300'}`}>
                              ★
                            </span>
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-600">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BookDetail; 