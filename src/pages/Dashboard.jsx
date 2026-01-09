import React, { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getMyProjects, createProject } from '../services/projectApi'
import { Link } from 'react-router-dom'

function Dashboard() {
    const { user, isAuthenticated } = useAuth();

    const [projectName, setProjectName] = useState("");
    const [projectDescription, setProjectDescription] = useState("");
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [creating, setCreating] = useState(false);

    const createNewProject = async (e) => {
        e.preventDefault();

        try {
            setCreating(true);

            await createProject({
                name: projectName,
                description: projectDescription,
                ownerId: user.$id,
            });

            const data = await getMyProjects(user.$id);
            setProjects(data);

            setProjectName("");
            setProjectDescription("");
        }
        catch (error) {
            console.error("Create project error:", error);
        }
        finally {
            setCreating(false);
        }
    };

    useEffect(() => {
        if (!user) {
            setLoading(false);
            return;
        }

        async function fetchMyProjects() {
            try {
                const data = await getMyProjects(user.$id);
                setProjects(data);
                setLoading(false);
            }
            catch (error) {
                console.error("Fetch projects error:", error);
            }

        }
        fetchMyProjects();
    }, [user]);

    return (
        <div className="min-h-screen bg-[#0f0f0f] px-4 sm:px-6 py-12 font-sans selection:bg-blue-500/30">
            {/* Header */}
            <div className="max-w-7xl mx-auto mb-12">
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                    {isAuthenticated ? `Welcome back, ${user.name}` : "Dashboard"}
                </h1>
                <p className="text-base text-zinc-400 mt-2 max-w-2xl">
                    Manage your projects, collaborate with your team, and track progress all in one place.
                </p>
            </div>

            {/* Create Project */}
            <div className="max-w-7xl mx-auto mb-16">
                <form
                    onSubmit={createNewProject}
                    className="bg-[#141414] rounded-2xl border border-white/5 p-4 sm:p-6 flex flex-col sm:flex-row gap-4 shadow-2xl shadow-black/50"
                >
                    <input
                        type="text"
                        placeholder="Project name"
                        value={projectName}
                        onChange={(e) => setProjectName(e.target.value)}
                        required
                        className="flex-1 rounded-xl bg-[#0f0f0f] border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />
                    <input
                        type="text"
                        placeholder="Description (optional)"
                        value={projectDescription}
                        onChange={(e) => setProjectDescription(e.target.value)}
                        className="flex-[2] rounded-xl bg-[#0f0f0f] border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
                    />
                    <button
                        type="submit"
                        className="inline-flex items-center justify-center rounded-xl bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500 active:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 shadow-lg shadow-blue-900/20"
                        disabled={creating}
                    >
                        {creating ? "Creating..." : "New Project"}
                    </button>
                </form>
            </div>

            {/* Projects Grid */}
            <div className="max-w-7xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-lg font-semibold text-zinc-200">Recent Projects</h2>
                    {loading && <span className="text-xs text-zinc-500 animate-pulse">Syncing...</span>}
                </div>
                
                {!isAuthenticated ? (
                    <div className="text-center py-32 rounded-3xl border border-dashed border-zinc-800 bg-[#141414]/50">
                        <p className="text-zinc-500 text-base">Sign in to view your workspace</p>
                    </div>
                ) : loading ? (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {[1,2,3].map(i => (
                             <div key={i} className="h-40 rounded-2xl bg-[#141414] border border-white/5 animate-pulse"></div>
                        ))}
                    </div>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {projects.length !== 0 ? (
                            projects.map((project) => (
                                <Link
                                    key={project.$id}
                                    to={`/project/${project.$id}`}
                                    className="group relative bg-[#141414] border border-white/5 rounded-2xl p-6 shadow-lg hover:shadow-2xl hover:bg-[#1a1a1a] hover:border-zinc-700 transition-all duration-300 flex flex-col h-full"
                                >
                                    <div className="mb-4">
                                        <div className="h-10 w-10 rounded-lg bg-gradient-to-br from-zinc-800 to-zinc-900 border border-white/5 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                                           <span className="text-lg font-bold text-zinc-400 group-hover:text-blue-400 transition-colors">
                                               {project.name.charAt(0).toUpperCase()}
                                           </span>
                                        </div>
                                        <h3 className="text-lg font-semibold text-zinc-100 group-hover:text-blue-400 transition-colors">
                                            {project.name}
                                        </h3>
                                    </div>
                                    
                                    {project.description ? (
                                        <p className="text-sm text-zinc-500 line-clamp-3 leading-relaxed">
                                            {project.description}
                                        </p>
                                    ) : (
                                        <p className="text-sm text-zinc-700 italic">No description</p>
                                    )}
                                    
                                    <div className="mt-auto pt-6 flex items-center text-xs font-medium text-zinc-600 group-hover:text-zinc-400 transition-colors">
                                        View Project <span className="ml-1 transition-transform group-hover:translate-x-1">→</span>
                                    </div>
                                </Link>
                            ))
                        ) : (
                            <div className="col-span-full text-center py-32 rounded-3xl border border-dashed border-zinc-800 bg-[#141414]/50">
                                <p className="text-zinc-500 text-base">No projects found. Create your first one above.</p>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default Dashboard;