"use client";

import Link from "next/link";
import { Home } from "lucide-react";

const NotFoundPage = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen text-center bg-gray-100">
      <h1 className="text-6xl font-bold text-blue-600 mb-4">404</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mb-2">
        {"Sahifa topilmadi"}
      </h2>
      <p className="text-gray-600 mb-6">
        {"Kiritilgan URL bo'yicha hech narsa topilmadi."}
      </p>
      <Link
        href="/"
        className="flex items-center px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors duration-300"
      >
        <Home className="mr-2" />
        {"Bosh sahifaga qaytish"}
      </Link>
    </div>
  );
};

export default NotFoundPage;
