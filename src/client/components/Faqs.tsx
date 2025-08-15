// app/faqs/page.tsx or inside your component
"use client";

import React, { useEffect, useRef } from "react";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import gsap from "gsap";
import { faqData } from "@/client/utils/faqs"
import { useGSAP } from "@gsap/react";

export default function Faqs() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    gsap.fromTo(
      sectionRef.current,
      { opacity: 0, y: 50 },
      { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
    );
  }, []);

  return (
    <section
      id="faqs"
      ref={sectionRef}
      className="text-white py-16 px-6"
    >
      <div className="max-w-3xl mx-auto">
        <h2 className="text-4xl font-bold text-amber-500 mb-8 text-center">FAQs</h2>
        <Accordion type="single" collapsible className="space-y-4">
          {faqData.map((faq, idx) => (
            <AccordionItem
              key={idx}
              value={`item-${idx}`}
              className="bg-amber-200/5 border border-amber-500 rounded-lg overflow-hidden"
            >
              <AccordionTrigger className="px-4 py-3 text-lg font-semibold text-amber-400 hover:text-amber-300">
                {faq.question}
              </AccordionTrigger>
              <AccordionContent className="px-4 pb-4 text-amber-100 text-base">
                {faq.answer}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
