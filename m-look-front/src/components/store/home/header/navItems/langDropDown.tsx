"use client";

import { ChevronDown } from "lucide-react";
import { useState, useEffect, useRef } from "react";

const LanguageDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  const dropdownRef = useRef<HTMLDivElement>(null);
  const languages = ["English", "Uzbek", "Russian", "Spanish"];

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as Node)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div
      ref={dropdownRef}
      className="relative inline-block text-sm md:text-lg lg:text-xl"
    >
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="flex text-dark items-center gap-2 py-1 pr-8 rounded-md"
      >
        {selectedLanguage}
        <ChevronDown
          className={`w-4 transition-transform ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        />
      </button>
      {isOpen && (
        <ul className="absolute w-full rounded-md bg-white shadow-lg border transition-all duration-300">
          {languages.map((language) => (
            <li
              key={language}
              className="text-dark cursor-pointer hover:bg-slate-200 px-2 py-1"
              onClick={() => {
                setSelectedLanguage(language);
                setIsOpen(false);
              }}
            >
              {language}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default LanguageDropdown;
