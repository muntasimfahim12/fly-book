"use client";

import React, { useState } from "react";
import { IconPlus, IconMinus } from "@tabler/icons-react";

const FAQSection = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "1. Can I get air tickets on Shohoz?",
      answer: "Yes! Now you can book air tickets through our website, app or call center. We can assure you an unparalleled ticket purchase and priority support experience.",
    },
    { question: "2. Is there any time frame to buy a ticket?", answer: "Tickets can be booked up to 24 hours before departure depending on availability." },
    { question: "3. How do I pay for my air tickets?", answer: "You can pay via bKash, Nagad, or any debit/credit card." },
    { question: "4. Can I make changes to my booking?", answer: "Yes, changes can be made through our support center subject to airline policies." },
    { question: "5. What happens if my flight is delayed or canceled?", answer: "We will notify you immediately and assist with rescheduling or refunds as per airline rules." },
  ];

  return (
    <section className="bg-[#2E7D52] py-20 text-white font-sans mt-12 ">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
        
        {/* Left Side: Header */}
        <div className="space-y-6">
          <h2 className="text-4xl md:text-5xl font-bold leading-tight">
            Got Questions ? <br />
            We’ve Got Answers
          </h2>
          <p className="text-lg opacity-80 max-w-md leading-relaxed">
            We are always happy to hear from you. If you have any questions, suggestions or opinions, please do not hesitate to reach out to us.
          </p>
          <button className="mt-4 bg-white text-[#2E7D52] px-10 py-3 rounded-xl font-bold hover:bg-gray-100 transition shadow-lg">
            Contact Us
          </button>
        </div>

        {/* Right Side: Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="border-b border-white/20 pb-4">
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full flex justify-between items-center py-3 text-left hover:opacity-80 transition"
              >
                <span className="text-xl font-bold">{faq.question}</span>
                {openIndex === index ? <IconMinus size={24} /> : <IconPlus size={24} />}
              </button>
              
              <div className={`overflow-hidden transition-all duration-300 ${openIndex === index ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'}`}>
                <p className="text-[15px] leading-relaxed opacity-90">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;