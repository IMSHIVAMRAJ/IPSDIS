import React from "react";
import { useParams, Link } from "react-router-dom";

const executiveProfiles = {
  "dinesh-singh": {
    name: "Dinesh Singh",
    position: "President (2025)",
    designation: "Head & Principal Scientist",
    address: "Division of Crop Protection, ICAR-Indian Institute of Sugarcane Research, Lucknow - 226002, Uttar Pradesh",
    email: "dinesh_iari@rediffmail.com",
    mobile: "9968246428",
    image: "https://www.ipsdis.org/image/cache/catalog/EC2024/2017-19%20Dinesh%20Singh-153x198.jpg",
    biodata: {
      birth: "February 23, 1968, in Mirzapur, Uttar Pradesh",
      education: {
        bsc: "B. Sc. Ag. from Kanpur University (1988)",
        msc: "M.Sc. Ag and Ph. D. in Mycology & Plant Pathology from Institute of Agricultural Sciences, BHU, Varanasi (1990 and 1995)"
      },
      positions: [
        "Joined ARS services in 1997",
        "Worked as a scientist at IIVR, Varanasi",
        "CIPHET, Abohar",
        "Sr. Scientist and principal scientist at ICAR-IARI, New Delhi",
        "Currently Head, Division of Crop Protection, ICAR-IISR, Lucknow, since July 13, 2023"
      ],
      awards: [
        "Dr. M. M. Alam Medal",
        "Young Scientist Associate Award",
        "Late Shri P. P. Shinghal Memorial Award",
        "J. P. Varma Memorial lecture Award",
        "Reviewer Excellence",
        "Award for Excellent in Research",
        "Distinguished Scientist in Plant Pathology Award",
        "Best Faculty Award",
        "NESA Green Technology Innovative Award",
        "B. P. Pal Memorial Best Scientist Award and Prof. M S Pavgi Award"
      ],
      fellowships: [
        "NESA Fellowship",
        "NABS Fellow",
        "IPS Fellow",
        "SPPS Fellow",
        "Bioved Fellowship Award",
        "Honorary Fellowship",
        "ISHRD Fellowship",
        "Fellow of Asian PGPR Society"
      ],
      researchAreas: [
        "Biological control",
        "Diagnostic",
        "Diversity analysis of bacterial and fungal pathogens",
        "Postharvest diseases",
        "Sugarcane diseases"
      ]
    }
  },
  "r-viswanathan": {
    name: "R. Viswanathan",
    position: "President-Elect (2025)",
    designation: "Chief Editor",
    address: "ICAR-Sugarcane Breeding Institute, Coimbatore, Tamil Nadu",
    email: "viswanathan.r@icar.gov.in",
    mobile: "9442345678",
    image: "https://www.ipsdis.org/image/cache/catalog/Chief%20Editor/RViswanathan-153x198.jpg",
    biodata: {
      birth: "1965, in Tamil Nadu",
      education: {
        bsc: "B.Sc. Agriculture from Tamil Nadu Agricultural University (1985)",
        msc: "M.Sc. Plant Pathology from Tamil Nadu Agricultural University (1987)",
        phd: "Ph.D. in Plant Pathology from Tamil Nadu Agricultural University (1992)"
      },
      positions: [
        "Joined ICAR in 1993",
        "Scientist at Sugarcane Breeding Institute, Coimbatore",
        "Senior Scientist at SBI, Coimbatore",
        "Principal Scientist at SBI, Coimbatore",
        "Currently Chief Editor, Indian Phytopathological Society"
      ],
      awards: [
        "ICAR Young Scientist Award",
        "Best Paper Award",
        "Outstanding Scientist Award",
        "Fellow of Indian Phytopathological Society"
      ],
      fellowships: [
        "Fellow of Indian Phytopathological Society",
        "Member of International Society of Plant Pathology"
      ],
      researchAreas: [
        "Sugarcane diseases",
        "Plant pathology",
        "Disease resistance breeding",
        "Molecular diagnostics"
      ]
    }
  },
  "kajal-k-biswas": {
    name: "Kajal K. Biswas",
    position: "Secretary (2023-25)",
    designation: "Principal Scientist",
    address: "Division of Plant Pathology, ICAR-Indian Agricultural Research Institute, New Delhi - 110012",
    email: "kajal.biswas@icar.gov.in",
    mobile: "9876543210",
    image: "https://www.ipsdis.org/image/cache/catalog/EC2023/Kajal%20K.%20Biswas-153x198.jpg",
    biodata: {
      birth: "1970, in West Bengal",
      education: {
        bsc: "B.Sc. Agriculture from Bidhan Chandra Krishi Viswavidyalaya (1992)",
        msc: "M.Sc. Plant Pathology from Bidhan Chandra Krishi Viswavidyalaya (1994)",
        phd: "Ph.D. in Plant Pathology from IARI, New Delhi (1998)"
      },
      positions: [
        "Joined ICAR in 1999",
        "Scientist at IARI, New Delhi",
        "Senior Scientist at IARI, New Delhi",
        "Principal Scientist at IARI, New Delhi",
        "Currently Secretary, Indian Phytopathological Society"
      ],
      awards: [
        "ICAR Young Scientist Award",
        "Best Paper Award",
        "Outstanding Scientist Award",
        "Fellow of Indian Phytopathological Society"
      ],
      fellowships: [
        "Fellow of Indian Phytopathological Society",
        "Member of International Society of Plant Pathology"
      ],
      researchAreas: [
        "Plant pathology",
        "Disease management",
        "Molecular plant pathology",
        "Host-pathogen interaction"
      ]
    }
  }
};

