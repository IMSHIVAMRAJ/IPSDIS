import React from "react";

export default function Journal() {
  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-5xl mx-auto px-4 pt-8">
        {/* Removed Header */}
        <h1 className="text-5xl font-normal text-green-900 mb-6">
          Journal - Indian Phytopathology
        </h1>
        <div className="flex flex-col md:flex-row gap-8">
          <div className="flex-1">
            <p className="mb-4 text-gray-800">
              The Society publishes its official organ "Indian Phytopathology" a leading plant pathology research journal, which deals with the disciplines of Mycology, Fungal Pathology, Bacteriology, Virology, Phytopathology and Nematology. The journal is a focus and strength of the society. First number appeared during 1948 with 96 printed pages and such issues were kept up uninterrupted every six months till 1961.
            </p>
            <p className="mb-4 text-gray-800">
              On account of increase in membership and greater impetus to research all over the country and the number of papers received it was decided to increase the frequency of publication to 4 issues (quarterly) from vol. 15 during 1962. Each year about 400 pages are printed to form a volume. About 285 libraries and institutions are subscribing the journal. Out of this number about 150 are in foreign countries.
            </p>
            <p className="mb-4 text-gray-800">
              The journal is published quarterly i.e. in March, June, September and December. Till 2017, the society has published 70 volumes. This is one of the scientific journals of India, which is up to date and published in time. Besides, quality research papers, presidential address, award lectures, short communications, first reports, book reviews, phytopathological news etc. are also published in the journal.
            </p>
          </div>
          <div className="flex flex-col items-center min-w-[180px]">
            <img
              src="/Images/book1.jpg"
              alt="Indian Phytopathology Cover"
              className="w-36 h-48 object-cover rounded shadow mb-2"
            />
            <div className="bg-green-100 text-green-900 px-3 py-1 rounded text-xs font-semibold mb-1">
              Latest Issue
            </div>
            <a
              href="/publications/books"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-700 text-white px-4 py-1 rounded text-sm font-semibold hover:bg-green-800 transition"
            >
              VIEW ALL
            </a>
          </div>
        </div>
        {/* Archive Links */}
        <div className="mt-10">
          <h2 className="text-xl font-semibold text-green-900 mb-3">
            All the issues of the journal Indian Phytopathology
          </h2>
          <div className="bg-gray-50 border rounded p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <span className="font-semibold">1996 - 2017</span>{" "}
                <a
                  href="http://epubs.icar.org.in/ejournal/index.php/IPP/issue/archive"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-900"
                >
                  http://epubs.icar.org.in/ejournal/index.php/IPP/issue/archive
                </a>
              </div>
              <div className="flex-1">
                <span className="font-semibold">2018 - onwards</span>{" "}
                <a
                  href="https://www.springer.com/journal/42360"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-700 underline hover:text-green-900"
                >
                  https://www.springer.com/journal/42360
                </a>
              </div>
            </div>
          </div>
        </div>
        {/* Special Issue Box */}
        <div className="bg-blue-50 border-l-4 border-blue-400 p-4 mb-8">
          <div className="font-bold text-blue-900 mb-2">
            S.I. Microbiome Synergies for Plant Health Management and Climate Resilient Agriculture
          </div>
          <div className="text-gray-800 mb-2">
            This special issue is a collaborative effort between the Journal and the internationally renowned Asian PGPR Society, presenting a diverse collection of research articles from around the world. It explores the pioneering role of microbiome research in plant growth and health, with a special focus on <span className="font-semibold">Plant Growth-Promoting Microbiome (PGPM) and their holistic contributions to plant health management.</span>
          </div>
          <div className="mb-2">
            <span className="font-semibold">Guest Editors:</span>
            <ul className="list-disc list-inside ml-4 text-gray-700 text-sm">
              <li>Dr. R. Viswanathan</li>
              <li>Prof. Andy Kumar, ICAR-IARI, New Delhi, India</li>
              <li>Dr. M. S. Reddy, Auburn University, USA</li>
              <li>Dr. Dilantha Fernando, Dean, University of Manitoba, Canada</li>
              <li>Dr. Abdul Gafur, Head R&D, Indonesia</li>
              <li>Dr. S Krishna Sundar, JIT, India</li>
            </ul>
          </div>
          <div className="text-sm text-gray-700">
            <div>
              <span className="font-semibold">Timeline for Publication:</span> June 2026
            </div>
            <div>
              <span className="font-semibold">Submission Opening Date:</span> June 1, 2025
            </div>
            <div>
              <span className="font-semibold">Submission Closing date:</span> August 31, 2025
            </div>
          </div>
        </div>
        {/* Journal Information */}
        <div className="mb-10">
          <h3 className="text-lg font-semibold text-green-900 mb-2">Journal information</h3>
          <div className="flex flex-wrap gap-8 text-sm">
            <div>
              <div>
                <span className="font-semibold">Electronic ISSN</span><br />
                2248-9800
              </div>
              <div className="mt-2">
                <span className="font-semibold">Print ISSN</span><br />
                0367-973X
              </div>
            </div>
            <div>
              <div className="font-semibold mb-1">Abstracted and indexed in</div>
              <ul className="list-disc list-inside text-gray-700">
                <li>Baidu</li>
                <li>CLOCKSS</li>
                <li>CNKI</li>
                <li>CNPIEC</li>
                <li>Dimensions</li>
                <li>EBSCO</li>
                <li>EMBiology</li>
                <li>Google Scholar</li>
                <li>Meta</li>
                <li>Naver</li>
                <li>OCLC WorldCat Discovery Service</li>
                <li>Portico</li>
                <li>ProQuest</li>
                <li>SCImago</li>
                <li>SCOPUS</li>
                <li>TD Net</li>
                <li>Wanfang</li>
              </ul>
            </div>
          </div>
        </div>
        {/* Journal Metrics */}
        <div className="flex items-center gap-6 mb-12">
          <div className="bg-white border rounded shadow p-4 flex flex-col items-center">
            <div className="text-xs text-gray-500 mb-1">Indian Phytopathology</div>
            <div className="text-lg font-bold text-green-900 mb-1">Q3</div>
            <div className="text-xs text-gray-500 mb-2">Agronomy and Crop Science</div>
            <img
              src="/quartile-graph.png"
              alt="Quartile Graph"
              className="w-20 h-8 object-contain"
            />
          </div>
        </div>
      </div>
    </div>
  );
}