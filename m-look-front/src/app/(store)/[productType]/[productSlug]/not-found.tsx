"use client";

import React from "react";
import { AlertCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export default function ProductNotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg max-w-md">
        <AlertCircle className="w-16 h-16 text-red-500 mb-4" />
        <h1 className="text-2xl font-semibold text-gray-800 mb-2">
          {"Mahsulot topilmadi!"}
        </h1>
        <p className="text-gray-600 text-center">
          {"Uzr, siz qidirayotgan mahsulot mavjud emas yoki o'chirilgan."}
        </p>
        <button
          onClick={() => router.back()}
          className="mt-6 px-4 py-2 bg-blue-500 text-white rounded-md shadow hover:bg-blue-600"
        >
          Ortga qaytish
        </button>
      </div>
    </div>
  );
}
