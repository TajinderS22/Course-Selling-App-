import React from "react";

const HomePageCategories = () => {
  const categories = [
    "Web Development",
    "Data Science & AI",
    "Cloud & DevOps",
    "UI/UX Design",
    "Digital Marketing",
    "Business & Finance",
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 pb-16">
      <p className="font-display mt-16 mb-10 text-center text-4xl font-bold md:text-5xl">
        Explore Categories
      </p>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((cat, i) => (
          <div
            key={i}
            className="card card-hover flex items-center justify-between p-5"
          >
            <span className="font-medium">{cat}</span>
            <span className="text-primary">→</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageCategories;
