import { RefreshCw, RotateCw } from "lucide-react";
import Image from "next/image";
import React from "react";

const LoadMore = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="w-full flex justify-center items-center p-8">
      <button
        disabled={isLoading}
        className={`${
          isLoading &&
          "cursor-not-allowed border-b opacity-45 border-black text-black"
        } flex gap-4 items-center text-skyblue border-b-2 text-responsive border-skyblue px-4 py-2`}
      >
        {isLoading && (
          <RefreshCw strokeWidth={2.75} className="animate-spin duration-400" />
        )}
        Load more
      </button>
    </div>
  );
};

export default LoadMore;
