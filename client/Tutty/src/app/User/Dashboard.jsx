import React, { useContext, useEffect,  } from 'react'
import Navbar from '../../components/Navbar'
import UserContainer from "./UserContainer"
import Sidebar from '../Sidebar'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { UserAtom } from '../../recoil/userAtom'
import { useNavigate } from 'react-router'
import axios from 'axios'
import { AppContext } from '../../context/AppContext'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'

const Dashboard = () => {
  const user=useRecoilValue(UserAtom)
  const jwt=localStorage.getItem('jwt')
  const {setIsAdmin}=useContext(AppContext)
  setIsAdmin(false)

  const setUser=useSetRecoilState(UserAtom)
  const navigate=useNavigate()

  const ifSessionActive = async () => {
    try {
      const response = await axios.post(SERVER_ADDRESS+"/user/verify", {}, {
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
  // const isMdUp = useBreakpoint();
  // const [open] = useState(isMdUp);

  return (
    <div className='h-fit min-h-[90svh]'>
        <Navbar></Navbar>
        <div className='flex  min-h-[95svh]  '>
            <div className='hidden md:block'>
              <Sidebar ></Sidebar>
            </div>
            <div className='overflow-y-scroll w-full'>
              <UserContainer ></UserContainer>
            </div>
            
        </div>
    </div>
  )
}

export default Dashboard