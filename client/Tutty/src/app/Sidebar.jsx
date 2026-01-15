/* eslint-disable no-unused-vars */
import React, { useEffect, useContext } from "react";
import useBreakpoint from "../hooks/useBreakpoint";
import { AppContext } from "../context/AppContext";
import { useLocation, useNavigate } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import {
  clearSidebarSelected,
  setSidebarSelected,
} from "../store/slices/configSlice";
import { use } from "react";

const Sidebar = () => {
  const isMdUp = useBreakpoint();
  const { open, setOpen } = useContext(AppContext);
  const config = useSelector((state) => state.config);
  const sidebarSelected = config.sideBarSelected;
  const dispatch = useDispatch();


  useEffect(() => {
    setOpen(isMdUp);
  }, [isMdUp]);

  const user = useSelector((state) => state.user);
  const creator = useSelector((state) => state.creator);

  const navigate = useNavigate();
  const pathname=useLocation().pathname

  return (
    <div
      className={`fixed md:sticky  ${
        pathname.includes("dashboard") ? "h-full" : "h-svh"
      } not-md:${open && "w-[600px]"} `}
    >
      <div
        className={` sticky top-0 pt-8 ${
          open && "md:w-72"
        } text-black dark:text-white  transform-all ease-in-out not-md:rounded-r-xl   py-6 not-md:bg-transparent not-md:h-12   z-10   duration-300 md:dark:bg-slate-600 bg-slate-300 md:h-[100%] not-md:${
          open && "h-[600px] "
        } not-md:flex not-md:flex-col ${
          open && "not-md:w-[320px] not-md:bg-slate-600 "
        }
        not-md:${open && "w-[300px]"}
         `}
      >
        {open ? (
          <div className="flex justify-between mx-4 items-center ">
            <button
              className={`bg-teal-400/40  rounded-md h-12 p-2`}
              onClick={() => {
                setOpen(!open);
              }}
            >
              Tutty
            </button>
            <img
              className="h-14 hidden md:block rounded-md"
              src={
                user?.profileImageUrl ||
                creator?.profileImageUrl ||
                "    https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
              }
              alt="profile image of User"
            />
          </div>
        ) : (
          <div
            className={`block relative mx-4 cursor-pointer`}
            onClick={() => {
              setOpen(!open);
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
              />
            </svg>
          </div>
        )}

        <div
          className={` items-center mt-8 ${
            open ? "block" : "hidden"
          } not-md:flex-1 md:block   `}
        >
          {
            <div
              className={`dark:bg-slate-600 bg-slate-300 not-md:rounded-lg not-md:bg-zinc-600 not-md:text-white `}
            >
              <SidebarComp
                navigate={navigate}
                user={user}
                creator={creator}
                dispatch={dispatch}
                sidebarSelected={sidebarSelected}
                open={open}
                text={"Home"}
                icon={
                  <svg className="h-6" viewBox="0 0 48 48">
                    <path d="M39.5,43h-9c-1.381,0-2.5-1.119-2.5-2.5v-9c0-1.105-0.895-2-2-2h-4c-1.105,0-2,0.895-2,2v9c0,1.381-1.119,2.5-2.5,2.5h-9	C7.119,43,6,41.881,6,40.5V21.413c0-2.299,1.054-4.471,2.859-5.893L23.071,4.321c0.545-0.428,1.313-0.428,1.857,0L39.142,15.52	C40.947,16.942,42,19.113,42,21.411V40.5C42,41.881,40.881,43,39.5,43z"></path>
                  </svg>
                }
              />
              {/* <SidebarComp
                navigate={navigate}
                user={user}
                creator={creator}
                dispatch={dispatch}
                sidebarSelected={sidebarSelected}
                open={open}
                text={"Webinars"}
                icon={
                  <svg className="h-6 w-6" viewBox="0 0 24 24">
                    <path d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M4 6h11a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V8a2 2 0 012-2z" />
                  </svg>
                }
              /> */}

              {user && (
                <SidebarComp
                  navigate={navigate}
                  user={user}
                  creator={creator}
                  dispatch={dispatch}
                  sidebarSelected={sidebarSelected}
                  open={open}
                  text={"Purchases"}
                  icon={
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <rect
                        width="20"
                        height="14"
                        x="2"
                        y="5"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                      />
                      <line
                        x1="2"
                        y1="10"
                        x2="22"
                        y2="10"
                        stroke="currentColor"
                      />
                      <circle cx="8" cy="15" r="1" fill="currentColor" />
                      <circle cx="12" cy="15" r="1" fill="currentColor" />
                    </svg>
                  }
                />
              )}

              {creator && (
                <SidebarComp
                  navigate={navigate}
                  user={user}
                  creator={creator}
                  dispatch={dispatch}
                  sidebarSelected={sidebarSelected}
                  open={open}
                  text={"Revenue"}
                  icon={
                    <svg className="h-6 w-6" viewBox="0 0 24 24" fill="none">
                      <rect
                        width="20"
                        height="14"
                        x="2"
                        y="5"
                        rx="2"
                        ry="2"
                        stroke="currentColor"
                      />
                      <line
                        x1="2"
                        y1="10"
                        x2="22"
                        y2="10"
                        stroke="currentColor"
                      />
                      <circle cx="8" cy="15" r="1" fill="currentColor" />
                      <circle cx="12" cy="15" r="1" fill="currentColor" />
                    </svg>
                  }
                />
              )}

              {creator && (
                <SidebarComp
                  navigate={navigate}
                  user={user}
                  creator={creator}
                  dispatch={dispatch}
                  sidebarSelected={sidebarSelected}
                  open={open}
                  text={"User Management"}
                  icon={
                    <svg
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M5.121 17.804A9.937 9.937 0 0112 15c2.21 0 4.242.719 5.879 1.928M15 11a3 3 0 11-6 0 3 3 0 016 0zM19.071 4.929a10 10 0 11-14.142 0" />
                    </svg>
                  }
                />
              )}

              <SidebarComp
                navigate={navigate}
                user={user}
                creator={creator}
                dispatch={dispatch}
                sidebarSelected={sidebarSelected}
                open={open}
                text={"Settings"}
                icon={
                  <svg className="h-6" viewBox="0 0 24 24">
                    <path d="M 10.490234 2 C 10.011234 2 9.6017656 2.3385938 9.5097656 2.8085938 L 9.1757812 4.5234375 C 8.3550224 4.8338012 7.5961042 5.2674041 6.9296875 5.8144531 L 5.2851562 5.2480469 C 4.8321563 5.0920469 4.33375 5.2793594 4.09375 5.6933594 L 2.5859375 8.3066406 C 2.3469375 8.7216406 2.4339219 9.2485 2.7949219 9.5625 L 4.1132812 10.708984 C 4.0447181 11.130337 4 11.559284 4 12 C 4 12.440716 4.0447181 12.869663 4.1132812 13.291016 L 2.7949219 14.4375 C 2.4339219 14.7515 2.3469375 15.278359 2.5859375 15.693359 L 4.09375 18.306641 C 4.33275 18.721641 4.8321562 18.908906 5.2851562 18.753906 L 6.9296875 18.1875 C 7.5958842 18.734206 8.3553934 19.166339 9.1757812 19.476562 L 9.5097656 21.191406 C 9.6017656 21.661406 10.011234 22 10.490234 22 L 13.509766 22 C 13.988766 22 14.398234 21.661406 14.490234 21.191406 L 14.824219 19.476562 C 15.644978 19.166199 16.403896 18.732596 17.070312 18.185547 L 18.714844 18.751953 C 19.167844 18.907953 19.66625 18.721641 19.90625 18.306641 L 21.414062 15.691406 C 21.653063 15.276406 21.566078 14.7515 21.205078 14.4375 L 19.886719 13.291016 C 19.955282 12.869663 20 12.440716 20 12 C 20 11.559284 19.955282 11.130337 19.886719 10.708984 L 21.205078 9.5625 C 21.566078 9.2485 21.653063 8.7216406 21.414062 8.3066406 L 19.90625 5.6933594 C 19.66725 5.2783594 19.167844 5.0910937 18.714844 5.2460938 L 17.070312 5.8125 C 16.404116 5.2657937 15.644607 4.8336609 14.824219 4.5234375 L 14.490234 2.8085938 C 14.398234 2.3385937 13.988766 2 13.509766 2 L 10.490234 2 z M 12 8 C 14.209 8 16 9.791 16 12 C 16 14.209 14.209 16 12 16 C 9.791 16 8 14.209 8 12 C 8 9.791 9.791 8 12 8 z"></path>
                  </svg>
                }
              />
            </div>
          }
        </div>
      </div>
    </div>
  );
};




const SidebarComp = ({
  text,
  icon,
  open,
  dispatch,
  sidebarSelected,
  navigate,
  user,
  creator,
}) => {
  return (
    <div
      onClick={() => {
        if (sidebarSelected == text) {
          dispatch(clearSidebarSelected());
        } else {
          dispatch(setSidebarSelected(text));
        }

        handleSidebarCompClick(text, navigate, user, creator);
      }}
      className={` m-2 flex ${
        sidebarSelected == text ? "bg-neutral-400/50 rounded-md" : ""
      } justify-between p-2 `}
    >
      {open && <div className={`${open ? "block" : "hidden"}`}>{text}</div>}
      <div className="dark:fill-slate-300 ">{icon}</div>
    </div>
  );
};

const handleSidebarCompClick = async (text, navigate, user, creator) => {
  if (text.toLowerCase() == "settings") {
    navigate("/settings");
  } else if (text.toLowerCase() == "user management" && creator) {
    navigate("/creator/user-management");
  } else if (text.toLowerCase() == "revenue" && creator) {
    navigate("/creator/revenue");
  } else if (text.toLowerCase() == "home" && creator) {
    navigate("/creator/dashboard");
  } else if (text.toLowerCase() == "home" && user) {
    navigate("/creator/dashboard");
  } else if (text.toLowerCase() =="purchases" && user){
    navigate(`/user/purchases`)
  }
};

export default Sidebar;
