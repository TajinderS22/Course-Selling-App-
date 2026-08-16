import React from "react";
import Navbar from "../components/Navbar";

const Error = () => {
  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="grid-dots flex h-svh w-full flex-col items-center justify-center px-6 text-center">
        <p className="font-display text-7xl font-extrabold text-gradient md:text-8xl">
          404
        </p>
        <p className="mt-4 text-xl font-semibold md:text-2xl">
          Sorry, this page does not exist.
        </p>
        <a href="/" className="btn btn-primary mt-8">
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default Error;
