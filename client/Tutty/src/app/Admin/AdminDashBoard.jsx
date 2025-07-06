/* eslint-disable no-unused-vars */
import React, { useContext, useEffect } from 'react'
import Navbar from '../../components/Navbar'
import UserContainer from "../User/UserContainer"
import Sidebar from '../Sidebar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { AdminAtom } from '../../recoil/adminAtom'
import { useNavigate } from 'react-router'
import axios from 'axios'
import AdminContainer from './AdminContainer'
import { AppContext } from '../../context/AppContext'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'

const Dashboard = () => {
  const user=useRecoilValue(AdminAtom)
  console.log()
  const jwt=localStorage.getItem('jwtAdmin')
  // console.log(jwt)
  const {setIsAdmin}=useContext(AppContext)
  const setUser=useSetRecoilState(AdminAtom)
  const navigate=useNavigate()
  const ifSessionActive = async () => {
    try {
      const response = await axios.post(SERVER_ADDRESS+"/admin/verify", {}, {
        headers: {
          authorization: jwt
        }
      })
      const user=response?.data?.user

      if (response.status === 200) {
        setUser(user)
        
      } else {
        setUser(false)
        navigate('/admin/authentication')
      }

    } catch (err) {
      console.error("Session check failed:", err)
      setUser(false)
      navigate('/admin/authentication')
    }
  }

  useEffect(() => {
    setIsAdmin(true)
    console.log(user)
    if(!user){
      ifSessionActive();
    }

  }, [jwt])


  return (
    <div className='h-fit min-h-[90svh]'>
        <Navbar></Navbar>
        <div className='flex h-fit min-h-[95svh]'>
            <div className='not-md:hidden '>
              <Sidebar></Sidebar>
            </div>
            <div className='overflow-y-scroll w-full'>
              <AdminContainer/>
            </div>
        </div>
    </div>
  )
}

export default Dashboard  