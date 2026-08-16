import React from "react";
import Navbar from "../Navbar";
import Courses from "../Courses";
import HomePageChooseUs from "./HomePageChooseUs";
import HomePageCategories from "./HomePageCategories";
import { Link } from "react-router";
import { ArrowRight, Sparkles } from "lucide-react";

const Home = () => {
  return (
    <div className="mx-auto min-h-[100svh] bg-app text-ink">
      <Navbar />

      {/* Hero */}
      <div className="grid-dots relative overflow-hidden">
        <div className="pointer-events-none absolute -top-40 left-1/2 h-[420px] w-[720px] -translate-x-1/2 rounded-md bg-primary-soft opacity-60 blur-3xl dark:opacity-30" />
        <div className="pointer-events-none absolute -right-32 top-64 h-[380px] w-[380px] rounded-md bg-secondary-soft opacity-60 blur-3xl dark:opacity-25" />

        <div className="relative mx-auto flex max-w-7xl flex-col-reverse items-center justify-between gap-10 px-6 pb-16 pt-28 md:flex-row md:pt-36 lg:px-10">
          <div className="max-w-[600px] flex-1 text-center md:text-left">
            <span className="pill mb-6">
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              100+ job-focused courses
            </span>
            <p className="font-display text-4xl font-extrabold leading-[1.1] tracking-tight md:text-6xl">
              Shape Your Future with{" "}
              <span className="text-gradient">Expert-Led Courses</span>
            </p>
            <p className="mx-auto mt-6 max-w-md text-base leading-relaxed text-ink-soft md:mx-0 md:text-lg">
              Kickstart your career with high-quality, job-focused courses.
              Learn at your pace, anytime, anywhere.
            </p>
            <div className="mt-8 flex flex-col items-center gap-3 md:flex-row md:items-start">
              <Link to="/authentication">
                <button className="btn btn-primary px-7 py-3">
                  Start your Journey
                  <ArrowRight className="h-4 w-4" />
                </button>
              </Link>
              <Link to="/courses">
                <button className="btn btn-ghost px-7 py-3">
                  Browse Courses
                </button>
              </Link>
            </div>
          </div>

          <div className="relative shrink-0">
            <div className="absolute -inset-3 rounded-md bg-gradient-to-tr from-primary/30 to-secondary/30 opacity-60 blur-2xl" />
            <img
              className="relative h-72 w-72 rounded-md border border-border object-cover shadow-lift md:h-[380px] md:w-[420px] lg:h-[420px] lg:w-[520px]"
              src="https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg"
              alt="Landing"
            />
          </div>
        </div>
      </div>

      {/* Courses Preview */}
      <div className="mx-auto w-11/12">
        <div className="card mx-auto mb-4 max-w-3xl border-none bg-gradient-to-r from-primary-soft to-secondary-soft p-6 text-center">
          <p className="font-display text-2xl font-bold text-ink md:text-4xl">
            Browse All Courses
          </p>
        </div>
        <Courses />
      </div>

      <HomePageChooseUs />
      <HomePageCategories />
    </div>
  );
};

export default Home;
