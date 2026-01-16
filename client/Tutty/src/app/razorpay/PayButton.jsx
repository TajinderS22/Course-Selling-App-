import axios from 'axios';
import React from 'react'
import { useEffect } from 'react';
import { SERVER_ADDRESS } from '../../Secrets/Secrets';
import useActiveSession from '../../hooks/useActiveSession';
import { useNavigate } from 'react-router';
// import { setUserCourses } from '../../store/slices/userCourses';
// import { useDispatch } from 'react-redux';

const PayButton = ({courseId,setPayPopup}) => {

    // const dispatch=useDispatch()

    const {jwt}=useActiveSession()
    const navigate= useNavigate()

    useEffect(() => {
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.async = true;
      document.body.appendChild(script);
    }, []);


    const handlePayment=async ()=>{
        const res= await axios.post(SERVER_ADDRESS+"/course/create-order",{
            courseId
        },{
            headers:{
                authorization:jwt
            }
        })

        const order=res.data.order;

        const options = {
          key: "rzp_live_S1iZX0P0U2cyQO",
          amount: order.amount,
          vurrency: "INR",
          order_id: order.id,
          handler: async (response) => {
            const res = await axios.post(
              SERVER_ADDRESS + "/course/verify-payment",
              { response,courseId },
              {
                headers: {
                  authorization: jwt,
                },
              }
            );
            if (res.data.success) {
                setPayPopup(false);
              alert("payment success");
              navigate("/dashboard")
              
            } else alert("payment failed");
          },
          theme: {
            color: "#3399cc",
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.open();
    }


  return (
    <button className='bg-emerald-500 p-2 border
    
    rounded-lg w-full' onClick={handlePayment}>
        Pay now
    </button>
  )
}

export default PayButton