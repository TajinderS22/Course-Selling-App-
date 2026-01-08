/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useRef, useEffect } from "react";
import Navbar from "../../components/Navbar";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator, setCreator } from "../../store/slices/creatorSlice";

const AuthenticationCreator = () => {
  const { onSignup, setOnSignup } = useContext(AppContext);
  const { authenticationMessage, setAuthenticationMessage } =
    useContext(AppContext);
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.creator);
  // eslint-disable-next-line no-unused-vars
  const { isCreator, setIsCreator } = useContext(AppContext);

  useEffect(() => {
    setIsCreator(true);
  }, []);

  const jwtFromStorage = localStorage.getItem("jwtCreator");

  useEffect(() => {
    if (!user && jwtFromStorage) {
      const ifSessionActive = async () => {
        try {
          const response = await axios.post(
            SERVER_ADDRESS + "/creator/verify",
            {},
            {
              headers: {
                authorization: `${jwtFromStorage}`,
              },
            }
          );
          const user = response?.data?.user;
          if (response.status == 200) {
            dispatch(setCreator(user));
            navigate("/creator/dashboard");
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
      ifSessionActive();
    }

    return () => {};
  }, [user, jwtFromStorage]);

  const handleAuthenticationSubmit = () => {
    const firstname = fNameRef.current?.value;
    const lastname = lNameRef.current?.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;

    onSignup
      ? signup({
          firstname,
          lastname,
          email,
          password,
        })
      : login({
          email,
          password,
        });
  };

  const login = async ({ email, password }) => {
    const data = { email, password };
    try {
      const response = await axios.post(
        SERVER_ADDRESS + "/creator/signin",
        data
      );
      if (response.status === 200) {
        const jwtToken = response.data.token;
        localStorage.setItem("jwtCreator", jwtToken);
        dispatch(setCreator(response.data.user));
        navigate("/creator/dashboard");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      setAuthenticationMessage(msg);
      console.error("Login error:", msg);
    }
  };

  const signup = async ({ email, password, firstname, lastname }) => {
    const data = { email, password, firstname, lastname };
    const response = await axios.post(SERVER_ADDRESS + "/creator/signup", data);
    await alert(response.data.message);
    setOnSignup(false);
  };

  return (
    <div className=" bg-[#e8fffdcf] min-h-[90svh] h-fit dark:bg-slate-800 dark:text-amber-50">
      <Navbar />
      <div className=" h-fit flex relative top-48  justify-center ">
        <div
          action=""
          className="flex flex-col justify-around h-fit min-h-[400px] rounded-md  dark:bg-[#25303ea1] ring ring-stone-400/50 bg-[#0fa3b1]/50 p-4 /12 min-w-[300px] w-fit "
        >
          <p className=" text-2xl font-medium max-w-[400px] m-4   ">
            {onSignup
              ? "Sign Up to the New Version of yourself"
              : "Login to your bright future"}
          </p>
          {onSignup && (
            <input
              ref={fNameRef}
              type="text"
              className="bg-[#ede7e3] ring ring-stone-400/50   dark:bg-slate-700 m-2 p-2   rounded-lg"
              placeholder="First Name "
            />
          )}
          {onSignup && (
            <input
              ref={lNameRef}
              type="text"
              className="bg-[#ede7e3] ring ring-stone-400/50   dark:bg-slate-700 d m-2 p-2 rounded-lg"
              placeholder="Last Name "
            />
          )}
          <input
            ref={emailRef}
            type="text"
            className="bg-[#ede7e3] ring ring-stone-400/50   dark:bg-slate-700 d m-2 p-2   rounded-lg"
            placeholder="email@gmail.com "
          />
          <input
            ref={passwordRef}
            type="password"
            className="bg-[#ede7e3] ring ring-stone-400/50   dark:bg-slate-700  m-2 p-2   rounded-lg "
            placeholder="password "
          />

          <p className="m-3 text-red-700 font-semibold">
            {authenticationMessage}
          </p>

          <button
            className=" bg-[#0fa3b1] w-11/12 mx-auto min-w-[80px] p-2 rounded-xl mt-2 "
            onClick={() => {
              handleAuthenticationSubmit();
            }}
          >
            {onSignup ? "Signup" : "Login"}
          </button>

          <div className="m-4">
            {onSignup ? (
              <div className="flex items-center ">
                Already a user?
                <div
                  className="  min-w-[80px] p-2 text-cya-900 font-semibold rounded-xl "
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthenticationMessage(null);
                    setOnSignup(!onSignup);
                  }}
                >
                  {onSignup ? "Login" : "Signup"}
                </div>
              </div>
            ) : (
              <div className="flex items-center ">
                New here?
                <div
                  className="  min-w-[80px] p-2 text-cyan-900 dark:text-stone-200 font-semibold rounded-xl "
                  onClick={(e) => {
                    e.preventDefault();
                    setAuthenticationMessage(null);
                    setOnSignup(!onSignup);
                  }}
                >
                  {onSignup ? "Login" : "Signup"}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthenticationCreator;
