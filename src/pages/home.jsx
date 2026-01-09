import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function home() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#0f0f0f] overflow-hidden font-sans selection:bg-blue-500/30 text-white">
      
      {/* Interactive Background Glow */}
      <div 
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          background: `radial-gradient(600px at ${mousePosition.x}px ${mousePosition.y}px, rgba(29, 78, 216, 0.15), transparent 80%)`
        }}
      />

      {/* Static Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-blue-600/20 rounded-full blur-[128px] pointer-events-none opacity-50 animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-purple-600/10 rounded-full blur-[128px] pointer-events-none opacity-50"></div>

      {/* Main Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-24 pb-12 sm:pt-32 sm:pb-20">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-24">
          <div className="inline-flex items-center px-3 py-1 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 text-xs font-medium mb-8 uppercase tracking-widest shadow-[0_0_10px_rgba(59,130,246,0.2)]">
            v2.0 Now Available
          </div>
          
          <h1 className="text-5xl sm:text-7xl font-bold tracking-tight mb-8 bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-500 pb-2">
            COLLAB PROJECT
          </h1>
          
          <p className="text-lg sm:text-xl text-zinc-400 mb-10 leading-relaxed max-w-2xl mx-auto">
            The ultimate workspace for engineering teams. Plan, build, and ship faster with a project management tool designed for the modern web.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link 
              to="/login"
              className="group relative inline-flex items-center justify-center px-8 py-3.5 text-base font-semibold text-white bg-blue-600 rounded-full overflow-hidden transition-all duration-300 hover:bg-blue-500 hover:scale-105 hover:shadow-[0_0_20px_rgba(37,99,235,0.5)]"
            >
              <span className="relative z-10">Join Now</span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </Link>
            
            <Link 
              to="/login"
              className="inline-flex items-center justify-center px-8 py-3.5 text-base font-medium text-zinc-300 bg-[#141414] border border-white/10 rounded-full transition-all hover:bg-white/5 hover:text-white"
            >
              Read Documentation
            </Link>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FeatureCard 
                icon="⚡"
                title="Lightning Fast"
                description="Built on modern React architecture for instant page loads and seamless interactions."
            />
            <FeatureCard 
                icon="🔒"
                title="Secure by Default"
                description="Enterprise-grade security with encrypted data storage and role-based access control."
            />
            <FeatureCard 
                icon="🤝"
                title="Real-time Collab"
                description="Work together with your team in real-time. See changes as they happen."
            />
        </div>

        {/* Bottom CTA / Stats */}
        <div className="mt-24 border-t border-white/5 pt-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatItem value="10k+" label="Active Users" />
            <StatItem value="500+" label="Companies" />
            <StatItem value="99.9%" label="Uptime" />
            <StatItem value="24/7" label="Support" />
        </div>
      </div>
    </div>
  )
}

/* Helper Components */

function FeatureCard({ icon, title, description }) {
    return (
        <div className="group p-8 rounded-3xl bg-[#141414]/50 backdrop-blur-sm border border-white/5 hover:border-white/10 transition-all duration-300 hover:bg-[#1a1a1a] hover:translate-y-[-5px]">
            <div className="w-12 h-12 rounded-xl bg-blue-600/10 flex items-center justify-center text-2xl mb-6 group-hover:scale-110 transition-transform duration-300">
                {icon}
            </div>
            <h3 className="text-xl font-bold text-white mb-3">{title}</h3>
            <p className="text-zinc-500 leading-relaxed group-hover:text-zinc-400 transition-colors">
                {description}
            </p>
        </div>
    )
}

function StatItem({ value, label }) {
    return (
        <div className="flex flex-col items-center">
            <div className="text-3xl sm:text-4xl font-bold text-white mb-2">{value}</div>
            <div className="text-sm text-zinc-500 font-medium uppercase tracking-wider">{label}</div>
        </div>
    )
}

export default home