/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import { useSelector } from "react-redux";
import useActiveSession from "../hooks/useActiveSession";
import { BookOpen, IndianRupee } from "lucide-react";

const CourseCard = ({ data }) => {
  const { isCreator } = useContext(AppContext);
  const navigate = useNavigate();

  const location = useLocation();
  const currentPagePath = location.pathname;

  const user = useSelector((state) => state.user);
  const creator = useSelector((state) => state.creator);
  const userCourses = useSelector((state) => state.userCourses);
  const [courseBought, setCourseBought] = useState(false);

  const { jwt } = useActiveSession();

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

  const buyCourse = async () => {
    const courseId = data._id;

    try {
      const response = await axios.post(
        "http://localhost:3000/course/purchase",
        { courseId },
        {
          headers: {
            authorization: jwt,
          },
        }
      );

      alert(response?.data?.message);
      if (response?.data?.message == "course already purchased") {
        return;
      }
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    if (data?.imageUrl && data.imageUrl.includes("https://")) {
      setImageUrl(data?.imageUrl);
    }
  }, [imageUrl]);

  return (
    <div
      key={data._id}
      className="card card-hover m-2 flex min-h-[250px] w-full min-w-[200px] max-w-[416px] flex-col justify-between p-3 md:min-w-[350px]"
    >
      <img
        className="mx-auto h-[220px] w-full rounded-md object-cover"
        loading="lazy"
        src={imageUrl}
        alt="Course Image"
      />
      <div className="mx-1 mt-3 flex items-center gap-2">
        <BookOpen className="h-4 w-4 shrink-0 text-primary" />
        <span className="font-display truncate text-lg font-bold">
          {data.title}
        </span>
      </div>
      <p className="mx-1 mt-1 line-clamp-2 max-w-[350px] text-sm leading-relaxed text-ink-soft">
        {data.description}
      </p>
      <p className="mx-1 mt-3 flex items-center gap-1 text-xl font-bold text-primary">
        <IndianRupee className="h-4 w-4" />
        {data.price}
      </p>
      {!isCreator ? (
        <div className="mt-3 flex w-full gap-2 px-1 pb-1">
          <button
            className="btn btn-primary flex-1"
            onClick={() => {
              if (user && courseBought) {
                navigate(`/learn/${data._id}`);
              } else {
                navigate(`/course/${data._id}`);
              }
            }}
          >
            {user && courseBought ? "Start Learning" : "Buy Now"}
          </button>
          <button
            className="btn btn-ghost flex-1"
            onClick={() => {
              navigate(`/course/${data._id}`);
            }}
          >
            Details
          </button>
        </div>
      ) : (
        <div className="mt-3 flex w-full gap-2 px-1 pb-1">
          {creator?._id == data?.creatorId ? (
            <button
              className="btn btn-primary flex-1"
              onClick={() => {
                navigate(`/creator/edit/course/${data._id}`);
              }}
            >
              Edit
            </button>
          ) : null}
          <button
            className="btn btn-ghost flex-1"
            onClick={() => {
              if (creator) {
                navigate(`/creator/course/${data._id}`);
              } else {
                navigate(`/course/${data._id}`);
              }
            }}
          >
            Details
          </button>
        </div>
      )}
    </div>
  );
};

export default CourseCard;
