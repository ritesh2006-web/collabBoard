import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { registerUser } from '../services/authService'

function Register() {
    const [email, setEmail] = useState("")
    const [name, setName] = useState("")
    const [password, setPassword] = useState("")

    const navigate = useNavigate();

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            await registerUser(name, email, password);
            navigate('/login')
        }
        catch (error) {
            throw error;
        }
    }

    return (
        <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center px-4 font-sans selection:bg-blue-500/30">
            <form
                onSubmit={handleRegister}
                className="w-full max-w-md bg-[#141414] border border-white/5 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.4)] p-8 sm:p-10 space-y-8 backdrop-blur-sm"
            >
                <div className="text-center sm:text-left">
                    <h1 className="text-3xl font-bold tracking-tight text-white">
                        Create an account
                    </h1>
                    <p className="text-sm text-zinc-400 mt-2">
                        Get started with your new account
                    </p>
                </div>

                <div className="space-y-4">
                    <input
                        type="text"
                        value={name}
                        placeholder="Name"
                        onChange={(e) => setName(e.target.value)}
                        className="w-full rounded-xl bg-[#0f0f0f] border border-zinc-800/50 px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />

                    <input
                        type="email"
                        value={email}
                        placeholder="Email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full rounded-xl bg-[#0f0f0f] border border-zinc-800/50 px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />

                    <input
                        type="password"
                        value={password}
                        placeholder="Password"
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full rounded-xl bg-[#0f0f0f] border border-zinc-800/50 px-4 py-3.5 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />
                </div>

                <button
                    type="submit"
                    className="w-full rounded-xl bg-blue-600 px-4 py-3.5 text-sm font-semibold text-white hover:bg-blue-500 active:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-900/20 hover:shadow-blue-900/40"
                >
                    Create Account
                </button>
            </form>
        </div>
    )
}

export default Register