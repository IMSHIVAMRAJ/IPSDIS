import React from "react";

export default function EditorialBoard() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-10 text-center">
          Editorial Board (2023-25)
        </h1>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 text-gray-900">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left text-lg font-semibold border-b border-gray-300 w-1/2">
                  &nbsp;
                </th>
                <th className="px-4 py-3 text-left text-lg font-semibold border-b border-gray-300">
                  Area of Specialization
                </th>
              </tr>
            </thead>
            <tbody>
              {/* Chief Editor */}
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-bold bg-gray-100 border-b border-gray-300" colSpan={2}>
                  Chief Editor
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  <span className="font-bold">Dr. R. Viswanathan</span>, Director, ICAR-Indian Institute of Sugarcane Research, Lucknow, Uttar Pradesh, India, Mob.: 9442543875; Email: rasaviswanath@yahoo.co.in
                </td>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  Sugarcane Pathology, Molecular Plant Pathology, host-pathogen interaction, Molecular diagnosis
                </td>
              </tr>
              {/* Senior Editors */}
              <tr className="bg-gray-50">
                <td className="px-4 py-3 font-bold bg-gray-100 border-b border-gray-300" colSpan={2}>
                  Senior Editors: Fungal Pathology, Mycology, Nematology
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  <span className="font-bold">Dr. T.K. Bag</span>, Principal Scientist (Plant Pathology), ICAR-Indian Agricultural Research Institute, New Delhi, India, Mob.: 7085951827; Email: tusar.bag@gmail.com
                </td>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  Fungal Plant Pathology (Vegetables, Orchids, Potato diseases). Presently working in Pulse Diseases
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  <span className="font-bold">Dr. (Ms.) Laetitia Willocquet</span>, Scientist, INRAE, Département Santé des Plantes et Environnement, 400 route des Chappes, BP 167, 06 903 Sophia–Antipolis, cedex, France, Email: lwillocquet@gmail.com; laetitia.willocquet@inrae.fr
                </td>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  Plant Pathology, Plant Disease Epidemiology<br />
                  Modelling of yield losses from pests; Phenotyping of quantitative host plant resistance
                </td>
              </tr>
              <tr>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  <span className="font-bold">Dr. R. Thangavelu</span>, Principal Scientist, ICAR-National Research Centre for Banana, Tiruchirappalli, Tamil Nadu, India, Mob.: 9443589882; Email: rtbanana@gmail.com
                </td>
                <td className="px-4 py-3 align-top border-b border-gray-300">
                  Molecular characterization and molecular diagnosis of banana fungal pathogens, management of banana diseases through IDM practice, development of mass multiplication and delivery methods for the bioagents, screening of banana genotypes and mutants for their resistance to Fusarium wilt and Sigatoka leaf spot disease, management of post-harvest diseases and increase in shelf life of banana using bioagents and novel compounds for export purposes, isolation and characterization
                </td>
              </tr>
              {/* Add more rows as needed */}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}