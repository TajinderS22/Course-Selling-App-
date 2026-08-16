import React from "react";

const HomePageChooseUs = () => {
  const items = [
    {
      title: "Career-Focused Curriculum",
      desc: "Courses designed to get you hired — fast.",
    },
    {
      title: "Learn from Industry Experts",
      desc: "Our instructors bring real-world experience to the classroom.",
    },
    {
      title: "Learn at Your Own Pace",
      desc: "Lifetime access to all courses. Study whenever, wherever.",
    },
  ];
  return (
    <div className="mx-auto max-w-7xl px-6 pb-8">
      <p className="font-display mt-16 mb-10 text-center text-4xl font-bold md:text-5xl">
        Why Choose Us
      </p>
      <div className="grid gap-5 md:grid-cols-3">
        {items.map((item, i) => (
          <div
            key={i}
            className="card card-hover p-7 text-center"
          >
            <div className="mx-auto mb-4 flex h-11 w-11 items-center justify-center rounded-md bg-primary-soft text-lg font-bold text-primary">
              {i + 1}
            </div>
            <h3 className="font-display text-lg font-bold">{item.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-ink-soft">
              {item.desc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePageChooseUs;
