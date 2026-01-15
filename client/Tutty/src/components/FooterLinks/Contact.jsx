import React from "react";
import Navbar from "../Navbar";

const Contact = () => {
  return (
    <div className="min-h-screen bg-gray-100 dark:bg-slate-900">
      <Navbar />
      <div className="flex items-center justify-center p-8">
        <div className="max-w-4xl w-full mx-auto bg-white dark:bg-slate-800 p-10 rounded-lg shadow-lg mt-16">
          <h1 className="text-4xl font-bold text-gray-800 dark:text-white mb-6 text-center">
            Contact Us
          </h1>
          <p className="text-gray-700 dark:text-gray-300 text-center mb-8">
            Have questions? We'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-[#0ABAB5] focus:border-[#0ABAB5] text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-[#0ABAB5] focus:border-[#0ABAB5] text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="mt-1 block w-full px-3 py-2 bg-white dark:bg-slate-700 border border-gray-300 dark:border-slate-600 rounded-md shadow-sm focus:outline-none focus:ring-[#0ABAB5] focus:border-[#0ABAB5] text-gray-900 dark:text-white"
                  ></textarea>
                </div>
                <div className="text-center">
                  <button
                    type="submit"
                    className="w-full py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#0ABAB5] hover:bg-[#09a29e] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#0ABAB5]"
                  >
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col">
              <h2 className="text-2xl font-semibold text-gray-800 dark:text-white mb-4">
                Contact Information
              </h2>
              <div className="text-gray-700 dark:text-gray-300 space-y-4">
                <p>
                  <strong>Address:</strong> 123 Tutty Lane, Education City, 12345
                </p>
                <p>
                  <strong>Email:</strong> singhtajinder0547@gmail.com
                </p>
                <p>
                  <strong>Phone:</strong> (123) 456-7890
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;