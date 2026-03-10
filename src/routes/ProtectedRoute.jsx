import React from 'react';
import { Navigate } from 'react-router-dom';

export const SESSION_DURATION = 5 * 60 * 1000; // 5 minutes

const ProtectedRoute = ({ children }) => {
  const session = localStorage.getItem("session");

  if (!session) return <Navigate to="/" />;

  const isExpired = Date.now() - Number(session) > SESSION_DURATION;

  if (isExpired) {
    localStorage.removeItem("session");
    alert("Session expired. Please login again.");
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;