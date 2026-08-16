import React from "react";
import { Mail } from "lucide-react";

const UserCard = ({ user }) => {
  return (
    <div
      key={user._id}
      className="card card-hover m-2 flex min-h-20 items-center justify-between gap-3 p-3"
    >
      <div className="flex items-center gap-4">
        <img
          className="h-14 w-14 rounded-md border border-border object-cover"
          src={
            user?.profileImageUrl ||
            "https://res.cloudinary.com/dcpz5001o/image/upload/v1720769605/christopher-burns-Kj2SaNHG-hg-unsplash_d3pouz.jpg"
          }
          alt=""
        />
        <div>
          <p className="font-display font-semibold">
            {user?.firstname} {user?.lastname}
          </p>
          <p className="text-sm text-ink-soft">{user?.email}</p>
        </div>
      </div>
      <a
        className="btn btn-secondary shrink-0"
        href={`mailto:${user?.email}`}
      >
        <Mail className="h-4 w-4" />
        Mail
      </a>
    </div>
  );
};

export default UserCard;
