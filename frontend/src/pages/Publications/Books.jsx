import React from "react";
import { Link } from "react-router-dom";

const books = [
  {
    title: "Recent Approaches for Management of Plant Diseases",
    img: "/Images/book1.jpg",
    id: "recent-approaches-management-plant-diseases"
  },
  {
    title: "Diseases of Ornamental Crops (2017)",
    img: "/Images/book2.jpg",
    id: "diseases-ornamental-crops-2017"
  },
  {
    title: "पादप रोगों को चुनौतियाँ एवं समाधान (2016) - हिंदी प्रकाशन",
    img: "/Images/book3.jpg",
    id: "padap-rogon-chunautiyan-samadhan-2016"
  },
  {
    title: "Diseases of Field Crops (2016)",
    img: "/Images/book3.jpg",
    id: "diseases-field-crops-2016"
  },
  {
    title: "Perspectives of Plant Pathology (2016)",
    img: "/Images/book4.jpg",
    id: "perspectives-plant-pathology-2016"
  },
  {
    title: "Diseases of Vegetable Crops (2014)",
    img: "/Images/book5.jpg",
    id: "diseases-vegetable-crops-2014"
  },
];

export default function Books() {
  return (
    <div className="bg-white min-h-screen py-8">
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-5xl font-normal text-green-900 mb-6">
          Books &amp; Bulletins
        </h1>
        <p className="mb-2 text-gray-800">
          The Indian Phytopathological Society is offering the following new books
          for your ready reference, record, selection and placing your valuable
          order. We hope that you will find above books useful for your
          department / library.
        </p>
        <div className="mb-4">
          <span className="text-xl text-red-600 font-semibold">
            Place your order to:
          </span>
        </div>
        <div className="mb-6 text-gray-800">
          The Secretary, Indian Phytopathological Society, Division of Plant
          Pathology, IARI, New Delhi 110012, INDIA
          <br />
          Tel.: 011-25840023,
          <br />
          Email:{" "}
          <a
            href="mailto:ipsdis@yahoo.com"
            className="text-blue-700 underline"
          >
            ipsdis@yahoo.com
          </a>{" "}
          ; Website:{" "}
          <a
            href="http://ipsdis.org"
            className="text-blue-700 underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            http://ipsdis.org
          </a>
        </div>
        <div className="flex flex-wrap gap-6">
          {books.map((book, idx) => (
            <Link
              key={idx}
              to={`/publications/book/${book.id}`}
              className="w-48 bg-white rounded shadow hover:shadow-lg transition flex flex-col items-center transform hover:scale-105 duration-200"
            >
              <img
                src={book.img}
                alt={book.title}
                className="w-full h-64 object-cover rounded-t"
                loading="lazy"
              />
              <div className="p-2 text-center text-base text-green-900 font-medium">
                {book.title}
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}