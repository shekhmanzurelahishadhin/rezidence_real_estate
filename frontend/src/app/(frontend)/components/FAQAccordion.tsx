"use client";

import { useState } from "react";
import { FAQ } from "@/data";
import { ChevronDownIcon } from "@/assets/icons";

interface FAQAccordionProps {
  faqs: FAQ[];
  isDarkMode?: boolean;
}

export default function FAQAccordion({ faqs, isDarkMode = false }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen 
                ? `shadow-md ${
                    isDarkMode 
                      ? "border-amber-400 shadow-amber-400/20" 
                      : "border-amber-500 shadow-amber-500/10"
                  }` 
                : `${isDarkMode ? "border-gray-700 hover:border-gray-600" : "border-gray-200 hover:border-gray-300"}`
            } ${isDarkMode ? "bg-gray-800/50" : "bg-white"}`}
          >
            {/* Question row */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left transition-colors duration-300"
            >
              <span
                className={`text-sm font-semibold pr-4 transition-colors duration-300 ${
                  isOpen 
                    ? "text-amber-500" 
                    : isDarkMode ? "text-gray-200" : "text-gray-900"
                }`}
              >
                {i + 1}. {faq.question}
              </span>
              <div
                className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
                  isOpen 
                    ? `${isDarkMode ? "bg-amber-400" : "bg-amber-500"} border-transparent` 
                    : `${isDarkMode ? "border-gray-600" : "border-gray-200"}`
                }`}
                style={{
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <ChevronDownIcon 
                  size={14} 
                  className={isOpen 
                    ? "text-white" 
                    : isDarkMode ? "text-gray-400" : "text-gray-500"
                  } 
                />
              </div>
            </button>

            {/* Answer */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <p className={`px-5 pb-4 leading-relaxed transition-colors duration-300 ${
                isDarkMode ? "text-gray-300" : "text-gray-600"
              }`}>
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}