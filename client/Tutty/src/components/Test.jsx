import React from "react";
import Otp from "./Otp";

const Test = () => {
  return (
    <div className="grid min-h-screen place-items-center bg-app text-ink">
      <div className="card p-6">
        <p className="font-display mb-4 text-center text-lg font-bold">
          Enter verification code
        </p>
        <Otp number={6} />
      </div>
    </div>
  );
};

export default Test;
