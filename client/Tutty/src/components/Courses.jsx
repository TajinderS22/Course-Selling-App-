/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import axios from "axios";
import CourseCard from "./CourseCard";
import { SERVER_ADDRESS } from "../Secrets/Secrets";
import { Loader2 } from "lucide-react";
import { useNavigate } from "react-router";

const Courses = () => {
  const [allCourses, setAllCourses] = useState(null);
  useEffect(() => {
    try {
      const getAllCourses = async () => {
        const response = await axios.get(SERVER_ADDRESS + "/course/preview");
        const courses = response.data.courses;
        setAllCourses(courses.slice(0, 3));
      };
      getAllCourses();
    } catch (error) {
      console.error("couldn't get courses ", error);
    }
  }, []);

  const navigate = useNavigate();

  if (!allCourses) {
    return (
      <div className="mx-auto flex h-fit w-11/12 justify-center pb-8 pt-16">
        <Loader2 className="h-12 w-12 animate-spin text-primary" />
      </div>
    );
  }

  return (
    <div className="mx-auto h-fit w-11/12 pb-16 pt-10">
      <div className="grid justify-center gap-2 md:grid-cols-3">
        {allCourses.map((course, index) => {
          return (
            <div
              key={index}
              className="transition duration-200 hover:scale-[1.02]"
            >
              <CourseCard data={course} />
            </div>
          );
        })}
      </div>
      <div className="mt-8 text-center">
        <button
          className="btn btn-secondary px-8"
          onClick={() => {
            navigate(`/buyCourse`);
          }}
        >
          View all courses
        </button>
      </div>
    </div>
  );
};
export default Courses;
