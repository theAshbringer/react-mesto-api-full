import React from 'react'
import { Navigate } from 'react-router'

const ProtectedRoute = ({ loggedIn, children }) => {
  return loggedIn ? children : <Navigate to={'/sign-in'} replace />
}

export default ProtectedRoute