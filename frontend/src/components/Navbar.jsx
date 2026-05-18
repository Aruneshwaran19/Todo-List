import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()
  const handleLogout = () => { logout(); navigate('/login') }

  return (
    <nav className="navbar">
      <div className="brand">✅ TodoApp</div>
      {user && (
        <div className="nav-right">
          <span>Hi, {user.name}</span>
          <button onClick={handleLogout}>Logout</button>
        </div>
      )}
    </nav>
  )
}
