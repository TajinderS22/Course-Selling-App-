import React, { useState } from "react";
import Navbar from "../Navbar";

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
    <div className="border-b border-gray-200 dark:border-slate-700 py-4">
      <button
        className="w-full flex justify-between items-center text-left"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="text-lg font-medium text-gray-900 dark:text-white">
          {faq.question}
        </span>
        <span className="text-xl text-gray-500 dark:text-gray-400">
          {isOpen ? "-" : "+"}
        </span>
      </button>
      {isOpen && (
        <div className="mt-4 text-gray-600 dark:text-gray-300">
          <p>{faq.answer}</p>
        </div>
      )}
    </div>
  );
};

const FAQs = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Navbar />
      <div className="p-8">
        <div className="max-w-4xl mx-auto bg-white dark:bg-slate-800 p-10 rounded-lg shadow-lg mt-16">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Frequently Asked Questions
          </h1>
          <div className="space-y-4">
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