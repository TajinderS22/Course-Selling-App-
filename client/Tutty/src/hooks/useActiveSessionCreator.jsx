/* eslint-disable no-unused-vars */
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, setCreator } from "../store/slices/creatorSlice";
import { SERVER_ADDRESS } from "../Secrets/Secrets";
import axios from "axios";
import { useNavigate } from "react-router";
import { useState } from "react";

const useActiveSessionCreator = () => {
  const creator = useSelector((state) => state.creator);
  const dispatch = useDispatch();
  const jwtCreator = localStorage.getItem("jwtCreator");
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

 
  if(jwtCreator){
    localStorage.removeItem("jwt")
  }


  const ifSessionActive = async () => {
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/creator/verify",
        {},
        {
          headers: {
            authorization: jwtCreator,
          },
        }
      );
      const creator = response.data.user;
      if (response.status == 200) {
        dispatch(setCreator(creator));
      } else {
        dispatch(clearCreator());
        navigate("/creator/authentication");
      }
    } catch (err) {
      console.error("Session check failed:", err);
      dispatch(clearCreator());
      navigate("/creator/authentication");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!creator && jwtCreator) {
      ifSessionActive();
    } else if (!jwtCreator) {
      dispatch(clearCreator());
      navigate("/creator/authentication");
    } else if (creator) {
  
      setLoading(false);
    }
  }, [creator, jwtCreator]);

  return { loading, jwtCreator, setLoading };
};

export default useActiveSessionCreator;
