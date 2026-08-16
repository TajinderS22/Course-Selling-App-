import React from "react";
import CourseCard from "../../components/CourseCard";
import { Link } from "react-router";
import { useSelector } from "react-redux";
import useActiveSession from "../../hooks/useActiveSession";
import Loading from "../../components/Loading";
import { BookOpen, ShoppingBag } from "lucide-react";

const MainContent = () => {
  const purchasedCourses = useSelector((state) => state.userCourses);

  const { loading } = useActiveSession();

  const user = useSelector((state) => state.user);

  if (loading) {
    return (
      <div className="min-h-[90svh]">
        <Loading />
      </div>
    );
  }

  return (
    <div className="min-h-svh w-full bg-app pb-6 text-ink">
      {/* Hero band */}
      <div className="relative overflow-hidden bg-gradient-to-br from-primary-soft via-surface to-secondary-soft px-4 pb-8 pt-20 md:px-12">
        <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-md bg-primary/10 blur-3xl" />
        <div className="mx-auto max-w-6xl">
          <p className="text-sm font-medium uppercase tracking-wider text-ink-soft">
            My dashboard
          </p>
          <p className="font-display mt-1 text-3xl font-bold md:text-4xl">
            Good morning, {user.firstname + " " + user.lastname}
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 md:px-12">
        {/* Profile card */}
        <div className="card flex mt-6 flex-col items-center gap-5 p-6 md:flex-row md:gap-8">
          <img
            className="h-24 w-24 shrink-0 rounded-md border border-border object-cover"
            src={
              user.profileImageUrl ||
              "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
            }
            alt="profile"
          />
          <div className="flex min-w-0 flex-col items-center text-center md:items-start md:text-left">
            <p className="font-display text-xl font-bold">
              {user.firstname + " " + user.lastname}
            </p>
            <p className="text-sm text-ink-soft">{user.email}</p>
            <div className="mt-3 flex flex-col gap-1.5 text-sm md:flex-row md:gap-6">
              <span className="pill">
                📞 {user.phoneNumber || "No phone yet"}
              </span>
              <span className="pill">
                📍 {user.location || "No location yet"}
              </span>
            </div>
          </div>
        </div>

        {/* Courses */}
        <div className="mt-8 pb-10">
          <p className="font-display flex items-center gap-2 text-2xl font-bold">
            <BookOpen className="h-5 w-5 text-primary" />
            My courses
          </p>
          {purchasedCourses && purchasedCourses.length > 0 ? (
            <div className="mt-4 grid justify-center gap-2 md:grid-cols-2 xl:grid-cols-3">
              {purchasedCourses.map((course) => {
                return <CourseCard key={course._id} data={course} />;
              })}
            </div>
          ) : (
            <div className="card mt-4 flex flex-col items-center gap-3 p-10 text-center">
              <ShoppingBag className="h-10 w-10 text-ink-soft" />
              <p className="text-lg text-ink-soft">
                You haven't bought any courses yet.
              </p>
              <Link to="/buyCourse">
                <button className="btn btn-primary">
                  Click here to buy courses of your choice
                </button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const WorkComp = ({ time, task, status }) => {
  return (
    <div className="flex border-b-2 p-2">
      <div className="flex w-fit min-w-[100px] flex-col items-start border-r-2 border-border px-2 text-xs">
        <div className="text-base font-semibold">{time}</div>
        <p>{time}</p>
      </div>
      <div className="mx-2 w-full">
        <div className="text-xs">{status}</div>
        <div className="text-lg font-bold">{task}</div>
      </div>
    </div>
  );
};

const DateBar = ({ Date }) => {
  return (
    <div className="card sticky -top-20 mt-2 p-4">
      <div className="flex justify-between rounded-md bg-app p-6 py-2">
        <div>
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
              d="M6.75 2.994v2.25m10.5-2.25v2.25m-14.252 13.5V7.491a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v11.251m-18 0a2.25 2.25 0 0 0 2.25 2.25h13.5a2.25 2.25 0 0 0 2.25-2.25m-18 0v-7.5a2.25 2.25 0 0 1 2.25-2.25h13.5a2.25 2.25 0 0 1 2.25 2.25v7.5m-6.75-6h2.25m-9 2.25h4.5m.002-2.25h.005v.006H12v-.006Zm-.001 4.5h.006v.006h-.006v-.005Zm-2.25.001h.005v.006H9.75v-.006Zm-2.25 0h.005v.005h-.006v-.005Zm6.75-2.247h.005v.005h-.005v-.005Zm0 2.247h.006v.006h-.006v-.006Zm2.25-2.248h.006V15H16.5v-.005Z"
            />
          </svg>
        </div>
        <div className="w-full px-6">{Date}</div>
        <div className="flex justify-between">
          <div className="mx-6">
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
                d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
              />
            </svg>
          </div>
          <div>
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
                d="M13.5 4.5 21 12m0 0-7.5 7.5M21 12H3"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
