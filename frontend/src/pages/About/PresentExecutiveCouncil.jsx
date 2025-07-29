import React from "react";
import { useSearchParams, Link } from "react-router-dom";

const councilMembers = [
  {
    name: "Dinesh Singh",
    position: "President (2025)",
    category: "President",
    img: "https://www.ipsdis.org/image/cache/catalog/EC2024/2017-19%20Dinesh%20Singh-153x198.jpg",
    profile: "/executive-profile/dinesh-singh",
  },
  {
    name: "R. Viswanathan",
    position: "President-Elect (2025)",
    category: "President",
    img: "https://www.ipsdis.org/image/cache/catalog/Chief%20Editor/RViswanathan-153x198.jpg",
    profile: "/executive-profile/r-viswanathan",
  },
  {
    name: "Kajal K. Biswas",
    position: "Secretary (2023-25)",
    category: "Secretary",
    img: "https://www.ipsdis.org/image/cache/catalog/EC2023/Kajal%20K.%20Biswas-153x198.jpg",
    profile: "/executive-profile/kajal-k-biswas",
  },
  {
    name: "Lakshman Prasad",
    position: "Joint Secretary (2024-25)",
    category: "Joint Secretary",
    img: "https://www.ipsdis.org/image/cache/catalog/EC2024/Lakshman%20Prasad-153x198.jpg",
    profile: "#",
  },
  {
    name: "Malkhan S. Gurjar",
    position: "Treasurer (2023-25)",
    category: "Treasurer",
    img: "https://www.ipsdis.org/image/cache/catalog/EC2025/Pradeep%20Manyam-153x198.jpg",
    profile: "#",
  },
  {
    name: "R. Viswanathan",
    position: "Chief Editor (2023-25)",
    category: "Chief Editor",
    img: "https://www.ipsdis.org/image/cache/catalog/EC2025/Yogita%20Bohra-153x198.jpg",
    profile: "#",
  },
];

function PresentExecutiveCouncil() {
  const [searchParams] = useSearchParams();
  const activeFilter = searchParams.get('filter') || 'all';

  const filteredMembers = activeFilter === "all" 
    ? councilMembers 
    : councilMembers.filter(member => member.category === activeFilter);

  return (
    <div className="bg-white p-8 max-w-7xl mx-auto py-8 px-4">
      <h1 className="text-5xl font-normal text-green-900 mb-10 text-center">Present Executive Council</h1>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 justify-items-center">
        {filteredMembers.map((member, idx) => (
          <div
            key={idx}
            className="bg-white rounded-lg shadow border border-gray-200 flex flex-col items-center p-4 w-full max-w-xs hover:shadow-lg hover:scale-105 hover:z-10 transition-all duration-300 ease-in-out"
          >
            <img
              src={member.img}
              alt={member.name}
              className="w-40 h-48 object-cover rounded mb-4 border border-gray-300"
            />
            <div className="text-lg font-bold text-green-800 mb-1 text-center">{member.name}</div>
            <div className="text-base text-gray-700 mb-4 text-center">{member.position}</div>
            <Link
              to={member.profile}
              className="px-5 py-2 rounded bg-green-700 text-white font-semibold shadow hover:bg-green-800 transition-colors duration-200 text-base"
            >
              VIEW PROFILE
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PresentExecutiveCouncil; 