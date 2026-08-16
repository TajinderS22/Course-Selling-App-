import React from "react";

const CardShimmer = () => {
  return (
    <div className="card m-2 flex min-h-[380px] w-full min-w-[350px] max-w-[416px] flex-col p-3">
      <div className="shimmer-block h-[220px] w-full rounded-md" />
      <div className="shimmer-block mx-1 mt-4 h-6 w-3/4 rounded-md" />
      <div className="shimmer-block mx-1 mt-2 h-4 w-full rounded-md" />
      <div className="shimmer-block mx-1 mt-1 h-4 w-2/3 rounded-md" />
      <div className="shimmer-block mx-1 mt-4 h-7 w-1/3 rounded-md" />
      <div className="mt-4 flex gap-2 px-1">
        <div className="shimmer-block h-10 flex-1 rounded-md" />
        <div className="shimmer-block h-10 flex-1 rounded-md" />
      </div>
    </div>
  );
};

export default CardShimmer;
