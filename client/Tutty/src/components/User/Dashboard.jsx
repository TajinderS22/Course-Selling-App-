import React, { useEffect } from 'react'
import Navbar from '../Navbar'
import UserContainer from './UserContainer'
import Sidebar from './Sidebar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UserAtom } from '../../recoil/userAtom'
import { useNavigate } from 'react-router'
import axios from 'axios'

const Dashboard = () => {
  const user=useRecoilValue(UserAtom)
  const jwt=localStorage.getItem('jwt')
  console.log(jwt)

  const setUser=useSetRecoilState(UserAtom)
  const navigate=useNavigate()

  const ifSessionActive = async () => {
    try {
      const response = await axios.post("http://localhost:3000/user/verify", {}, {
        headers: {
          authorization: jwt
        }
      })
      const user=response.data.user

      console.log(response)

      if (response.status === 200) {
        setUser(user)
      } else {
        setUser(false)
        navigate('/authentication')
      }
    } catch (err) {
      console.error("Session check failed:", err)
      setUser(false)
      navigate('/authentication')
    }
  }

  useEffect(() => {
    if (!user && jwt) {
      ifSessionActive()
    } else if (!jwt) {
      navigate('/authentication')
    }
  }, [user, jwt])
 

  return (
    <div className='h-fit min-h-[90svh]'>
        <Navbar></Navbar>
        <div className='flex h-fit min-h-[95svh]'>
            <Sidebar></Sidebar>
            <UserContainer></UserContainer>
        </div>
    </div>
  )
}

export default Dashboard