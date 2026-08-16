/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useRef, useEffect } from "react";
import Navbar from "../Navbar";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import { useNavigate } from "react-router";
import { SERVER_ADDRESS } from "../../Secrets/Secrets";
import { useDispatch, useSelector } from "react-redux";
import { clearUser, setUser } from "../../store/slices/userSlice";

const Authentication = () => {
  const { onSignup, setOnSignup } = useContext(AppContext);
  const { authenticationMessage, setAuthenticationMessage } =
    useContext(AppContext);
  const fNameRef = useRef();
  const lNameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // eslint-disable-next-line no-unused-vars
  const { isCreator, setIsCreator } = useContext(AppContext);

  const user = useSelector((state) => state.user);

  const jwtFromStorage = localStorage.getItem("jwt");
  if (jwtFromStorage) {
    const ifSessionActive = async () => {
      try {
        if (!jwtFromStorage) return;
        const response = await axios.post(
          SERVER_ADDRESS + "/user/verify",
          {},
          {
            headers: {
              authorization: `${jwtFromStorage}`,
            },
          }
        );

        const user = response?.data?.user;

        if (response.status === 200) {
          dispatch(setUser(user));
          navigate("/dashboard");
        } else {
          dispatch(clearUser());
          navigate("/authentication");
        }
      } catch (err) {
        console.error("Session check failed:", err);
        setUser(false);
        navigate("/authentication");
      }
    };

    useEffect(() => {
      setIsCreator(false);
      if (!user && jwtFromStorage) {
        ifSessionActive();
      }
    }, [user, jwtFromStorage]);
  }

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
      const response = await axios.post(SERVER_ADDRESS + "/user/signin", data);
      if (response.status === 200) {
        const jwtToken = response.data.token;
        localStorage.setItem("jwt", jwtToken);
        dispatch(setUser(response.data.user));
        navigate("/dashboard");
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      setAuthenticationMessage(msg);
      console.error("Login error:", msg);
    }
  };

  const signup = async ({ email, password, firstname, lastname }) => {
    const data = { email, password, firstname, lastname };

    const response = await axios.post(SERVER_ADDRESS + "/user/signup", data);

    await alert(response.data.message);
    setOnSignup(false);
  };

  return (
    <div className="grid-dots min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="flex justify-center pb-16 pt-32">
        <div className="card w-fit min-w-[320px] max-w-md p-8 md:min-w-[420px]">
          <p className="font-display text-center text-2xl font-bold md:text-3xl">
            {onSignup
              ? "Sign Up to the New Version of yourself"
              : "Login to your bright future"}
          </p>
          <p className="mt-2 text-center text-sm text-ink-soft">
            {onSignup ? "Create your account to get started" : "Welcome back — we missed you"}
          </p>

          <div className="mt-8 flex flex-col gap-3">
            {onSignup && (
              <input
                ref={fNameRef}
                type="text"
                className="input-base"
                placeholder="First Name"
              />
            )}
            {onSignup && (
              <input
                ref={lNameRef}
                type="text"
                className="input-base"
                placeholder="Last Name"
              />
            )}
            <input
              ref={emailRef}
              type="text"
              className="input-base"
              placeholder="email@gmail.com"
            />
            <input
              ref={passwordRef}
              type="password"
              className="input-base"
              placeholder="Password"
            />
          </div>

          <p className="mt-4 text-sm font-semibold text-red-600 dark:text-red-400">
            {authenticationMessage}
          </p>

          <button
            className="btn btn-primary mt-4 w-full"
            onClick={() => {
              handleAuthenticationSubmit();
            }}
          >
            {onSignup ? "Signup" : "Login"}
          </button>

          <div className="mt-5 text-center text-sm text-ink-soft">
            {onSignup ? "Already a user?" : "New here?"}
            <span
              className="ml-1 cursor-pointer font-semibold text-primary hover:underline"
              onClick={(e) => {
                e.preventDefault();
                setAuthenticationMessage(null);
                setOnSignup(!onSignup);
              }}
            >
              {onSignup ? "Login" : "Signup"}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Authentication;
