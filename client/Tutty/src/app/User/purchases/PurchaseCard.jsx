import axios from "axios";
import React from "react";
import { SERVER_ADDRESS } from "../../../Secrets/Secrets";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import { ChevronRight, IndianRupee } from "lucide-react";

const PurchaseCard = ({ purchase }) => {
  const [course, setCourse] = useState(null);
  const navigate = useNavigate();

  const getCourseInfo = async () => {
    const res = await axios.post(
      SERVER_ADDRESS + "/course/info/" + purchase.notes.courseId
    );
    setCourse(res.data.info);
  };
  const formatDateTime = (created_at) => {
    const timestamp = Number(created_at);
    return new Date(timestamp * 1000).toLocaleString("en-IN", {
      dateStyle: "medium",
      timeStyle: "short",
    });
  };

  useEffect(() => {
    getCourseInfo();
  }, []);
  return (
    <div
      className="card card-hover m-2 flex cursor-pointer items-center gap-3 p-3"
      onClick={() => {
        navigate(`/course/${purchase.notes.courseId}`);
      }}
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
        <ChevronRight className="h-5 w-5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-display truncate font-semibold">
          {course?.title || "Loading…"}
        </p>
        <p className="text-xs text-ink-soft">
          {formatDateTime(purchase.created_at)}
        </p>
      </div>
      <div className="flex shrink-0 items-center gap-1 rounded-md bg-app px-3 py-1.5 font-semibold text-primary">
        <IndianRupee className="h-3.5 w-3.5" />
        {(Number(purchase.amount) / 100).toLocaleString("en-IN")}
      </div>
      <p className="hidden max-w-[160px] truncate text-xs text-ink-soft md:block">
        {purchase.id}
      </p>
    </div>
  );
};

export default PurchaseCard;
