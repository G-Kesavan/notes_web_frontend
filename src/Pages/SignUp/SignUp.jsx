import Navbar from '../../Components/Navbar/Navbar'
import Password from '../../Components/Input/Password'
import { Link, useNavigate } from 'react-router-dom'
import { validEmail } from '../../utils/helper'
import { useState } from 'react'
import axiosInstance from '../../utils/axiosInstance'

const SignUp = () => {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState(null)

   const navigate = useNavigate()

  const handleSignUp = async (e) =>{
    e.preventDefault();

     if(!validEmail(email)) {
      setError("Please enter a valid email address")
      return;
     }

     if(!name){
      setError("Please enter a name")
      return;
     }

     if(!password){
      setError("Please enter a password")
      return;
     }

     setError('')

      try{
        const response = await axiosInstance.post("/create-account",{
          fullName:name,
          email : email,
          password : password
        })

        if(response.data && response.data.accessToken){
          localStorage.setItem("token",response.data.accessToken);
          navigate("/dashboard")
        }
     }catch(error){
        if(error.response && error.response.data && error.response.data.message){
          setError(error.response.data.message)
        }else{
          setError("An Unexpected error occurred. pleace try again")
        }
     }

  }
  return (
    <>
      <Navbar/>
      <div className="relative flex justify-center bg-blue-50 items-center h-[90vh] w-full z-0">
          <div className="relative flex items-center bg-blue-100 rounded-2xl px-6 py-8 border-[1px] border-blue-200/5 shadow-2xl after:bg-conic-animated">  
          <form className='flex flex-col gap-2' onSubmit={handleSignUp}>
            <h4 
              className='flex w-full items-center justify-center font-bold text-blue-900 text-xl'
            >Sign Up</h4>
            <input 
              value={name}
              onChange={(e)=>setName(e.target.value)}
              type="text" 
              placeholder='Name'
              className="iinput—box text-blue-900 border-[1px] p-2 rounded-sm border-blue-900 outline-none"
            />
            <input 
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type="email" 
              placeholder='Email'
              className="input—box text-blue-900 border-[1px] p-2 rounded-sm border-blue-900 outline-none"
            />
            <Password
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
            />

            {error&&<p className='text-red-700'>{error}</p>}

            <button 
              type="submit" 
              className="cursor-pointer hover:shadow-md shadow-blue-700 btn—primary border-[1px] rounded-sm p-1 bg-blue-300 border-blue-900"
            >
              Sign Up
            </button>
            <p className='text-center text-blue-950' >
              Already have an account?&nbsp;
              <Link to= '/login' className='text-blue-700' >Login</Link>
            </p>
          </form>
        </div>
      </div>
  </>
  )
}

export default SignUp