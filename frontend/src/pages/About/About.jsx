import React from "react";

function About() {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        About the Society
      </h1>

      {/* Main Description */}
      <div className="text-gray-800 text-base leading-relaxed mb-6">
        <p>
          The Indian Phytopathological Society (IPS) is a professional society for promoting the cause of the science of Phytopathology. The Society focuses on the field of Mycology, Plant Pathology, Bacteriology, Virology, Phytoplasmology, and Nematology. It provides a unique platform to the scientists working in the field of plant pathology-related research to share their research achievements. It also keeps members informed about the various activities related to the development of plant pathology and about the members of the society.
        </p>
      </div>

      {/* Objectives Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">Objectives</h2>
        <p className="text-gray-800 mb-4">
          The Society was basically formed with the following objectives:
        </p>
        <ol className="list-decimal list-inside space-y-2 text-gray-800">
          <li>To advance the cause of Mycology and Plant Pathology in India.</li>
          <li>To encourage and promote mycological and plant pathological studies and research in the country.</li>
          <li>To disseminate the knowledge of mycology and plant pathology.</li>
          <li>To facilitate closer association and relations among members and other scientific workers in India and abroad.</li>
        </ol>
      </div>

      {/* Registration and Headquarters */}
      <div className="text-gray-800 text-base leading-relaxed">
        <p>
          The Society was registered on 3-11-1949, under the Societies Registration Act XXI of 1860 with Registration No. S399 of 1949-50. A very significant step to make the Society stable was taken in the XI Annual General Meeting held in Delhi on 23rd January 1959 when it was resolved that the Division of Mycology and Plant Pathology, Indian Agricultural Research Institute, New Delhi would be the permanent Headquarters of the Society.
        </p>
      </div>
    </div>
  );
}

export default About; 