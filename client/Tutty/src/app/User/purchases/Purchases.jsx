import axios from "axios";
import React, { useEffect, useState } from "react";
import { SERVER_ADDRESS } from "../../../Secrets/Secrets";
import useActiveSession from "../../../hooks/useActiveSession";
import PurchaseCard from "./PurchaseCard";
import Navbar from "../../../components/Navbar";
import Sidebar from "../../Sidebar";
import { ShoppingBag } from "lucide-react";

const Purchases = () => {
  const { jwt } = useActiveSession();

  const [purchases, setPurchases] = useState(null);
  const getAllPayments = async () => {
    const res = await axios.get(SERVER_ADDRESS + "/user/purchases", {
      headers: {
        authorization: jwt,
      },
    });
    setPurchases(res.data.payments);
  };

  useEffect(() => {
    getAllPayments();
  }, []);

  return (
    <div className="min-h-[100svh] bg-app text-ink">
      <Navbar />
      <div className="flex min-h-svh">
        <Sidebar />
        <div className="flex-1 pb-10 pt-20">
          <div className="font-display m-2 my-6 ml-4 text-2xl font-bold">
            Your purchase history
          </div>

          <div className="m-2 w-full max-w-2xl">
            {purchases && purchases.length > 0 ? (
              <div>
                {purchases.map((purchase) => {
                  return <PurchaseCard key={purchase.id} purchase={purchase} />;
                })}
              </div>
            ) : (
              <div className="card m-2 flex flex-col items-center gap-3 p-8 text-center">
                <ShoppingBag className="h-10 w-10 text-ink-soft" />
                <p className="text-ink-soft">
                  {purchases ? "No purchases yet." : "Loading purchases…"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Purchases;
