import React, { useContext, useEffect, useState } from "react";
import Navbar from "../../components/Navbar";
import UserContainer from "./UserContainer";
import Sidebar from "../Sidebar";
import { useNavigate } from "react-router";
import axios from "axios";
import { AppContext } from "../../context/AppContext";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../store/slices/userSlice";
import CardShimmer from "../../components/CardShimmer";
import useActiveSession from "../../hooks/useActiveSession";

const Dashboard = () => {
  const user = useSelector((state) => state.user);
  const {jwt} =useActiveSession()
  const { setIsCreator } = useContext(AppContext);
  const [loading, setLoading] = useState(true);


  setIsCreator(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  


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

      if (response.status === 200) {
        dispatch(setUser(user));
      } else {
        dispatch(clearUser());
        navigate("/authentication");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      dispatch(clearUser());
      navigate("/authentication");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!user && jwt) {
      ifSessionActive();
    } else if (!jwt) {
      setLoading(false);
      navigate("/authentication");
    } else if (user) {
      setLoading(false);
    }
  }, [user, jwt]);
  // const isMdUp = useBreakpoint();
  // const [open] = useState(isMdUp);



  return (
    <div className=" h-fit min-h-[100svh] ">
      <Navbar BgColor={""}></Navbar>
      <div className="  flex  min-h-[95svh]   ">
        <div className="hidden md:block">
          <Sidebar></Sidebar>
        </div>
        <div className="overflow-y-scroll h-[full] w-full ">
          {loading ? (
            <CardShimmer />
          ) : (
            <UserContainer></UserContainer>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
