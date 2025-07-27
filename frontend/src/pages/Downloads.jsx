import React from "react";

const pdfLinks = [
  { title: "Proceedings of Mid-term EC meeting held on May 23, 2020", url: "/pdfs/proceedings-may-23-2020.pdf", date: "2020-09-12 04:10:15" },
  { title: "Proceedings of Annual General Body Meeting Jan 2020", url: "/pdfs/proceedings-jan-2020.pdf", date: "2020-09-12 04:13:17" },
  { title: "Proceedings of meeting on Pesticide Ban held on June 4, 2020", url: "/pdfs/proceedings-june-4-2020.pdf", date: "2020-09-12 04:23:02" },
  { title: "Abstract Book IPSCONF2020", url: "/pdfs/abstractbook-ipsconf2020.pdf", date: "2022-11-14 09:43:09" },
  { title: "Proceedings of 12th Annual General Body Meeting - March 2022", url: "/pdfs/proceedings-march-2022.pdf", date: "2022-03-14 09:43:09" },
    { title: "Proceedings of Mid-term EC meeting held on May 23, 2020", url: "/pdfs/proceedings-may-23-2020.pdf", date: "2020-09-12 04:10:15" },
  { title: "Proceedings of Annual General Body Meeting Jan 2020", url: "/pdfs/proceedings-jan-2020.pdf", date: "2020-09-12 04:13:17" },
  { title: "Proceedings of meeting on Pesticide Ban held on June 4, 2020", url: "/pdfs/proceedings-june-4-2020.pdf", date: "2020-09-12 04:23:02" },
  { title: "Abstract Book IPSCONF2020", url: "/pdfs/abstractbook-ipsconf2020.pdf", date: "2022-11-14 09:43:09" },
  { title: "Proceedings of 12th Annual General Body Meeting - March 2022", url: "/pdfs/proceedings-march-2022.pdf", date: "2022-03-14 09:43:09" },
    { title: "Proceedings of Mid-term EC meeting held on May 23, 2020", url: "/pdfs/proceedings-may-23-2020.pdf", date: "2020-09-12 04:10:15" },
  { title: "Proceedings of Annual General Body Meeting Jan 2020", url: "/pdfs/proceedings-jan-2020.pdf", date: "2020-09-12 04:13:17" },
  { title: "Proceedings of meeting on Pesticide Ban held on June 4, 2020", url: "/pdfs/proceedings-june-4-2020.pdf", date: "2020-09-12 04:23:02" },
  { title: "Abstract Book IPSCONF2020", url: "/pdfs/abstractbook-ipsconf2020.pdf", date: "2022-11-14 09:43:09" },
  { title: "Proceedings of 12th Annual General Body Meeting - March 2022", url: "/pdfs/proceedings-march-2022.pdf", date: "2022-03-14 09:43:09" },
    { title: "Proceedings of Mid-term EC meeting held on May 23, 2020", url: "/pdfs/proceedings-may-23-2020.pdf", date: "2020-09-12 04:10:15" },
  { title: "Proceedings of Annual General Body Meeting Jan 2020", url: "/pdfs/proceedings-jan-2020.pdf", date: "2020-09-12 04:13:17" },
  { title: "Proceedings of meeting on Pesticide Ban held on June 4, 2020", url: "/pdfs/proceedings-june-4-2020.pdf", date: "2020-09-12 04:23:02" },
  { title: "Abstract Book IPSCONF2020", url: "/pdfs/abstractbook-ipsconf2020.pdf", date: "2022-11-14 09:43:09" },
  { title: "Proceedings of 12th Annual General Body Meeting - March 2022", url: "/pdfs/proceedings-march-2022.pdf", date: "2022-03-14 09:43:09" },
  // ... add more entries as needed, using the screenshot as a guide
];

function Downloads() {
  return (
    <div className="max-w-5xl mx-auto py-8">
      <h1 className="text-5xl font-normal mb-6 text-[#054d6c]">Downloads</h1>
      <div className="overflow-x-auto rounded-lg shadow">
        <table className="w-full border-collapse bg-white">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-3 py-3 text-left font-semibold text-gray-800">#</th>
              <th className="px-3 py-3 text-left font-semibold text-gray-800">Title</th>
              <th className="px-3 py-3 text-left font-semibold text-gray-800">Date</th>
            </tr>
          </thead>
          <tbody>
            {pdfLinks.map((pdf, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-200 last:border-b-0 hover:bg-green-50 transition"
              >
                <td className="px-3 py-2 text-green-700 font-medium">{idx + 1}</td>
                <td className="px-3 py-2">
                  <a
                    href={pdf.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-green-700 underline font-medium hover:text-green-900"
                  >
                    {pdf.title}
                  </a>
                </td>
                <td className="px-3 py-2 text-gray-600 text-sm">{pdf.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Downloads;