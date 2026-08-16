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
      className="card m-1 grid w-full grid-cols-2 gap-2 p-3 md:grid-cols-4"
      key={payment.id}
    >
      <div className="truncate rounded-md border border-secondary/40 bg-secondary-soft px-3 py-2 text-sm font-medium">
        {user?.firstname} {user?.lastname}
      </div>
      <div className="truncate rounded-md border border-secondary/40 bg-secondary-soft px-3 py-2 text-sm">
        {payment?.method}
      </div>
      <div className="truncate rounded-md border border-secondary/40 bg-secondary-soft px-3 py-2 text-sm">
        {payment?.amount} {payment?.currency}
      </div>
      <div className="truncate rounded-md border border-secondary/40 bg-secondary-soft px-3 py-2 text-sm">
        {payment?.id}
      </div>
    </div>
  );
};

export default PaymentInfoCard;
