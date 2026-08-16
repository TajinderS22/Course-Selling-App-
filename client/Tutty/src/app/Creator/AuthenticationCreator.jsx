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
    <div className="grid-dots min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="flex justify-center pb-16 pt-32">
        <div className="card w-fit min-w-[320px] max-w-md p-8 md:min-w-[420px]">
          <p className="font-display text-center text-2xl font-bold md:text-3xl">
            {onSignup
              ? "Start Teaching on Tutty"
              : "Login to your creator dashboard"}
          </p>
          <p className="mt-2 text-center text-sm text-ink-soft">
            {onSignup
              ? "Create your creator account and share your knowledge"
              : "Welcome back — your students are waiting"}
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
            {onSignup ? "Already a creator?" : "New here?"}
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

export default AuthenticationCreator;
