import React from "react";
import { useParams } from "react-router-dom";

const mundkurAwardees = [
  { no: 1, year: 1963, name: "Dr. J.F. Dastur", title: "A rambling talk: an Mycology and Mycologists in India" },
  { no: 2, year: 1964, name: "Dr. M.J. Narasimhan", title: "Study of heterokaryotic life cycles of rusts in India" },
  { no: 3, year: 1966, name: "Dr. K.D. Bagchee", title: "Forest pathology in Jammu & Kashmir" },
  { no: 4, year: 1967, name: "Dr. R.K. Saksena", title: "The soil fungi-a biological approach" },
  { no: 5, year: 1968, name: "Dr. S.B. Saksena", title: "These cultural fungi in the service of plant pathology" },
  { no: 6, year: 1969, name: "Dr. S.N. Dasgupta", title: "Changing concepts of phytopathogenicity" },
  { no: 7, year: 1970, name: "Dr. R.N. Tandon", title: "Certain problems of post harvest diseases of fruits and vegetables" },
  { no: 8, year: 1971, name: "Dr. D.V. Parashar", title: "Role of fungicides in modernising agriculture in India" },
  { no: 9, year: 1972, name: "Dr. B.B. Mundkur", title: "Yeasts and yeasts phase of fungi pathogenic to humans, animals and plants" },
  { no: 10, year: 1973, name: "Dr. S.P. Raychaudhuri", title: "Seed pathology in relation to plant quarantine and seed industry of India" },
  { no: 11, year: 1974, name: "Dr. D.S. Vasudeva", title: "A lecture in memory of Professor Bhattachandra Bhawanishankar Mundkur" },
  { no: 12, year: 1975, name: "Dr. S.K. Sinha", title: "Expanding horizon of microbial aerobology" },
  { no: 13, year: 1976, name: "Dr. R.K. Saksena", title: "Reminiscences and observations on the growth of plant pathology in India" },
  { no: 14, year: 1977, name: "Dr. M.R.S. Pagi", title: "Some notable contributions to studies in mycology" },
  { no: 15, year: 1978, name: "Dr. M.S.S. Iyengar", title: "Antibiotics in plant disease control-an overview of trends and needs" },
  { no: 16, year: 1979, name: "Dr. C.L. Om", title: "Red rot of sugarcane and sugar industry-a review" },
  { no: 17, year: 1980, name: "Dr. Akram M. Khan", title: "Certain biotic factors influencing pathogenicity in nematodes" },
  { no: 18, year: 1981, name: "Dr. H.G. Govindu", title: "Green revolution-its impact on plant diseases with special reference to cereals and millets" },
  { no: 19, year: 1982, name: "Dr. D.N. Shukla", title: "Fifty years of Plant Pathology in India - Current research priorities" },
  { no: 20, year: 1983, name: "Dr. C.V. Subramanian", title: "Fusaria and fusarioses - a century of progress" },
  { no: 21, year: 1984, name: "Dr. B.M. Upadhyay", title: "Development in antifungal chemotherapeutic research" },
  { no: 22, year: 1985, name: "Dr. S. Burgan", title: "Fungal toxins-their standards and definitions" },
  { no: 23, year: 1986, name: "Dr. K.S. Bilgrami", title: "Education and training of a plant virologist" },
  { no: 24, year: 1987, name: "Dr. G.P. Rangaswami", title: "Soil-antibiotic microbe-relationships" },
  { no: 25, year: 1988, name: "Dr. D. Manoharachary", title: "Recent trends of researches in graminicolous Helminthosporia" },
  { no: 26, year: 1989, name: "Dr. Akhan Singh", title: "Red rot of sugarcane in India and its management" },
  { no: 27, year: 1990, name: "Dr. U.P. Sharma", title: "Biology of white transparent germinating in India" },
  { no: 28, year: 1991, name: "Dr. Arun Varma", title: "Emerging problems in plant bacteriology" },
  { no: 29, year: 1992, name: "Dr. S.M. Paul Khurana", title: "Immunodiagnostics of plant viruses with special reference to viruses" },
  { no: 30, year: 1993, name: "Dr. B.M. Payak", title: "Biology, Life Cycles and Spore Development Indian Rust Fungi (Urediniomycetes)" },
  { no: 31, year: 1994, name: "Dr. D.M. Donal", title: "Current status and future approaches for management of groundnut diseases in India" },
  { no: 32, year: 1995, name: "Dr. Dinesh Kumar", title: "Synecological microbe activation" },
  { no: 33, year: 1996, name: "Dr. V.N. Pathak", title: "Post-harvest Fruit Pathology - Present Status and Future Possibilities" },
  { no: 34, year: 1997, name: "Dr. G.S. Shekhawat", title: "Diseases and pest management in potato-An Indian experience" },
  { no: 35, year: 1998, name: "Dr. P.K. Koshy", title: "Root (wilt) disease of coconut" },
  { no: 36, year: 1999, name: "Dr. A.K. Chahal", title: "Integrated management of potato Sclerotium wilt caused by Sclerotium rolfsii" },
  { no: 37, year: 2000, name: "Dr. V.R. Sasturi", title: "Epidemiology and management of two cereal bunts" },
  { no: 38, year: 2001, name: "Dr. T.V. Sanna", title: "Phytopathores of Horticultural/Plantation Crops with specific reference to Black Pepper Phytophthora and Disease Management" },
  { no: 39, year: 2002, name: "Dr. D. Suhaganan", title: "Could not delivered" },
  { no: 40, year: 2003, name: "Dr. H. Shukra Shetty", title: "Genetic diversity in Sclerospora graminicola - The infect of pearl millet downy mildew disease" },
  { no: 41, year: 2004, name: "Dr. M.N. Thakur", title: "Lentil Rust: Biology, Epidemiology and Management" },
  { no: 42, year: 2005, name: "Dr. B.K. Bhatnagar", title: "Present scenario of virus and virus-like diseases of crop plants" },
  { no: 43, year: 2006, name: "Dr. G. Dayanarayana", title: "The diversity of rust fungi of India - An overview" },
  { no: 44, year: 2007, name: "Dr. G. Manoharachary", title: "Biodiversity, taxonomy, conservation, ecology and utilization of freshwater aquatic fungi from India" },
  { no: 45, year: 2008, name: "Dr. S. Nagarajan", title: "Regulatory Plant Pathology in India and its Role in Ensuring Agricultural Biosecurity" },
  { no: 46, year: 2009, name: "Dr. K. Muthukrishnan", title: "How do we precisely estimate yield losses inflicted by plant diseases?" },
  { no: 47, year: 2010, name: "Dr. V. Prakash", title: "Current scenario of mushroom research in India" },
  { no: 48, year: 2011, name: "Dr. K. Sharma", title: "Molecular Diagnostics-Need of the Hour" },
  { no: 49, year: 2012, name: "Dr. T.R. Sharma", title: "Decoding plant genomes for mining disease resistance genes" },
  { no: 50, year: 2013, name: "Dr. M.K. Reddy", title: "Phylogeography and molecular evolution of begomoviruses infecting okra" },
  { no: 51, year: 2014, name: "Dr. S.K. Bhat", title: "Seed biopriming: A comprehensive approach towards Agricultural Sustainability" },
  { no: 52, year: 2015, name: "Dr. B.V. Chavan", title: "Diversity of plant pathogens and hyperparasites in northeast India" },
  { no: 53, year: 2016, name: "Dr. P.K. Chakrabarty", title: "Strategic Management of Plant Diseases to Ensure Crop Biosecurity" },
  { no: 54, year: 2017, name: "Dr. N. Meher", title: "Nematode infestation, a potential threat Indian forests" },
  { no: 55, year: 2018, name: "Dr. M.K. Chakraborty", title: "Exploiting potentials of PGPMS in sustainable crop disease management" },
  { no: 56, year: 2019, name: "Dr. A.K. Pandey", title: "Plant Pathology in the Era of New Education Policy: challenges and opportunities" },
  { no: 57, year: 2020, name: "Dr. Rashi Aggarwal", title: "Advances in Plant Pathology Research: Challenges and Opportunities" },
  { no: 58, year: 2021, name: "Dr. S.C. Dubey", title: "Diversity, diagnostics, epidemiology and management of diseases in pulse crops caused Rhizoctonia solani" },
  { no: 59, year: 2022, name: "Dr. Ramesh Chand", title: "Red rot of sugarcane: Traveling the path on the epidemics, pathogen variation, host resistance and management" },
];

