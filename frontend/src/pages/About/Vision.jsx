import React from "react";

function Vision() {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        Vision
      </h1>

      {/* Main Description */}
      <div className="text-gray-800 text-base leading-relaxed mb-6">
        <p>
          Indian agriculture registered a phenomenal growth in the recent past mainly due to development of varieties resistant to pathogen and adoption of latest plant protection measures. A lot more need to be done to sustain the momentum gained. In this context, the contribution of the Society in bringing to focus the area of research on diverse aspects of plant pathogen is invaluable.
        </p>
      </div>

      {/* Research Focus Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">Research Focus Areas</h2>
        <p className="text-gray-800 mb-4">
          Advanced techniques for rapid, reliable and specific detection and characterization of pathogen is promoted. Identification of resistance genes and their source, development of molecular markers for resistance, environmental health by promoting bio-control agents and growth promoting bacteria and transgenic resistance as well as host-pathogen interaction are some of the issues, IPS through its various activities trying to crystallize the concepts and its implications in future.
        </p>
      </div>

      {/* New Millennium Vision */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">New Millennium Vision</h2>
        <p className="text-gray-800 mb-4">
          In the new millennium IPS will co­ordinate and will provide impetus to amalgamation of molecular plant pathology and the practical plant pathology to mitigate the disease losses. It is expected that in the foreseeable future, a knowledge-based economy will provide the platform to sustain a rapid rate of economic growth to achieve the objectives. IPS shall remain committed to its core competencies within chemical, biochemical and biotechnological crop disease management to coexist in the future.
        </p>
      </div>

      {/* Global Community Mission */}
      <div className="text-gray-800 text-base leading-relaxed">
        <p>
          The IPS is working for diverse global community of scientists that provides credible and beneficial information related to plant health; advocates and participates in the exchange of knowledge with public, policy makers, and the larger scientific community; and promotes and provides opportunities for scientific communication, career preparation and professional development for its members.
        </p>
      </div>
    </div>
  );
}

export default Vision; 