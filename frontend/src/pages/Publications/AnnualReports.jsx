import React from "react";

const annualReports = [
  {
    title: "Annual Report 2014-15",
    img: "/Images/book1.jpg",
    link: "/annual-reports/2014-15.pdf",
  },
  {
    title: "Annual Report 2015-16",
    img: "/Images/book2.jpg",
    link: "/annual-reports/2015-16.pdf",
  },
  {
    title: "Annual Report 2016-17",
    img: "/Images/book3.jpg",
    link: "/annual-reports/2016-17.pdf",
  },
  {
    title: "Annual Report 2017-18",
    img: "/Images/books.jpg",
    link: "/annual-reports/2017-18.pdf",
  },
  {
    title: "Annual Report 2018-19",
    img: "/Images/book5.jpg",
    link: "/annual-reports/2018-19.pdf",
  },
  {
    title: "Annual Report 2019-20",
    img: "/Images/book7.jpg",
    link: "/annual-reports/2019-20.pdf",
  },
];

export default function AnnualReports() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-8 text-center">
          Annual Reports
        </h1>
        <div className="flex flex-wrap gap-8 justify-center">
          {annualReports.map((report, idx) => (
            <div
              key={idx}
              className="w-56 bg-white rounded shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={report.img}
                alt={report.title}
                className="w-full h-72 object-cover rounded-t"
                loading="lazy"
              />
              <div className="p-3 text-center text-lg text-green-900 font-semibold">
                {report.title}
              </div>
              <a
                href={report.link}
                download
                className="mb-4 px-6 py-2 bg-green-800 text-white rounded font-medium hover:bg-green-900 transition"
              >
                DOWNLOAD
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}