export default function Awardees() {
  const { awardName } = useParams();
  const decodedName = decodeURIComponent(awardName);

  if (decodedName !== "Mundkur Memorial Award") {
    return (
      <div className="bg-white p-8 max-w-4xl mx-auto min-h-screen">
        <h1 className="text-4xl font-bold text-green-900 mb-6">Awardees of {decodedName}</h1>
        <p className="text-gray-800 text-base leading-relaxed">
          No awardees data available for this award yet.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white p-8 max-w-6xl mx-auto min-h-screen">
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        Mundkur Memorial Lecture Award - Awardees
      </h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="min-w-full bg-white border border-gray-200">
          <thead className="bg-green-800 text-white">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">S.No.</th>
              <th className="py-3 px-4 text-left font-semibold">Year</th>
              <th className="py-3 px-4 text-left font-semibold">Name</th>
              <th className="py-3 px-4 text-left font-semibold">Title of lecture</th>
            </tr>
          </thead>
          <tbody>
            {mundkurAwardees.map((a) => (
              <tr key={a.no} className={a.no % 2 === 0 ? "bg-white" : "bg-gray-50"}>
                <td className="py-2 px-4 align-top">{a.no}</td>
                <td className="py-2 px-4 align-top">{a.year}</td>
                <td className="py-2 px-4 align-top">{a.name}</td>
                <td className="py-2 px-4 align-top">{a.title}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
} 