import React from 'react'

const UserCard = ({user}) => {
  return (
    <div
      key={user._id}
      className="bg-slate-400/80 dark:bg-slate-600 hover:bg-slate-400/60 m-2 p-2
    rounded-lg hover:scale-102 min-h-20 h-fit
    transition-all duration-200 ease-in-out
    "
    >
      <div className="flex h-full  ">
        <div className="flex-1 flex  h-full justify-between flex-col">
          <p className="text-lg font-semibold">
            {user?.firstname} {user?.lastname}
          </p>
          <div className="p-2 mt-4">
            <a
              className="bg-green-500/50  rounded-full p-2 px-6"
              href={`mailto:${user?.email}`}
            >
              <button>Mail</button>
            </a>
          </div>
        </div>
        <div className=" h-40">
          <img
            className="w-full h-full rounded-lg"
            src={
              user?.profileImageUrl ||
              "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
            }
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default UserCard