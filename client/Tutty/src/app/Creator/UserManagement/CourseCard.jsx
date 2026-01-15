import React, { useState } from "react";
import { useNavigate } from "react-router";

const CourseCard = ({ course }) => {
    const [hovered, setHovered] = useState(false);
    const navigate=useNavigate()
  return (
    <div
      className={`bg-slate-300/80 dark:bg-slate-600 hover:bg-slate-400/60 hover:scale-102
        transition-all justify-between flex gap-2 m-2 p-2 min-h-20 rounded-lg md:w-8/12 md:ml-12
        duration-300 ease-in-out`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onClick={()=>{
        navigate(`/creator/user-management/${course._id}`)
      }}
    >
      <div>
        <p>{course.title}</p>
        <p>{course.description}</p>
      </div>
      <div className="w-50">
        <img className={`w-full rounded-lg ${hovered&&"scale-110 opacity-85 "} duration-500  `} src={course.imageUrl} alt="" />
      </div>
    </div>
  );
};

export default CourseCard;
