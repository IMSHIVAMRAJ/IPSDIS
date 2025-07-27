import React from "react";

const abstractBooks = [
  {
    title: "Abstract Book IPSCONF2020",
    img: "/Images/book1.jpg",
    link: "/abstracts/IPSCONF2020.pdf",
  },
  {
    title: "International Conference - Bangkok",
    img: "/Images/book2.jpg",
    link: "/abstracts/Bangkok.pdf",
  },
  {
    title: "Special Symposium - Raipur 2018",
    img: "/Images/book3.jpg",
    link: "/abstracts/Raipur2018.pdf",
  },
  {
    title: "Brain Storming Session - Karnal 2018",
    img: "/Images/book4.jpg",
    link: "/abstracts/Karnal2018.pdf",
  },
  {
    title: "National Symposium - Jorhat 2017-18",
    img: "/Images/book5.jpg",
    link: "/abstracts/Jorhat2017.pdf",
  },
  {
    title: "Special Symposium - Anand 2017",
    img: "/Images/book7.jpg",
    link: "/abstracts/Anand2017.pdf",
  },
];

export default function AbstractBooks() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-8 text-center">
          Abstract Books
        </h1>
        <p className="mb-8 text-lg text-gray-800 text-center">
          The abstracts of the zonal and national symposium is given below. Click on
          download button to download the full abstract book of the symposia.
        </p>
        <div className="flex flex-wrap gap-8 justify-center">
          {abstractBooks.map((book, idx) => (
            <div
              key={idx}
              className="w-56 bg-white rounded shadow hover:shadow-lg transition flex flex-col items-center"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-72 object-cover rounded-t"
                loading="lazy"
              />
              <div className="p-3 text-center text-lg text-green-900 font-semibold">
                {book.title}
              </div>
              <a
                href={book.link}
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