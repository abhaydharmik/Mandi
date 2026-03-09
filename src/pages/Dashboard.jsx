import React from 'react'
import Navbar from '../components/Navbar'

const Dashboard = () => {
  document.title = "Mandi | Dashboard"

  const user = JSON.parse(localStorage.getItem("user"))

  return (
    <div>
      <Navbar />

      <div className="px-8 py-4">
        <h1 className="text-xl  text-right font-bold">
          Welcome {user?.name}
        </h1>
      </div>
    </div>
  )
}

export default Dashboard