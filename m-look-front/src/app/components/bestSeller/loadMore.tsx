import React from "react";

const LoadMore = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="w-full flex justify-center items-center p-8">
      <button className=" text-skyblue border-b-2 text-responsive border-skyblue px-4 py-2">Load More</button>
    </div>
  );
};

export default LoadMore;
