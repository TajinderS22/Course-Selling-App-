import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { SERVER_ADDRESS } from '../../../Secrets/Secrets'
import useActiveSession from '../../../hooks/useActiveSession'
import PurchaseCard from './PurchaseCard'
import Navbar from "../../../components/Navbar"
import Sidebar from "../../Sidebar"
const Purchases = () => {

    const {jwt}=useActiveSession()

    const [purchases,setPurchases]=useState(null)
    console.log(purchases)
    const getAllPayments=async()=>{
        const res= await axios.get(SERVER_ADDRESS+"/user/purchases",{
            headers:{
                authorization:jwt
            }
        })
        console.log(res.data)
        setPurchases(res.data.payments)
    }

    useEffect(()=>{
        getAllPayments()
    },[])

    return (
      <div>
        <Navbar />
        <div className='flex max-h-svh overflow-scroll '>
          <Sidebar />
          <div className='bg-white/40 flex-1 '>
            <div className='text-xl font-semibold m-2 my-6 ml-4'>Your Purchase history</div>

            <div className='w-fit   m-2 '>
              {purchases && (
                <div>
                  {purchases.map((purchase) => {
                    return (
                      <PurchaseCard key={purchase.id} purchase={purchase} />
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    );
}

export default Purchases