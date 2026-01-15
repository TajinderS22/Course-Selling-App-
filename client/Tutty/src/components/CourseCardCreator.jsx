/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";

import { useSelector } from "react-redux";
import useActiveSessionCreator from "../hooks/useActiveSessionCreator";

const CourseCard = ({ data }) => {
  const { isCreator } = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPagePath = location.pathname; // e.g., "/products", "/about"

  const user = useSelector((state) => state.user);
  const creator = useSelector((state) => state.creator);
  const userCourses = useSelector((state) => state.userCourses);
  const [courseBought, setCourseBought] = useState(false);


  const { jwtCreator } = useActiveSessionCreator();

  const checkBought = async () => {
    const bought = userCourses?.find((course) => course?._id === data._id);
    if (bought) {
      setCourseBought(true);
    }
  };

  useEffect(() => {
    if (user) {
      checkBought();
    }
  }, [userCourses]);

  const [imageUrl, setImageUrl] = useState(
    "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
  );

  
  useEffect(() => {
    if (data?.imageUrl && data.imageUrl.includes("https://")) {
      setImageUrl(data?.imageUrl);
    }
  }, [imageUrl]);

  return (
    <div
      key={data._id}
      className="bg-[#56DFCF]/40  dark:bg-slate-950/30 md:min-w-[350px] max-w-[416px] min-w-[200px] flex flex-col  justify-between  mt-14 min-h-[250px]  max-h-[800px] rounded-xl m-2 p-2 hover:shadow-2xl hover:scale-100 transform ease-in-out duration-300 shadow-[#024240] dark:shadow-amber-200/30 ring ring-slate-600/40 dark:ring-[#56dfcf]/40       "
    >
      <img
        className="w-11/12 h-[250px] rounded-t-xl mx-auto max-w-[400px]"
        loading="lazy"
        src={imageUrl}
        alt="Course Image"
      />
      <div className="text-xl font-semibold mx-3 ">{data.title}</div>
      <p className=" mx-3 overflow-hidden max-w-[350px] ml-4 max-h-[500px] ">
        {data.description}
      </p>
      <p className="text-xl font-bold mt-4 mx-3">{data.price}</p>
      {!isCreator ? (
        <div className="flex w-full justify-between p-2 px-6 ">
          <button className="bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl ">
            {user && courseBought ? (
              <div
                onClick={() => {
                  navigate(`/learn/${data._id}`);
                }}
              >
                Start Learning
              </div>
            ) : (
              <div
                onClick={() => {
                  navigate(`/course/${data._id}`);
                }}
              >
                Buy Now
              </div>
            )}
          </button>
          <button
            className="bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl "
            onClick={() => {
              navigate(`/course/${data._id}`);
            }}
          >
            More Details
          </button>
        </div>
      ) : (
        <div className="flex w-full justify-between p-2 px-6">
          {creator?._id == data?.creatorId ? (
            <button
              className="bg-[#0ABAB5]/80 w-[40%] p-2 rounded-2xl "
              onClick={() => {
                navigate(`/creator/edit/course/${data._id}`);
              }}
            >
              Edit
            </button>
          ) : null}
          <button
            className="bg-[#c1caca]/80 w-[40%] p-2 rounded-2xl "
            onClick={() => {
              if (creator) {
                navigate(`/creator/course/${data._id}`);
              } else {
                navigate(`/course/${data._id}`);
              }
            }}
          >
            More Details
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