function ExecutiveProfile() {
  const { profileId } = useParams();
  const profile = executiveProfiles[profileId];

  if (!profile) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">Profile Not Found</h1>
          <Link to="/present-executive-council" className="text-green-600 hover:text-green-800">
            ← Back to Executive Council
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
            <h1 className="text-3xl font-bold">{profile.name}</h1>
            <Link 
              to="/present-executive-council" 
              className="text-white hover:text-green-200 transition-colors"
            >
              ← Back to Council
            </Link>
          </div>
          <p className="text-xl mt-2">{profile.position}</p>
        </div>

        <div className="p-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Profile Image */}
            <div className="lg:col-span-1">
              <div className="text-center">
                <img
                  src={profile.image}
                  alt={profile.name}
                  className="w-64 h-80 object-cover rounded-lg shadow-lg mx-auto"
                />
              </div>
            </div>

            {/* Contact Information */}
            <div className="lg:col-span-2">
              <div className="bg-gray-50 p-6 rounded-lg">
                <h2 className="text-2xl font-bold text-green-900 mb-4">Contact Information</h2>
                <div className="space-y-3">
                  <div>
                    <span className="font-semibold text-gray-700">Designation:</span>
                    <span className="ml-2">{profile.designation}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Address:</span>
                    <span className="ml-2">{profile.address}</span>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Email:</span>
                    <a href={`mailto:${profile.email}`} className="ml-2 text-green-600 hover:text-green-800">
                      {profile.email}
                    </a>
                  </div>
                  <div>
                    <span className="font-semibold text-gray-700">Mobile:</span>
                    <a href={`tel:${profile.mobile}`} className="ml-2 text-green-600 hover:text-green-800">
                      {profile.mobile}
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Biodata Section */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold text-green-900 mb-6">Brief Biodata</h2>
            
            <div className="space-y-6">
              {/* Birth & Education */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Birth & Education</h3>
                <div className="space-y-3">
                  <p><span className="font-semibold">Birth:</span> {profile.biodata.birth}</p>
                  <div>
                    <span className="font-semibold">Education:</span>
                    <ul className="ml-4 mt-2 space-y-1">
                      <li>• {profile.biodata.education.bsc}</li>
                      <li>• {profile.biodata.education.msc}</li>
                      {profile.biodata.education.phd && <li>• {profile.biodata.education.phd}</li>}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Positions Held */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Positions Held</h3>
                <ul className="space-y-2">
                  {profile.biodata.positions.map((position, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {position}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Awards & Honors */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Awards & Honors</h3>
                <ul className="space-y-2">
                  {profile.biodata.awards.map((award, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {award}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Fellowships */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Fellowships</h3>
                <ul className="space-y-2">
                  {profile.biodata.fellowships.map((fellowship, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {fellowship}
                    </li>
                  ))}
                </ul>
              </div>

              {/* Research Areas */}
              <div className="bg-white border border-gray-200 rounded-lg p-6">
                <h3 className="text-xl font-semibold text-green-800 mb-4">Research Areas</h3>
                <ul className="space-y-2">
                  {profile.biodata.researchAreas.map((area, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-green-600 mr-2">•</span>
                      {area}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ExecutiveProfile; 