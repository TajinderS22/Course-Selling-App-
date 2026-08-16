import React from "react";
import Navbar from "../Navbar";

const Contact = () => {
  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="flex items-center justify-center p-6">
        <div className="card mx-auto mt-24 w-full max-w-4xl p-8 md:p-10">
          <h1 className="font-display mb-4 text-center text-3xl font-bold md:text-4xl">
            Contact Us
          </h1>
          <p className="mb-8 text-center text-ink-soft">
            Have questions? We'd love to hear from you.
          </p>
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            <div className="flex flex-col">
              <h2 className="font-display mb-4 text-xl font-semibold">
                Get in Touch
              </h2>
              <form className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium"
                  >
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-base mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium"
                  >
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    className="input-base mt-1"
                  />
                </div>
                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows="4"
                    className="input-base mt-1"
                  ></textarea>
                </div>
                <div>
                  <button type="submit" className="btn btn-primary w-full">
                    Send Message
                  </button>
                </div>
              </form>
            </div>
            <div className="flex flex-col">
              <h2 className="font-display mb-4 text-xl font-semibold">
                Contact Information
              </h2>
              <div className="space-y-4 text-ink-soft">
                <p>
                  <strong className="text-ink">Address:</strong> 123 Tutty Lane,
                  Education City, 12345
                </p>
                <p>
                  <strong className="text-ink">Email:</strong>{" "}
                  singhtajinder0547@gmail.com
                </p>
                <p>
                  <strong className="text-ink">Phone:</strong> (123) 456-7890
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
