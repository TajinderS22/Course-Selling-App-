import React from "react";

const Loading = () => {
  return (
    <div className="flex min-h-svh w-full items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-border border-t-primary" />
    </div>
  );
};

export default Loading;
