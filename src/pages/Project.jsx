import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { getProjectById } from '../services/projectApi';
import { createTask, getAllTasks, deleteTask } from '../services/taskApi';

function Project() {
  const [loading, setLoading] = useState(true);
  const [project, setProject] = useState(null);
  const [taskTitle, setTaskTitle] = useState("");
  const [taskDescription, setTaskDescription] = useState("");
  const [taskLoading, setTaskLoading] = useState(false);
  const [task, setTask] = useState([]);
  const { id } = useParams();

  async function handleCreateTask(e) {
    e.preventDefault();
    try {
      setTaskLoading(true);
      await createTask({
        title: taskTitle,
        description: taskDescription,
        projectId: id,
      })
      const updated = await getAllTasks(id);
      setTask(updated);
      setTaskTitle("")
      setTaskDescription("")
    }
    catch (error) {
      console.log(error);
    }
    finally {
      setTaskLoading(false);
    }
  }

  useEffect(() => {
    async function fetchProject() {
      try {
        const data = await getProjectById(id);
        const taskData = await getAllTasks(id);
        setTask(taskData);
        setProject(data);
      }
      catch (error) {
        console.log(error);
      }
      finally {
        setLoading(false);
      }
    }

    fetchProject();
  }, [id])

  const handleDelete = async (taskId) => {
    try {
      setTask(prev => prev.filter(t=>t.$id !== taskId))
      deleteTask(taskId);
      
    }

    catch (error) {
      console.log(error);
    }
  }

  if (!project) return (
    <div className="min-h-screen bg-[#0f0f0f] flex items-center justify-center font-sans">
      <div className="text-center">
         <h2 className="text-xl font-semibold text-white">Project Not Found</h2>
         <p className="text-zinc-500 mt-2">The project you are looking for does not exist.</p>
      </div>
    </div>
  )

  return (
    <div className="min-h-screen bg-[#0f0f0f] px-4 sm:px-6 py-12 font-sans selection:bg-blue-500/30">
      {loading ? (
        <div className="flex items-center justify-center h-[50vh]">
          <div className="animate-pulse flex flex-col items-center">
            <div className="h-8 w-8 bg-zinc-800 rounded-full mb-4"></div>
            <p className="text-zinc-500 text-sm font-medium">Loading project...</p>
          </div>
        </div>
      ) : (
        <div className="max-w-7xl mx-auto">
          {/* Project Header */}
          <div className="bg-[#141414] border border-white/5 rounded-2xl shadow-xl p-8 mb-12 relative overflow-hidden">
            <div className="relative z-10">
                <div className="flex items-center space-x-3 mb-2">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold tracking-wider uppercase bg-blue-500/10 text-blue-400 border border-blue-500/20">
                        Project
                    </span>
                    <span className="text-zinc-600 text-sm">•</span>
                    <span className="text-zinc-500 text-sm font-mono">ID: {project.$id.substring(0, 8)}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {project.name}
                </h1>
                {project.description && (
                <p className="mt-4 text-base text-zinc-400 max-w-3xl leading-relaxed">
                    {project.description}
                </p>
                )}
            </div>
            {/* Decorative gradient blur */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/5 blur-[100px] rounded-full pointer-events-none"></div>
          </div>

          {/* Tasks Section */}
          <div>
             <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-white">Tasks</h2>
                <span className="text-sm text-zinc-500 bg-zinc-900 px-3 py-1 rounded-full border border-zinc-800">
                    {task.length} {task.length === 1 ? 'task' : 'tasks'}
                </span>
             </div>

            {/* Create Task */}
            <form
              onSubmit={handleCreateTask}
              className="flex flex-col sm:flex-row gap-4 mb-10 bg-[#141414] p-4 rounded-xl border border-white/5 shadow-lg"
            >
              <input
                value={taskTitle}
                onChange={(e) => setTaskTitle(e.target.value)}
                placeholder="What needs to be done?"
                className="flex-[2] rounded-lg bg-[#0f0f0f] border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              />
              <input
                value={taskDescription}
                onChange={(e) => setTaskDescription(e.target.value)}
                placeholder="Details (optional)"
                className="flex-[3] rounded-lg bg-[#0f0f0f] border border-zinc-800 px-4 py-3 text-sm text-zinc-100 placeholder-zinc-600 focus:outline-none focus:border-blue-500/50 focus:ring-4 focus:ring-blue-500/10 transition-all duration-200"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-8 py-3 text-sm font-medium text-white hover:bg-blue-500 active:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-900/20 whitespace-nowrap"
              >
                Add Task
              </button>
            </form>

            {/* Task List */}
            {taskLoading ? (
               <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {[1,2,3].map(i => (
                     <div key={i} className="h-32 bg-[#141414] rounded-xl border border-white/5 animate-pulse"></div>
                  ))}
               </div>
            ) : task.length === 0 ? (
              <div className="text-center py-24 rounded-2xl border border-dashed border-zinc-800 bg-[#141414]/30">
                <p className="text-zinc-500 text-sm">
                  No tasks yet. Add one above to get started.
                </p>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {task.map(t => (
                  <div
                    key={t.$id}
                    className="group bg-[#141414] border border-white/5 rounded-xl shadow-sm p-5 hover:shadow-xl hover:bg-[#1a1a1a] hover:border-zinc-700 transition-all duration-200 flex flex-col justify-between h-full"
                  >
                    <div>
                        <div className="flex items-start justify-between mb-3">
                            <h3 className="text-base font-semibold text-zinc-100 leading-snug">
                            {t.title}
                            </h3>
                            <div className="h-2 w-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)] mt-1.5 flex-shrink-0"></div>
                        </div>
                        <p className="text-sm text-zinc-500 mb-6 leading-relaxed line-clamp-4">{t.description}</p>
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t border-white/5">
                      <span className="inline-flex items-center rounded-md bg-zinc-900 border border-zinc-800 px-2 py-1 text-[10px] font-medium text-zinc-400 uppercase tracking-wider">
                        To Do
                      </span>
                      
                      <button 
                        onClick={() => handleDelete(t.$id)}
                        className="text-xs font-medium text-zinc-600 hover:text-red-400 transition-colors px-2 py-1 rounded hover:bg-red-500/10"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default Project