import { RefreshCw } from "lucide-react";
import React from "react";

const LoadMore = ({ isLoading }: { isLoading: boolean }) => {
  return (
    <div className="w-full flex justify-center items-center p-8">
      <button
        disabled={isLoading}
        className={`${
          isLoading &&
          "cursor-not-allowed border-b opacity-45"
        } border-primary flex gap-4 items-center text-primary uppercase border-b-4 text-responsive border-skyblue py-1`}
      >
        {isLoading && (
          <RefreshCw strokeWidth={2.75} className="animate-spin duration-400" />
        )}
        <h1 className="font-medium">Load more</h1>
      </button>
    </div>
  );
};

export default LoadMore;
