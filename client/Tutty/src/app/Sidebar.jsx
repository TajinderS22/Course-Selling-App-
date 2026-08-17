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
import { Home, CreditCard, Settings, Users, BarChart3, Menu, X } from "lucide-react";

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
  const pathname = useLocation().pathname;

  return (
    <div
      className={`sticky top-16 z-20 h-[calc(100svh-4rem)] shrink-0 transition-all duration-300 ${
        open ? "w-64" : "w-16"
      } border-r border-border bg-surface/60 backdrop-blur-md`}
    >
      <div className="flex h-full flex-col py-6">
        {/* Header */}
        <div className={`flex items-center justify-between px-4 ${open ? "" : "justify-center"}`}>
          {open ? (
            <>
              <button
                className="btn btn-secondary h-10 px-3"
                onClick={() => setOpen(!open)}
              >
                Tutty
              </button>
              <img
                className="h-11 w-11 rounded-md border border-border object-cover"
                src={
                  user?.profileImageUrl ||
                  creator?.profileImageUrl ||
                  "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
                }
                alt="profile"
              />
            </>
          ) : (
            <button
              className="flex h-10 w-10 items-center justify-center rounded-md border border-border text-ink hover:bg-surface-2"
              onClick={() => setOpen(!open)}
            >
              <Menu className="h-5 w-5" />
            </button>
          )}
        </div>

        {/* Nav items */}
        <nav className="mt-8 flex flex-1 flex-col gap-1 px-2">
          <SidebarComp
            navigate={navigate}
            user={user}
            creator={creator}
            dispatch={dispatch}
            sidebarSelected={sidebarSelected}
            open={open}
            text="Home"
            icon={<Home className="h-5 w-5" />}
          />

          {user && (
            <SidebarComp
              navigate={navigate}
              user={user}
              creator={creator}
              dispatch={dispatch}
              sidebarSelected={sidebarSelected}
              open={open}
              text="Purchases"
              icon={<CreditCard className="h-5 w-5" />}
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
              text="Revenue"
              icon={<BarChart3 className="h-5 w-5" />}
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
              text="User Management"
              icon={<Users className="h-5 w-5" />}
            />
          )}
        </nav>

        <div className="px-2">
          <SidebarComp
            navigate={navigate}
            user={user}
            creator={creator}
            dispatch={dispatch}
            sidebarSelected={sidebarSelected}
            open={open}
            text="Settings"
            icon={<Settings className="h-5 w-5" />}
          />
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
  const active = sidebarSelected == text;
  return (
    <button
      onClick={() => {
        if (sidebarSelected == text) {
          dispatch(clearSidebarSelected());
        } else {
          dispatch(setSidebarSelected(text));
        }

        handleSidebarCompClick(text, navigate, user, creator);
      }}
      title={!open ? text : undefined}
      className={`flex items-center gap-3 rounded-md p-2.5 text-sm font-medium transition ${
        open ? "justify-start" : "justify-center"
      } ${
        active
          ? "bg-primary-soft text-primary"
          : "text-ink-soft hover:bg-surface-2 hover:text-ink"
      }`}
    >
      {icon}
      {open && <span>{text}</span>}
    </button>
  );
};

const handleSidebarCompClick = async (text, navigate, user, creator) => {
  if (text.toLowerCase() == "settings") {
    navigate(creator ? "/creator/settings" : "/settings");
  } else if (text.toLowerCase() == "user management" && creator) {
    navigate("/creator/user-management");
  } else if (text.toLowerCase() == "revenue" && creator) {
    navigate("/creator/revenue");
  } else if (text.toLowerCase() == "home" && creator) {
    navigate("/creator/dashboard");
  } else if (text.toLowerCase() == "home" && user) {
    navigate("/dashboard");
  } else if (text.toLowerCase() == "purchases" && user) {
    navigate(`/user/purchases`);
  }
};

export default Sidebar;
