import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {

  document.title = "Mandi | Login"

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const storedUser = JSON.parse(localStorage.getItem("user"))

    if(storedUser && email === storedUser.email  && password === storedUser.password){
      localStorage.setItem("session", Date.now())
      navigate("/dashboard")
    }else{
      alert("Invalid credentials")
    }
  }

  return (
    <div className='flex flex-col  items-center justify-center h-screen'>
      <div className="shadow-lg border p-6 w-80  rounded-lg">
      <form onSubmit={handleLogin} className=' flex flex-col justify-center text-center space-y-4'>
        <h2 className="text-center font-bold text-2xl mb-4">Login</h2>

        <input
            type="email"
            name="email"
            placeholder="Enter email"
            className="border p-2 rounded-xl"
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            name="name"
            placeholder="Enter password"
            className="border p-2 rounded-xl"
            onChange={(e) => setPassword(e.target.value)}
          />

        <button
            type="submit"
            className="mt-6 bg-black text-white w-full p-2 text-center rounded-xl hover:bg-gray-800"
          >
            Login
          </button>
      </form>

      <p className="text-center text-obsidian-500 text-sm font-body mt-6">
            Don't have an account?{' '}
            <Link to="/register" className="text-gold-400 hover:text-gold-300 transition-colors font-medium">
              Create one
            </Link>
          </p>
      </div>
    </div>
  )
}

export default Login  