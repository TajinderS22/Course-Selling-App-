import axios from "axios";
import React from "react";
import { SERVER_ADDRESS } from "../../../Secrets/Secrets";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";

const PurchaseCard = ({ purchase }) => {
  const [course, setCourse] = useState(null);
    const navigate=useNavigate()


  const getCourseInfo = async () => {
    const res = await axios.post(
      SERVER_ADDRESS + "/course/info/" + purchase.notes.courseId
    );
    setCourse(res.data.info);
  };
const formatDateTime = (created_at) => {
    const timestamp=Number(created_at)
  return new Date(timestamp * 1000).toLocaleString("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  });
};


  useEffect(() => {
    getCourseInfo();
  }, []);
  return (
    <div className="m-2 p-2 flex items-center gap-2 justify-between    bg-slate-400/80 rounded-lg">
      <div className="p-2  bg-slate-200/80  gap-1 rounded-lg">
        {formatDateTime(purchase.created_at)}
      </div>
      <div className="text-lg   p-2 bg-slate-200/80  rounded-lg "
        onClick={()=>{
            navigate((`/course/${purchase.notes.courseId}`))
        }}
      >
        {course?.title}
      </div>
      <div className="flex   p-2 bg-slate-200/80  gap-1 rounded-lg ">
        <p>{purchase.amount}</p>
        <p>{purchase.currency}</p>
      </div>
      <div className="text-lg   p-2 bg-slate-200/80  rounded-lg ">
        {purchase.id}
      </div>
    </div>
  );
};

export default PurchaseCard;
