/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import CoursePlanComp from "../../components/courses/CoursePlanComp";
import { ArrowBigDown, ArrowBigUp } from "lucide-react";

const CourseInfoCreator = () => {
  const pathname = useLocation().pathname;
  const courseId = pathname.split("/").at(-1);
  const [info, setInfo] = useState([] | null);
  const [viewPlan, setViewPlan] = useState(false);
  

  const getCourseInfoCreator = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + `/course/info/${courseId}`
      );
      setInfo(response.data.info);
    } catch (err) {
      console.error(err);
    }
  };
  const navigate= useNavigate()

  useEffect(() => {
    getCourseInfoCreator();
  }, []);

  return (
    <div className="min-h-[90svh] bg-white dark:bg-[#1D293D]  dark:text-white backdrop-blur-2xl ">
      <Navbar />
      <div className="w-9/12 mx-auto p-2 pb-10 ">
        <div className="flex gap-6 w-11/12 mx-auto  bg-stone-200/50 dark:bg-slate-600/50 p-2 rounded-lg justify-between px-10 mt-20 ">
          <div className="mt-4 flex flex-col justify-between pb-6 flex-1">
            <div className="flex flex-col">
              <p className="text-4xl bg-stone-300 dark:bg-stone-700 ring-stone-400/50 ring w-fit p-2 rounded-lg dark:text-shadow font-semibold">
                {info?.title}
              </p>
              <p className="my-6  ml-4 mt-15  dark:bg-stone-700 ring-stone-400/50 ring w-fit p-2 rounded-lg  bg-stone-300 ">
                {info.description}
              </p>
            </div>

            <div
            onClick={()=>{
              navigate(`/creator/course/${courseId}/upload-content`)
            }}
            className="bg-emerald-600/60 w-fit p-2 rounded-full px-4">
              Add content
            </div>
            
          </div>

          <div className=" m-4 ">
            <img
              className="w-90 h-80 rounded-md"
              src={
                info.imageUrl?.includes("http")
                  ? info.imageUrl
                  : "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
              }
              alt=""
            />
          </div>
        </div>

        <div className="bg-stone-300/40  dark:bg-stone-600/30 rounded-lg p w-11/12 mx-auto p-2 mt-15 ">
          <div
            className=" bg-stone-300 dark:bg-stone-800/70  flex items-center justify-between rounded-md w-full mx-auto  p-2 "
            onClick={() => {
              setViewPlan(!viewPlan);
            }}
          >
            <p className=" text-2xl font-mono font-medium">Lecture plan</p>
            {viewPlan ? <ArrowBigUp /> : <ArrowBigDown />}
          </div>

          {viewPlan && (
            <div>
              {info?.chapters?.map((chapter) => (
                <CoursePlanComp key={chapter.number} props={chapter} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseInfoCreator;
