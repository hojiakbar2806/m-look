"use client";
import { X } from "lucide-react";
// import { useRouter } from "next/router";

const CategoryCard = () => {
  // const router = useRouter();

  return (
    <div className="w-80 h-[calc(100vh-100px)] top-52 sticky bg-slate-200 rounded-lg">
      <button>
        <X strokeWidth={2.75} />
      </button>
    </div>
  );
};

export default CategoryCard;
