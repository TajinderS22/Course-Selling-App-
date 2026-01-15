import React from "react";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../Sidebar";
import { SERVER_ADDRESS } from "../../../Secrets/Secrets";
import axios from "axios";
import useActiveSessionCreator from "../../../hooks/useActiveSessionCreator";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useState } from "react";
import PaymentInfoCard from "./PaymentInfoCard";

const Revenue = () => {
  const { jwtCreator } = useActiveSessionCreator();
  const creator = useSelector((state) => state.creator);
  const [totalRevenue, setTotalRevenue] = useState(0);
  const [payments, setPayments] = useState([]);
  const getRevenueDetails = async () => {
    try {
      const res = await axios.get(`${SERVER_ADDRESS}/creator/revenue`, {
        headers: {
          authorization: jwtCreator,
        },
      });
      setPayments(res.data.payments);
      
    } catch (error) {
      console.error("Failed to fetch revenue:", error);
    }
  };

  useEffect(() => {
    getRevenueDetails();
  }, [jwtCreator]);

  useEffect(() => {
    const total = payments.reduce((acc, p) => acc + Number(p?.amount/100 || 0), 0);
    setTotalRevenue(total);
  }, [payments]);

  return (
    <div className="min-h-[90svh] dark:bg-slate-800 dark:text-white">
      <Navbar />
      <div className="flex h-svh overflow-scroll ">
        <Sidebar />
        <div className="flex-1 not-dark:bg-white/50  ">
          <div className="flex w-10/12 mx-auto bg-sky-300/20 m-2 rounded-lg p-2  ">
            <div className=" bg-sky-300/50 ring ring-sky-500 dark:bg-sky-700 rounded-lg mx-2 flex-1/3 flex items-center  gap-2  p-2">
              {creator?.firstname} {creator?.lastname}
            </div>
            <div className=" bg-sky-300/50 ring ring-sky-500 dark:bg-sky-700 rounded-lg mx-2 flex-1/3 flex items-center  gap-2  p-2">
              <p>Total transactions:</p>
              <p>{payments.length}</p>
            </div>
            <div className=" bg-sky-300/50 ring ring-sky-500 dark:bg-sky-700 rounded-lg mx-2 flex-1/3 flex items-center  gap-2  p-2">
              <p>Total revenue:</p>
              <p>{totalRevenue}</p>
            </div>
          </div>

          <div>
            {payments.length > 0 && (
              <div className="w-10/12 mx-auto ">
                <div className="bg-emerald-200/50 dark:bg-emerald-700/50 flex gap-2 justify-between m-2 p-2 rounded-lg  w-full">
                  <div className=" flex-1/4 ">
                    <div className="bg-emerald-400/90 dark:bg-emerald-800/80 hover:opacity-90 ring ring-emerald-500 p-2 rounded-lg">
                      User Name
                    </div>
                  </div>
                  <div className=" flex-1/4 ">
                    <div className="bg-emerald-400/90 dark:bg-emerald-800/80 hover:opacity-90 ring ring-emerald-500 p-2 rounded-lg">
                      Method
                    </div>
                  </div>
                  <div className=" flex-1/4 ">
                    <div className="bg-emerald-400/90 dark:bg-emerald-800/80 hover:opacity-90 ring ring-emerald-500 p-2 rounded-lg">
                      Amount
                    </div>
                  </div>
                  <div className=" flex-1/4 ">
                    <div className="bg-emerald-400/90 dark:bg-emerald-800/80 hover:opacity-90 ring ring-emerald-500 p-2 rounded-lg">
                      Payment Id
                    </div>
                  </div>
                </div>
                {payments.map((payment) => {
                  return <PaymentInfoCard key={payment.id} payment={payment} />;
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
