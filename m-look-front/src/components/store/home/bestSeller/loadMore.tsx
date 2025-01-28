import { RefreshCw } from "lucide-react";
import React from "react";

const LoadMore = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <label
      htmlFor="loadMore"
      className="w-full flex justify-center items-center p-8"
    >
      <button
        disabled={isLoading}
        data-loading={isLoading}
        className="border-primary flex gap-4 items-center text-primary uppercase border-b-2 text-responsive border-skyblue py-1
        data-[loading=true]:cursor-not-allowed data-[loading=true]:border-b-2 data-[loading=true]:opacity-45"
      >
        <RefreshCw
          strokeWidth={2}
          data-loading={isLoading}
          className="hidden animate-spin duration-400
          data-[loading=true]:block"
        />
        <h1 className="font-medium">Load more</h1>
      </button>
    </label>
  );
};

export default LoadMore;
