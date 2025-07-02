/* eslint-disable react-hooks/rules-of-hooks */
import React,{useContext, useRef,useEffect} from 'react'
import Navbar from '../Navbar'
import { AppContext } from '../../context/AppContext'
import axios from 'axios'
import { useNavigate} from 'react-router'
import { useRecoilState } from 'recoil'
import { UserAtom } from '../../recoil/userAtom'
import { SERVER_ADDRESS } from '../../Secrets/Secrets'

const Authentication = () => {
    const {onSignup,setOnSignup}=useContext(AppContext)
    const {authenticationMessage,setAuthenticationMessage}=useContext(AppContext)
    const fNameRef=useRef()
    const lNameRef=useRef()
    const emailRef=useRef()
    const passwordRef=useRef()
    const navigate=useNavigate()

    const [user,setUser] = useRecoilState(UserAtom);

    const jwtFromStorage=localStorage.getItem('jwt')
    if(jwtFromStorage){
      const ifSessionActive = async () => {
        try {
          console.log(jwtFromStorage)
          const response = await axios.post(SERVER_ADDRESS+"/user/verify", {}, {
            headers: {
              authorization: `${jwtFromStorage}`
            }
          })
          console.log(response)
          const user=response?.data?.user
    
          if (response.status === 200) {
            setUser(user)
            navigate('/dashboard')
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
        if (!user && jwtFromStorage) {
          ifSessionActive()
        } else if (!jwtFromStorage) {
          navigate('/authentication')
        }
      }, [user, jwtFromStorage])
     
    }

    const handleAuthenticationSubmit =()=>{
      const firstname=fNameRef.current?.value
      const lastname=lNameRef.current?.value
      const email=emailRef.current.value
      const password=passwordRef.current.value
      

      onSignup?
      signup({
        firstname,
        lastname,
        email,
        password
      })
      :
      login({
        email,
        password
      })
      

}



const login = async ({ email, password }) => {
    const data = { email, password };
    console.log("Sending data:", data);
    try {

      const response = await axios.post(SERVER_ADDRESS+"/user/signin", data);
      if (response.status === 200) {
        const jwtToken = response.data.token;
        // Save token
        localStorage.setItem("jwt", jwtToken);
        console.log("after saving")
        // Set global state if using Recoil
        setUser(response.data.user);
        navigate('/dashboard');
      }
    } catch (error) {
      const msg = error?.response?.data?.message || "Login failed";
      setAuthenticationMessage(msg);
      console.error("Login error:", msg);
    }
}


const signup=async ({email,password,firstname,lastname})=>{
  const data={email,password,firstname,lastname}
  console.log(data)
  const response=await axios.post(SERVER_ADDRESS+"/user/signup",data)
  console.log(response)
  await alert(response.data.message)
  setOnSignup(false)
}



return (
    <div className=' bg-[#e8fffdcf]'>
        <Navbar/>
        <div className=' h-[90svh] flex relative top-48  justify-center '>
            
            <div action=""  className='flex flex-col justify-around h-fit min-h-[400px] rounded-md bg-[#0fa3b1]/50 p-4 /12 min-w-[300px] w-fit '>
                <p className=' text-2xl font-medium max-w-[400px] m-4   '>
                  {onSignup?"Sign Up to the New Version of yourself":"Login to your bright future"}</p>
                {onSignup&&
                <input ref={fNameRef} type="text" className='bg-[#ede7e3] m-2 p-2   rounded-lg' placeholder='First Name ' />
                }
                {onSignup&& 
                <input ref={lNameRef} type="text" className='bg-[#ede7e3] m-2 p-2 rounded-lg' placeholder='Last Name ' />
                }
                <input ref={emailRef} type="text" className='bg-[#ede7e3] m-2 p-2   rounded-lg' placeholder='email@gmail.com ' />
                <input ref={passwordRef} type="password" className='bg-[#ede7e3] m-2 p-2   rounded-lg ' placeholder='password ' />

                <p className='m-3 text-red-700 font-semibold'>
                  {authenticationMessage}
                </p>

                <button className=' bg-[#0fa3b1] w-11/12 mx-auto min-w-[80px] p-2 rounded-xl mt-2 '
                  onClick={()=>{
                    handleAuthenticationSubmit()
                  }}
                
                >
                  {onSignup?"Signup":"Login"}
                </button>
                
                <div className='m-4'>
                  {onSignup?
                   <div className='flex items-center '>
                    Already a user?
                    <div className='  min-w-[80px] p-2 text-cya-900 font-semibold rounded-xl '  
                      onClick={(e)=>{
                      e.preventDefault()
                      setAuthenticationMessage(null)
                      setOnSignup(!onSignup)
                    }}>
                      {onSignup?"Login":"Signup"}
                    </div>
                   </div> 
                   :
                   <div className='flex items-center '>
                    New here?
                    <div className='  min-w-[80px] p-2 text-cyan-900 font-semibold rounded-xl '  
                      onClick={(e)=>{
                      e.preventDefault()
                      setAuthenticationMessage(null)
                      setOnSignup(!onSignup)
                    }}>
                      {onSignup?"Login":"Signup"}
                    </div>
                   </div>
                  }
                </div>
            </div>
            
        </div>
    </div>
  )
}

export default Authentication;