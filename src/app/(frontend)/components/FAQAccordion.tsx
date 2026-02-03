"use client";

import { useState } from "react";
import { FAQ } from "@/data";
import { ChevronDownIcon } from "@/assets/icons";

interface FAQAccordionProps {
  faqs: FAQ[];
}

export default function FAQAccordion({ faqs }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-3">
      {faqs.map((faq, i) => {
        const isOpen = openIndex === i;
        return (
          <div
            key={i}
            className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${
              isOpen ? "border-[#e8a838] shadow-md shadow-[#e8a838]/10" : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Question row */}
            <button
              onClick={() => setOpenIndex(isOpen ? null : i)}
              className="w-full flex items-center justify-between px-5 py-4 text-left"
            >
              <span
                className="text-sm font-semibold pr-4 transition-colors duration-200"
                style={{ color: isOpen ? "#e8a838" : "#1a1a2e" }}
              >
                {i + 1}. {faq.question}
              </span>
              <div
                className="flex-shrink-0 w-7 h-7 rounded-full border border-gray-200 flex items-center justify-center transition-all duration-300"
                style={{
                  borderColor: isOpen ? "#e8a838" : undefined,
                  background: isOpen ? "#e8a838" : "transparent",
                  transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
                }}
              >
                <ChevronDownIcon size={14} color={isOpen ? "#fff" : "#6b7280"} />
              </div>
            </button>

            {/* Answer */}
            <div
              className="overflow-hidden transition-all duration-300"
              style={{ maxHeight: isOpen ? 200 : 0, opacity: isOpen ? 1 : 0 }}
            >
              <p className="px-5 pb-4 text-gray-500 text-sm leading-relaxed">
                {faq.answer}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
