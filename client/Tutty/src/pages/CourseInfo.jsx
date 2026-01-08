/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect } from "react";
import { useLocation } from "react-router";
import { SERVER_ADDRESS } from "../Secrets/Secrets";
import { useState } from "react";
import Navbar from "../components/Navbar";
import CoursePlanComp from "../components/courses/CoursePlanComp";
import { ArrowBigDown, ArrowBigUp, IndianRupee } from "lucide-react";
import { useSelector } from "react-redux";
import useActiveSession from "../hooks/useActiveSession";
import PayButton from "../app/razorpay/PayButton";

const CourseInfo = () => {
  const pathname = useLocation().pathname;
  const courseId = pathname.split("/").at(-1);
  const [info, setInfo] = useState([] | null);
  
  // const jwt=localStorage.getItem("jwt")
  const jwt = useActiveSession();


  const userCourses = useSelector((state) => state.userCourses);

  const [purchased, setPurchased] = useState(false);
  const [payPopup,setPayPopup]=useState(false)
 

  const [viewPlan, setViewPlan] = useState(false);

  const checkPurchaseStatus = async () => {
    if (userCourses?.includes(courseId)) {
      return 
    };
    try {
      const status = await axios.post(
        SERVER_ADDRESS + "/course/purchase/status",
        {
          courseId,
        },
        {
          headers: {
            authorization: jwt,
          },
        }
      );
  
      setPurchased(status.data.orderStatus.state ==="COMPLETED");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    checkPurchaseStatus();
  }, [userCourses]);


  const handlePaymentPopup = async () => {
    
   setPayPopup(true)

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
  }, []);

  return (
    <div className="min-h-[90svh] bg-white dark:bg-[#1D293D]  dark:text-white backdrop-blur-2xl ">
      {payPopup && (
        <div className="absolute flex justify-center items-center backdrop-blur-xs bg-emerald-900/20 w-svw h-svh">
          <div className="p-2 rounded-md py-6 flex flex-col w-[350px] h-[200px] dark:bg-stone-100/40 dark:text-black bg-gray-300/90 ring ring-stone-400/50">
            <div className="flex-1 ">
              <div className="ml-3 text-lg font-semibold">{info?.title}</div>
            </div>
            <div className="w-10/12 mx-auto   ">
              <div className=" backdrop-blur-xl ring ring-stone-500/50 bg-black/10 flex gap-1 items-center pr-4 m-2 ml-0 w-fit p-2 rounded-xl">
                <IndianRupee className="h-4 w-4"/>
                <p>{info?.price}</p>
              </div>
              <div className="flex gap-4  ">
                <div className=" w-6/12">
                  <PayButton courseId={courseId} setPayPopup={setPayPopup}  />
                </div>
                <button className="bg-gray-400 ring ring-stone-800 w-6/12 flex-0.5 p-2 rounded-lg" onClick={()=>{
                  setPayPopup(!payPopup)
                }}>close</button>
              </div>
            </div>
          </div>
        </div>
      )}

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
            <div>
              {!purchased
                ? !userCourses?.includes(courseId) && (
                    <div className="flex flex-col">
                      <div className="text-lg m-2 flex gap-1 items-center bg-stone-300 dark:bg-stone-700 ring-stone-400/50 w-fit  py-1 pr-4 pl-2 rounded-xl dark:text-shadow font-semibold ring ">
                        <IndianRupee className="w--4 h-4" />
                        {info?.price}
                      </div>
                      <button
                        onClick={() => {
                          handlePaymentPopup();
                        }}
                        className="bg-emerald-500/60 dark:bg-emerald-800 dark:ring ring-stone-400/50 p-2  w-fit rounded-full px-6"
                      >
                        Buy Now
                      </button>
                    </div>
                  )
                : null}
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

export default CourseInfo;
