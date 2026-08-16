import React, { useState } from "react";
import { useNavigate } from "react-router";
import { ChevronRight } from "lucide-react";

const CourseCard = ({ course }) => {
  const [hovered, setHovered] = useState(false);
  const navigate = useNavigate();
  return (
    <div
      className="card card-hover m-2 flex cursor-pointer items-center gap-4 p-3 md:ml-12 md:w-10/12"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={() => {
        navigate(`/creator/user-management/${course._id}`);
      }}
    >
      <div className="min-w-0 flex-1">
        <p className="font-display truncate font-semibold">{course.title}</p>
        <p className="mt-0.5 line-clamp-2 text-sm text-ink-soft">
          {course.description}
        </p>
      </div>
      <img
        className={`h-14 w-24 shrink-0 rounded-md object-cover transition duration-300 ${
          hovered ? "scale-105 opacity-85" : ""
        }`}
        src={course.imageUrl}
        alt=""
      />
      <ChevronRight className="h-5 w-5 shrink-0 text-ink-soft" />
    </div>
  );
};

export default CourseCard;
