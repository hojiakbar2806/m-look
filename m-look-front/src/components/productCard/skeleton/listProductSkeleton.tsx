import React from "react";
import ProductsWrapper from "../ProductWrapper";

const ListProductSkeleton = ({ size = 8 }) => {
  return (
    <ProductsWrapper view="list">
      {[...Array(size)].map((_, i) => (
        <div
          key={i}
          className="group w-full overflow-hidden p-3 md:p-4 flex gap-3 md:gap-6 rounded-lg bg-slate-100 hover:bg-slate-50 transition-all duration-300 flex-col sm:flex-row"
        >
          <div className="relative overflow-hidden rounded-lg">
            <div className="bg-gradient-to-r from-slate-200 via-slate-100 to-slate-200 h-48 sm:h-32 md:h-40 aspect-[1/1] sm:aspect-[1/3] w-full sm:w-48 md:w-56 rounded-lg animate-pulse" />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-shimmer" />
          </div>

          <div className="flex-1 flex flex-col gap-3 py-1 justify-between">
            <div className="space-y-3">
              <div className="flex flex-col gap-2">
                <div className="h-6 bg-slate-200 rounded-md w-3/4 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md w-1/2 animate-pulse" />
              </div>

              <div className="space-y-2">
                <div className="h-3 bg-slate-200 rounded-md w-full animate-pulse" />
                <div className="h-3 bg-slate-200 rounded-md w-11/12 animate-pulse" />
                <div className="h-3 bg-slate-200 rounded-md w-4/5 animate-pulse" />
              </div>
            </div>

            <div className="flex items-center justify-between mt-4">
              <div className="space-y-2">
                <div className="h-5 bg-slate-200 rounded-md w-24 animate-pulse" />
                <div className="h-4 bg-slate-200 rounded-md w-16 animate-pulse" />
              </div>

              <div className="flex gap-2">
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
                <div className="w-10 h-10 bg-slate-200 rounded-lg animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      ))}
    </ProductsWrapper>
  );
};

export default ListProductSkeleton;
