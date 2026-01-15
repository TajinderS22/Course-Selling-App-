import React from "react";
import { useState } from "react";
import { SERVER_ADDRESS } from "../../../Secrets/Secrets";
import useActiveSessionCreator from "../../../hooks/useActiveSessionCreator";
import { useEffect } from "react";
import axios from "axios";

const PaymentInfoCard = ({ payment }) => {
  const userId = payment.notes.userId;
  const { jwtCreator } = useActiveSessionCreator();
  const [user, setUser] = useState();
  const getUserInfo = async () => {
    const res = await axios.post(
      SERVER_ADDRESS + "/creator/users-info",
      {
        userIds: [userId],
      },
      {
        headers: {
          authorization: jwtCreator,
        },
      }
    );
    setUser(res.data.users[0]);
  };
  useEffect(() => {
    getUserInfo();
  }, []);

  return (
    <div
      className="bg-emerald-200/70 dark:bg-emerald-500/30 flex gap-2 justify-between m-1 p-2 rounded-lg  w-full"
      key={payment.id}
    >
      <div className="flex-1/4">
        <div className="bg-emerald-300/70 dark:bg-emerald-700/80 hover:opacity-70 ring ring-emerald-500  p-2 rounded-lg">
          {user?.firstname} {user?.lastname}
        </div>
      </div>
      <div className=" flex-1/4 ">
        <div className="bg-emerald-300/70 dark:bg-emerald-700/80 hover:opacity-70 ring ring-emerald-500  p-2 rounded-lg">
          {payment?.method}
        </div>
      </div>
      <div className=" flex-1/4 ">
        <div className="bg-emerald-300/70 dark:bg-emerald-700/80 hover:opacity-70 ring ring-emerald-500  p-2 rounded-lg">
          {payment?.amount} {payment?.currency}
        </div>
      </div>
      <div className=" flex-1/4 ">
        <div className="bg-emerald-300/70 dark:bg-emerald-700/80 hover:opacity-70 ring ring-emerald-500  p-2 rounded-lg">
          {payment?.id}
        </div>
      </div>
    </div>
  );
};

export default PaymentInfoCard;
