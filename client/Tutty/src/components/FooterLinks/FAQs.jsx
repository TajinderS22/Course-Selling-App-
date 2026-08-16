import React, { useState } from "react";
import Navbar from "../Navbar";
import { ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  {
    question: "What is Tutty?",
    answer:
      "Tutty is an online platform that allows creators to sell courses and users to purchase and learn from them.",
  },
  {
    question: "How do I create a course?",
    answer:
      "To create a course, you need to sign up as a creator. Once you have a creator account, you can access the creator dashboard to create and manage your courses.",
  },
  {
    question: "How do I buy a course?",
    answer:
      "You can browse the available courses on our platform. Once you find a course you like, you can purchase it through our secure payment gateway.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept various payment methods, including credit/debit cards and other popular online payment options.",
  },
  {
    question: "Can I get a refund for a course I purchased?",
    answer:
      "Our refund policy depends on the course and the creator. Please check the refund policy for each course before making a purchase.",
  },
];

const FaqItem = ({ faq }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-border py-4">
      <button
        className="flex w-full items-center justify-between text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="font-medium">{faq.question}</span>
        <span className="text-ink-soft">
          {isOpen ? (
            <ChevronUp className="h-5 w-5" />
          ) : (
            <ChevronDown className="h-5 w-5" />
          )}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-ink-soft">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="p-6">
        <div className="card mx-auto mt-24 max-w-4xl p-8 md:p-10">
          <h1 className="font-display mb-6 text-center text-3xl font-bold md:text-4xl">
            Frequently Asked Questions
          </h1>
          <div className="space-y-1">
            {faqs.map((faq, index) => (
              <FaqItem key={index} faq={faq} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FAQs;
