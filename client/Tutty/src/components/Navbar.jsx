/* eslint-disable no-unused-vars */
/* eslint-disable react-hooks/rules-of-hooks */
import React, { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/AppContext";
import { Link, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import { clearCreator } from "../store/slices/creatorSlice";
import { clearUser } from "../store/slices/userSlice";
import { Menu, Moon, Sun, X } from "lucide-react";

const Navbar = ({ BgColor }) => {
  const { onSignup, setOnSignup, setAuthenticationMessage } =
    useContext(AppContext);
  const [isExtended, setIsExtended] = useState(false);
  const [isDark, setisDark] = useState(
    typeof document !== "undefined" &&
      document.querySelector("html")?.classList?.contains("dark")
  );
  const { isCreator, setIsCreator } = useContext(AppContext);

  const dispatch = useDispatch();

  const creatorUser = useSelector((state) => state.creator);
  const normalUser = useSelector((state) => state.user);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (isCreator) {
      setUser(creatorUser);
    } else {
      setUser(normalUser);
    }
  }, [isCreator, creatorUser, normalUser]);

  const toggleDark = () => {
    document.querySelector("html").classList.toggle("dark");
    setisDark(!isDark);
  };

  const handleLogout = () => {
    setOnSignup(true);
    setAuthenticationMessage(null);
    setUser(null);
    if (isCreator) {
      dispatch(clearCreator());
      localStorage.removeItem("jwtCreator");
      navigate("/creator/authentication");
    } else {
      dispatch(clearUser());
      localStorage.removeItem("jwt");
      navigate("/authentication");
    }
  };

  return (
    <div className="fixed top-0 z-50 w-full glass">
      <div
        className={`mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-6 ${
          BgColor ? BgColor : ""
        }`}
      >
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img
            className="h-10 w-10 rounded-md object-contain"
            src="https://res.cloudinary.com/dcpz5001o/image/upload/v1750935602/Tuty_pffuhw.png"
            alt="Tuty Logo"
          />
          <span className="font-display text-xl font-bold tracking-tight">
            Tuty
          </span>
        </Link>

        {/* Desktop nav */}
        <div className="hidden items-center gap-1 md:flex">
          <Link
            to="/"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-2 hover:text-ink"
          >
            Home
          </Link>
          <Link
            to="/Aboutus"
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-2 hover:text-ink"
          >
            About us
          </Link>
          {user && (
            <Link
              to={isCreator ? "/creator/dashboard" : "/dashboard"}
              className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-2 hover:text-ink"
            >
              Dashboard
            </Link>
          )}
          <Link
            to={isCreator ? "/creator/create-course" : "/buyCourse"}
            className="rounded-md px-3 py-2 text-sm font-medium text-ink-soft transition hover:bg-surface-2 hover:text-ink"
          >
            {isCreator ? "Create" : "Courses"}
          </Link>
        </div>

        {/* Right actions */}
        <div className="hidden items-center gap-2 md:flex">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-ink-soft transition hover:text-ink"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          {user ? (
            <button className="btn btn-ghost" onClick={handleLogout}>
              Logout
            </button>
          ) : (
            <Link
              to={isCreator ? "/creator/authentication" : "/authentication"}
            >
              <button
                className="btn btn-primary"
                onClick={() => {
                  setOnSignup(!onSignup);
                  setAuthenticationMessage(null);
                }}
              >
                {onSignup ? "Login" : "Sign Up"}
              </button>
            </Link>
          )}
        </div>

        {/* Mobile toggles */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleDark}
            aria-label="Toggle dark mode"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-ink-soft"
          >
            {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            onClick={() => setIsExtended(!isExtended)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-surface text-ink"
          >
            {isExtended ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isExtended && (
        <div className="border-t border-border bg-surface px-6 py-4 md:hidden">
          <div className="flex flex-col gap-1">
            <Link
              to="/"
              onClick={() => setIsExtended(false)}
              className="rounded-md px-3 py-2.5 font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
            >
              Home
            </Link>
            <Link
              to="/Aboutus"
              onClick={() => setIsExtended(false)}
              className="rounded-md px-3 py-2.5 font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
            >
              About us
            </Link>
            {user && (
              <Link
                to={isCreator ? "/creator/dashboard" : "/dashboard"}
                onClick={() => setIsExtended(false)}
                className="rounded-md px-3 py-2.5 font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
              >
                Dashboard
              </Link>
            )}
            <Link
              to={isCreator ? "/creator/create-course" : "/buyCourse"}
              onClick={() => setIsExtended(false)}
              className="rounded-md px-3 py-2.5 font-medium text-ink-soft hover:bg-surface-2 hover:text-ink"
            >
              {isCreator ? "Create" : "Courses"}
            </Link>
            <div className="mt-2">
              {user ? (
                <button
                  className="btn btn-ghost w-full"
                  onClick={() => {
                    setIsExtended(false);
                    handleLogout();
                  }}
                >
                  Logout
                </button>
              ) : (
                <Link
                  to={isCreator ? "/creator/authentication" : "/authentication"}
                >
                  <button
                    className="btn btn-primary w-full"
                    onClick={() => {
                      setIsExtended(false);
                      setOnSignup(!onSignup);
                      setAuthenticationMessage(null);
                    }}
                  >
                    {onSignup ? "Login" : "Sign Up"}
                  </button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
