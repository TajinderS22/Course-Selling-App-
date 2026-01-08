/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from "react";
import Navbar from "../../components/Navbar";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router";
import axios from "axios";
import CreatorContainer from "./CreatorContainer";
import { AppContext } from "../../context/AppContext";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, setCreator } from "../../store/slices/creatorSlice";

const Dashboard = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.creator);
  const jwt = localStorage.getItem("jwtCreator");
  const { setIsCreator } = useContext(AppContext);
  const navigate = useNavigate();
  const ifSessionActive = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/creator/verify",
        {},
        {
          headers: {
            authorization: jwt,
          },
        }
      );
      const user = response?.data?.user;

      if (response.status === 200) {
        dispatch(setCreator(user));
      } else {
        dispatch(clearCreator());
        navigate("/creator/authentication");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      dispatch(clearCreator());
      navigate("/creator/authentication");
    }
  };

  useEffect(() => {
    setIsCreator(true);
    if (!user) {
      ifSessionActive();
    }
  }, [user]);

  return (
    <div className="h-fit min-h-[90svh]">
      <Navbar></Navbar>
      <div className="flex h-fit min-h-[95svh]">
        <div className="not-md:hidden ">
          <Sidebar></Sidebar>
        </div>
        <div className="overflow-y-scroll h-full w-full">
          <CreatorContainer />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
