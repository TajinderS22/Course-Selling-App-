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
        setIsAdmin(true)
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
    if (!user && jwt) {
      ifSessionActive()
    } else if (!jwt) {
      navigate('/admin/authentication')
    }
  }, [user, jwt])
 

  return (
    <div className='h-fit min-h-[90svh]'>
        <Navbar></Navbar>
        <div className='flex h-fit min-h-[95svh]'>
            <Sidebar></Sidebar>
            <AdminContainer/>
        </div>
    </div>
  )
}

export default Dashboard