import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { logoutUser } from '../services/authService'
import { useAuth } from '../context/AuthContext';

function Header() {
  const { setUser, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  async function logout() {
    await logoutUser();
    setUser(null);
    navigate('/login')

  }
  return (
    <nav className="bg-[#141414]/80 backdrop-blur-md border-b border-white/5 sticky top-0 z-50 font-sans">
      <ul className="max-w-7xl mx-auto flex items-center gap-8 px-6 py-4 text-sm">


        {isAuthenticated ? (<>
          <Link to={"/profile"} className="text-zinc-400 hover:text-white transition-colors font-medium">
            <li>Profile</li>
          </Link>
          <Link to={"/"} className="text-zinc-400 hover:text-white transition-colors font-medium">
            <li>Dashboard</li>
          </Link>

        </>) : <>
          <Link to={"/login"} className="text-zinc-400 hover:text-white transition-colors font-medium">
            <li>Login</li>
          </Link>

          <Link to={"/register"} className="text-zinc-400 hover:text-white transition-colors font-medium">
            <li>Register</li>
          </Link>

        </>}
        {/* <Link to={"/"}><li>Projects</li></Link> */}


        {isAuthenticated ? (<li className="ml-auto">
          <button
            onClick={logout}
            className="rounded-lg border border-white/10 bg-[#0f0f0f] px-4 py-2 text-xs font-medium text-zinc-400 hover:bg-zinc-800 hover:text-white hover:border-zinc-700 transition-all shadow-sm"
          >
            Logout
          </button>
        </li>) : (null)}
      </ul>
    </nav>
  )
}

export default Header