import React from "react";

function History() {
  return (
    <div className="bg-white p-8 max-w-4xl mx-auto py-8 px-4">
      {/* Title */}
      <h1 className="text-5xl font-normal text-green-900 mb-6">
        History
      </h1>

      {/* Main Description */}
      <div className="text-gray-800 text-base leading-relaxed mb-6">
        <p>
          It was the afternoon of 28th February, 1947, when about 20 mycologists and plant pathologists from various parts of the country assembled at Indian Agricultural Research Institute, New Delhi. A meeting was conveyed by Dr. B.B. Mundkur under the chairmanship of Prof. S.R. Bose to discuss the possibilities of forming a society to bring together all persons interested in the study of fungi, in view of the fact that plant pathology had begun to assume increasingly greater importance in universities and colleges as well as in State Agriculture Departments. The same day unanimous decision was taken and the Indian Phytopathological Society (IPS) was established.
        </p>
      </div>

      {/* Founding Committee Section */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">Founding Committee</h2>
        <p className="text-gray-800 mb-4">
          A small sub-committee, consisting of Prof. J.F. Dastur (chairman), Dr. S.R. Bose, Dr. B.N. Uppal, Dr. A. Sattar and Dr. R.S. Vasudeva as members and Dr. B.B. Mundkur as convener was formed to take steps for starting a journal, framing constitution and bylaws of society. Dr. Mundkur was requested to act as Secretary-Treasurer for 1947 or until new office-bearers were elected.
        </p>
      </div>

      {/* Dr. Mundkur's Contribution */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">Dr. B.B. Mundkur's Contribution</h2>
        <p className="text-gray-800 mb-4">
          With the zeal and enthusiasm, characteristic of Dr. Mundkur, he devoted his full energy for the given task and invited all persons interested in the study of plant pathology in India and abroad to become members of the society. He enrolled a large number of mycologists and plant pathologists working in India and abroad as members of the Society. He even enrolled persons who had some interest in Plant Pathology. It is said that once he was travelling in a train and while talking to fellow passengers impressed upon them and enrolled them as member of the society. In this way he increased the number of members and much needed finance. Later, industrial concerns interested in the subject, were also approached to become patrons of the Society to protect its financial status.
        </p>
      </div>

      {/* Current Status */}
      <div className="mb-6">
        <h2 className="text-xl font-bold text-green-900 mb-3">Current Status</h2>
        <p className="text-gray-800 mb-4">
          Now, over 2,000 members of the society are spread in India and approximately 50 other countries. It is the third largest society of plant pathologists in the world. They comprise scientists, teachers, technicians, students, extension workers, company professionals, private consultants, administrators, agricultural field representatives and pest management personnel. Their professions vary, but they have single common goal – to promote knowledge on plant diseases.
        </p>
      </div>

      {/* Constitution and Registration */}
      <div className="text-gray-800 text-base leading-relaxed">
        <p>
          Steps for framing a constitution and bye-laws of the Society were taken and the final draft of constitutions was ratified at the first annual general body meeting of the Society held on January 2, 1948 at Patna, wherein 156 members (charter members) participated. Drafting the constitution was largely done by Dr. Mundkur and the fact remains that very little change has been made in the bylaws even after nearly 7 decades of its establishment and working. This shows that with what thoroughness and foresight the job was done by Dr. Mundkur and his team. The Society was registered on 3rd November 1949, under the Societies Registration Act XXI of 1860 with Registration No. S399 of 1949-50, with its headquarter in the Division of Mycology and Plant Pathology, Indian Agricultural Research Institute, New Delhi.
        </p>
      </div>
    </div>
  );
}

export default History; 