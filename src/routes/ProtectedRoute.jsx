import React from 'react'
import { Navigate } from 'react-router-dom'

const ProtectedRoute = ({children}) => {

    const session = localStorage.getItem("session")

    if(!session){
        return <Navigate to={"/"}/>
    }


    const loginTime = Number(session)

    const currentTime = Date.now()

    const isExpired = currentTime - loginTime > 5 * 60 * 1000

    if(isExpired){
        localStorage.removeItem("session")
        alert("Session expired. Login again.")
        return <Navigate to={"/"} />
    }

  return children
}

export default ProtectedRoute