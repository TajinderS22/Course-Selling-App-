import React, { useContext, useEffect, useState } from "react";
import Navbar from "./Navbar";
import { useNavigate } from "react-router";
import axios from "axios";
import CourseCard from "./CourseCard";
import CardShimmer from "./CardShimmer";
import { SERVER_ADDRESS } from "../Secrets/Secrets";
import { AppContext } from "../context/AppContext";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../store/slices/userSlice";
import useActiveSession from "../hooks/useActiveSession";

const BuyCourse = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.user);

  const { jwt } = useActiveSession();
  const navigate = useNavigate();
  const [courses, setCourses] = useState("");
  const { isCreator } = useContext(AppContext);

  const getAllCourses = async () => {
    const response = await axios.get(SERVER_ADDRESS + "/course/preview");
    setCourses(response?.data?.courses);
  };

  const ifSessionActive = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/user/verify",
        {},
        {
          headers: {
            authorization: jwt,
          },
        }
      );

      const user = response.data.user;
      if (response.status == 200) {
        dispatch(setUser(user));
      } else {
        dispatch(setUser(null));
        navigate("/authentication");
      }
    } catch (error) {
      console.error(error);
      setUser(false);
      navigate("/authentication");
    }
  };

  useEffect(() => {
    if (jwt) {
      if (isCreator) {
        navigate("/creator/Authentication");
      }
      if (!user && jwt) {
        ifSessionActive();
      }
      getAllCourses();
    } else {
      navigate("/authentication");
    }
  }, [user, jwt]);

  return (
    <div className="min-h-svh bg-app pb-6 text-ink">
      <Navbar />

      {courses ? (
        <div className="h-fit min-h-[800px] px-4 pt-28 md:px-8">
          <p className="font-display mx-auto mb-4 w-11/12 text-center text-2xl font-bold text-ink lg:text-3xl">
            Buy from a wide range of courses{" "}
            <span className="text-gradient">covering all fields.</span>
          </p>
          <div className="mx-auto grid justify-center gap-2 md:grid-cols-2 md:px-14 xl:grid-cols-3">
            {courses.map((x) => {
              return <CourseCard key={x._id} data={x} />;
            })}
          </div>
        </div>
      ) : (
        <div className="mx-auto h-fit min-h-[800px] bg-app pt-28">
          <div className="mx-auto grid w-10/12 justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
            <CardShimmer />
          </div>
        </div>
      )}
    </div>
  );
};

export default BuyCourse;
