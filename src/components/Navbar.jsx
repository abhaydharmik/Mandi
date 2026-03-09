import React from 'react'
import { Link, useNavigate } from 'react-router-dom'

const Navbar = () => {

    const navigate = useNavigate()

    const logout = () => {
        localStorage.removeItem("session")
        navigate("/")
    }

  return (
    <div className='bg-black text-white flex justify-between items-center px-8 py-6 m-4 rounded-full border-2'>
        <div>
            <h1 className='text-xl font-bold'>Mandi</h1>
        </div>

        <div className='flex space-x-4 items-center'>
            <Link to={"/dashboard"}>Dashboard</Link>
            <Link to={"/products"}>Products</Link>
            <Link to={"/cart"}>Cart</Link>
            <Link to={"/profile"}>Profile</Link>

            <button className='bg-red-500 px-2 py-1 rounded-lg text-white font-medium' onClick={logout}>Logout</button>
        </div>
    </div>
  )
}

export default Navbar