import React from 'react'
import { useAuth } from '../context/AuthContext'

function Profile() {
  const { user } = useAuth();
  return (
    <div className="min-h-screen bg-[#0f0f0f] px-6 py-12 font-sans selection:bg-blue-500/30">
      <div className="max-w-3xl mx-auto">
        <div className="bg-[#141414] border border-white/5 rounded-2xl shadow-xl p-8 sm:p-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="h-12 w-12 rounded-full bg-blue-600/20 flex items-center justify-center text-blue-500 font-bold text-xl">
              {user.name.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-2xl font-bold text-white tracking-tight">Profile Settings</h1>
              <p className="text-zinc-500 text-sm">Manage your account information</p>
            </div>
          </div>
          
          <div className="border-t border-white/5 pt-6">
            <p className="text-zinc-400 text-base leading-relaxed">
              Logged in as <span className="text-white font-medium ml-1">{user.name}</span>
            </p>
             <p className="text-zinc-500 text-sm mt-1">
              {user.email}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile