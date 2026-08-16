/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../Secrets/Secrets";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CoursePlanComp from "../components/courses/CoursePlanComp";
import { ArrowBigDown, ArrowBigUp, IndianRupee, X } from "lucide-react";
import { useSelector } from "react-redux";
import useActiveSession from "../hooks/useActiveSession";
import PayButton from "../app/razorpay/PayButton";

const CourseInfo = () => {
  const pathname = useLocation().pathname;
  const courseId = pathname.split("/").at(-1);
  const [info, setInfo] = useState([] | null);

  const { jwt } = useActiveSession();

  const userCourses = useSelector((state) => state.userCourses);

  const [purchased, setPurchased] = useState(false);
  const [payPopup, setPayPopup] = useState(false);

  const [viewPlan, setViewPlan] = useState(false);
  const navigate = useNavigate();

  const handlePaymentPopup = async () => {
    setPayPopup(true);
  };

  const getPurchaseStatus = async () => {
    const bought = userCourses.find((course) => course._id === courseId);
    if (bought) {
      setPurchased(true);
    } else {
      setPurchased(false);
    }
  };

  const getCourseInfo = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + `/course/info/${courseId}`
      );
      setInfo(response.data.info);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getCourseInfo();
    getPurchaseStatus();
  }, [payPopup]);

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      {payPopup && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-ink/40 backdrop-blur-sm">
          <div className="card flex w-[360px] flex-col p-6">
            <div className="flex items-start justify-between">
              <div className="font-display text-lg font-semibold">
                {info?.title}
              </div>
              <button
                className="flex h-8 w-8 items-center justify-center rounded-md text-ink-soft hover:bg-surface-2"
                onClick={() => setPayPopup(false)}
              >
                <X className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-4 flex items-center gap-1 rounded-md bg-app px-3 py-2 font-semibold text-primary">
              <IndianRupee className="h-4 w-4" />
              {info?.price}
            </div>
            <div className="mt-5 flex gap-3">
              <div className="flex-1">
                <PayButton courseId={courseId} setPayPopup={setPayPopup} />
              </div>
              <button
                className="btn btn-ghost flex-1"
                onClick={() => {
                  setPayPopup(!payPopup);
                }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      <Navbar />
      <div className="mx-auto w-11/12 max-w-6xl pb-16 pt-28">
        <div className="card flex flex-col justify-between gap-8 p-6 md:flex-row md:px-10">
          <div className="flex flex-1 flex-col justify-between pb-2">
            <div className="flex flex-col">
              <p className="font-display w-fit rounded-md bg-app px-3 py-2 text-2xl font-bold md:text-3xl">
                {info?.title}
              </p>
              <p className="mt-4 w-fit rounded-md bg-app px-3 py-2 leading-relaxed text-ink-soft">
                {info?.description}
              </p>
            </div>
            <div className="mt-6">
              {!purchased ? (
                <div className="flex flex-col gap-3">
                  <div className="flex w-fit items-center gap-1 rounded-md border border-primary/30 bg-primary-soft px-3 py-1.5 text-lg font-bold text-primary">
                    <IndianRupee className="h-4 w-4" />
                    {info?.price}
                  </div>
                  <button
                    onClick={() => {
                      handlePaymentPopup();
                    }}
                    className="btn btn-primary w-fit px-8"
                  >
                    Buy Now
                  </button>
                </div>
              ) : (
                <div className="flex flex-col">
                  <button
                    onClick={() => {
                      navigate(`/learn/${courseId}`);
                    }}
                    className="btn btn-primary w-fit px-8"
                  >
                    Start Learning
                  </button>
                </div>
              )}
            </div>
          </div>

          <div className="shrink-0">
            <img
              className="h-64 w-full rounded-md border border-border object-cover md:h-80 md:w-96"
              src={
                info?.imageUrl?.includes("http")
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

export default CourseInfo;
