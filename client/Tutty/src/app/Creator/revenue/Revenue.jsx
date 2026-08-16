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
import { IndianRupee, ReceiptText } from "lucide-react";

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
    const total = payments.reduce(
      (acc, p) => acc + Number(p?.amount / 100 || 0),
      0
    );
    setTotalRevenue(total);
  }, [payments]);

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="flex min-h-svh">
        <Sidebar />
        <div className="flex-1 pb-10 pt-20">
          {/* Stats */}
          <div className="mx-auto grid w-11/12 gap-3 md:grid-cols-3">
            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <ReceiptText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Creator
                </p>
                <p className="mt-0.5 truncate text-lg font-bold">
                  {creator?.firstname} {creator?.lastname}
                </p>
              </div>
            </div>
            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-secondary-soft text-secondary">
                <ReceiptText className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Total transactions
                </p>
                <p className="mt-0.5 text-lg font-bold">{payments.length}</p>
              </div>
            </div>
            <div className="card flex items-center gap-4 p-5">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-md bg-primary-soft text-primary">
                <IndianRupee className="h-5 w-5" />
              </div>
              <div className="min-w-0">
                <p className="text-xs font-semibold uppercase tracking-wider text-ink-soft">
                  Total revenue
                </p>
                <p className="mt-0.5 text-lg font-bold">
                  ₹ {totalRevenue.toLocaleString("en-IN")}
                </p>
              </div>
            </div>
          </div>

          {/* Table */}
          <div className="mx-auto mt-6 w-11/12">
            {payments.length > 0 && (
              <div>
                <div className="card m-1 grid w-full grid-cols-2 gap-2 p-3 md:grid-cols-4">
                  <div className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">
                    User Name
                  </div>
                  <div className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">
                    Method
                  </div>
                  <div className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">
                    Amount
                  </div>
                  <div className="rounded-md bg-primary px-3 py-2 text-sm font-semibold text-white">
                    Payment Id
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
