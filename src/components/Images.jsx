import React from "react";

export default function Images({ imagesData }) {
  return (
    <div className="columns-2 md:columns-3 lg:columns-4 gap-x-5">
      {imagesData.map((item, index) => (
        <div className="w-full inline-block mb-5 rounded-xl" key={index}>
          <img
            src={item.urls.small}
            alt={item.alt_description}
            className="w-full h-auto rounded-xl"
          />
          <p className="mt-2 text-sm text-gray-700">{item.alt_description}</p>
        </div>
      ))}
    </div>
  );
}
