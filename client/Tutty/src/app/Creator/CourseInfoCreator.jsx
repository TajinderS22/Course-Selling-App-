/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useState } from "react";
import Navbar from "../../components/Navbar";
import CoursePlanComp from "../../components/courses/CoursePlanComp";
import { ArrowBigDown, ArrowBigUp, Plus } from "lucide-react";

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
  const navigate = useNavigate();

  useEffect(() => {
    getCourseInfoCreator();
  }, []);

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="mx-auto w-11/12 max-w-6xl pb-16 pt-28">
        <div className="card flex flex-col justify-between gap-8 p-6 md:flex-row md:px-10">
          <div className="flex flex-1 flex-col justify-between pb-2">
            <div className="flex flex-col">
              <p className="font-display w-fit rounded-md bg-app px-3 py-2 text-2xl font-bold md:text-3xl">
                {info?.title}
              </p>
              <p className="mt-4 w-fit rounded-md bg-app px-3 py-2 leading-relaxed text-ink-soft">
                {info.description}
              </p>
            </div>

            <button
              onClick={() => {
                navigate(`/creator/course/${courseId}/upload-content`);
              }}
              className="btn btn-primary mt-6 flex w-fit items-center gap-2 px-6"
            >
              <Plus className="h-4 w-4" />
              Add content
            </button>
          </div>

          <div className="shrink-0">
            <img
              className="h-64 w-full rounded-md border border-border object-cover md:h-80 md:w-96"
              src={
                info.imageUrl?.includes("http")
                  ? info.imageUrl
                  : "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
              }
              alt=""
            />
          </div>
        </div>

        <div className="card mt-10 w-full p-3">
          <div
            className="flex cursor-pointer items-center justify-between rounded-md bg-app px-4 py-3"
            onClick={() => {
              setViewPlan(!viewPlan);
            }}
          >
            <p className="font-display text-xl font-semibold">Lecture plan</p>
            {viewPlan ? <ArrowBigUp /> : <ArrowBigDown />}
          </div>

          {viewPlan && (
            <div className="mt-2">
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
