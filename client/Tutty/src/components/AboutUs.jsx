import React from "react";
import Navbar from "./Navbar";

const AboutUs = () => {
  return (
    <div className="min-h-svh bg-app text-ink">
      <Navbar />
      <div className="mx-auto w-11/12 max-w-5xl pb-16 pt-28">
        <div className="card card-hover p-8 md:p-10">
          <p className="font-display text-3xl font-bold md:text-4xl">
            📘 About Us | Tutty
          </p>
          <p className="mt-3 font-medium text-primary">
            Welcome to Tutty — Your Gateway to Smarter Learning.
          </p>
          <p className="mt-6 text-lg leading-relaxed text-ink-soft md:w-10/12">
            At Tutty, we're on a mission to make high-quality education
            accessible, affordable, and engaging for every learner. Whether
            you're a student preparing for competitive exams, a professional
            upgrading your skills, or someone curious to learn something new —
            Tutty is here to support your journey.
          </p>
        </div>

        <div className="card card-hover mt-10 border-secondary/40 bg-secondary-soft p-8 md:p-10">
          <p className="font-display text-3xl font-bold md:text-4xl">
            🎯 What We Do
          </p>
          <p className="mt-3 font-medium text-ink-soft">
            Tutty is a modern learning platform designed to bridge the gap
            between expert instructors and motivated learners. We offer:
          </p>
          <ul className="mt-5 space-y-2.5">
            <li className="text-lg">
              <span className="font-bold">🎓 Expert-led courses</span> in
              technology, business, personal development, and more
            </li>
            <li className="text-lg">
              <span className="font-bold">🧠 Bite-sized lessons</span> to fit
              your busy schedule
            </li>
            <li className="text-lg">
              📱 A clean, mobile-first experience — learn anywhere, anytime
            </li>
            <li className="text-lg">
              <span className="font-bold">🛒 Simple purchasing & lifetime</span>{" "}
              access to your courses
            </li>
            <li className="text-lg">
              ✅ Secure authentication and personalized dashboard
            </li>
          </ul>
        </div>

        <div className="card card-hover mt-10 p-8 md:p-10">
          <p className="font-display text-3xl font-bold md:text-4xl">
            💡 Why Tutty?
          </p>
          <ul className="mt-5 space-y-2.5">
            <li className="text-lg">
              <span className="font-bold">Built for learners</span> by a team
              who understands how education should work
            </li>
            <li className="text-lg">
              <span className="font-bold">Seamless user experience</span> —
              fast, intuitive, and clutter-free
            </li>
            <li className="text-lg">
              <span className="font-bold">Community-first:</span> We're not just
              a platform, we're a tribe of learners
            </li>
            <li className="text-lg">
              <span className="font-bold">No fluff. Just value.</span> Your time
              and attention matter to us
            </li>
          </ul>
        </div>

        <div className="card card-hover mt-10 border-primary/30 bg-primary-soft p-8 md:p-10">
          <p className="font-display text-3xl font-bold md:text-4xl">
            🔐 Trusted & Secure
          </p>
          <p className="mt-5 text-lg leading-relaxed text-ink-soft md:w-11/12">
            Tutty uses industry-standard security protocols to ensure your
            personal data and learning progress are safe. Your trust is
            everything.
          </p>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
