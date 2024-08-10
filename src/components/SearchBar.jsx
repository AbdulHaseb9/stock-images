import React, { useEffect, useState } from "react";
import axios from "axios";
import InfiniteScroll from "react-infinite-scroll-component";
import Images from "./Images";

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState("");
  const [images, setImages] = useState([]);
  const [pages, setPages] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    // Fetch default nature images when the component mounts
    fetchImages(1, "nature", true);
  }, []);

  const searchImage = async (e) => {
    e.preventDefault();
    setPages(1);
    setImages([]);
    fetchImages(1, searchTerm, true);
  };

  const fetchImages = async (page, query, isNewSearch = false) => {
    try {
      const api = await axios.get(
        `https://api.unsplash.com/search/photos?page=${page}&query=${query}&client_id=V8rtyWfswX1eL36WW6cucPiXuI0RRDWrT7f-N9B4354`
      );
      const fetchedImages = api.data.results;

      if (fetchedImages.length === 0) {
        setHasMore(false);
        return;
      }

      setImages((prevImages) =>
        isNewSearch ? fetchedImages : [...prevImages, ...fetchedImages]
      );
      setHasMore(true);
    } catch (error) {
      console.error("Error fetching images:", error);
      alert("Failed to fetch images. Please try again later.");
    }
  };

  const fetchMoreData = () => {
    const nextPage = pages + 1;
    setPages(nextPage);
    fetchImages(nextPage, searchTerm);
  };

  return (
    <div>
      <form onSubmit={searchImage}>
        <div className="bg-white border-2 shadow p-2 relative rounded-xl flex my-4">
          <span className="w-auto flex justify-end  items-center text-gray-500 p-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              ></path>
            </svg>
          </span>
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border-white outline-none border-0 w-full rounded-xl p-2"
            placeholder="Try to search some amazing pictures"
          />
          <button
            type="submit"
            className="bg-black hover:bg-gray-700 rounded-xl text-white text-xl p-2 pl-4 pr-4 ml-2"
          >
            <p className="font-semibold text-xs">Search</p>
          </button>
        </div>
      </form>

      <InfiniteScroll
        dataLength={images.length}
        next={fetchMoreData}
        hasMore={hasMore}
        loader={<h4>Loading...</h4>}
        endMessage={<p style={{ textAlign: "center" }}>No more images</p>}
      >
        <Images imagesData={images} />
      </InfiniteScroll>
    </div>
  );
}
