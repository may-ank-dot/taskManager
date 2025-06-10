import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'

const API = "http://localhost:5000/api/tasks"

function App() {
  const [tasks, setTasks] = useState([]);
  const [form, setForm] = useState({ title: "", description: "" });

  const fetchTasks = async () => {
    const res = await axios.get(API);
    setTasks(res.data);
  };

  const createTask = async () => {
    if (!form.title.trim()) return alert("Title is required!");
    await axios.post(API, form);
    setForm({ title: "", description: "" });
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchTasks();
  };

  const toggleStatus = async (task) => {
    await axios.put(`${API}/${task._id}`, {
      ...task,
      status: task.status === "Pending" ? "Completed" : "Pending"
    });
    fetchTasks();
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-800 mb-2 flex items-center justify-center gap-2">
            <span className="text-orange-500">📝</span>
            Task Manager
          </h1>
          <p className="text-slate-600">Keep track of your daily tasks</p>
        </div>

        <div className="bg-white shadow-md rounded-lg p-6 mb-6 border border-slate-200">
          <h2 className="text-xl font-semibold text-slate-800 mb-4 flex items-center gap-2">
            <span className="w-2 h-2 bg-orange-500 rounded-full"></span>
            Add New Task
          </h2>

          <div className="space-y-4">
            <input
              className="w-full border border-slate-300 p-3 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none text-slate-800 placeholder-slate-400"
              placeholder="Task title"
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              onKeyPress={(e) => e.key === 'Enter' && createTask()}
            />

            <textarea
              className="w-full border border-slate-300 p-3 rounded-md focus:border-orange-500 focus:ring-1 focus:ring-orange-500 outline-none resize-none text-slate-800 placeholder-slate-400"
              placeholder="Description (optional)"
              rows="3"
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
            />

            <button
              className="bg-orange-500 text-white py-3 px-6 rounded-md font-medium hover:bg-orange-600 w-full sm:w-auto"
              onClick={createTask}
            >
              Add Task
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4 mb-6">
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
            <div className="text-2xl font-bold text-slate-700">{tasks.length}</div>
            <div className="text-sm text-slate-500">Total</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center">
            <div className="text-2xl font-bold text-amber-600">
              {tasks.filter(t => t.status === "Pending").length}
            </div>
            <div className="text-sm text-slate-500">Pending</div>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-slate-200 text-center col-span-2 sm:col-span-1">
            <div className="text-2xl font-bold text-emerald-600">
              {tasks.filter(t => t.status === "Completed").length}
            </div>
            <div className="text-sm text-slate-500">Done</div>
          </div>
        </div>

        <div className="bg-white shadow-md rounded-lg border border-slate-200">
          <div className="p-6 border-b border-slate-200">
            <h3 className="text-lg font-semibold text-slate-800 flex items-center gap-2">
              <span className="w-2 h-2 bg-emerald-500 rounded-full"></span>
              Your Tasks
            </h3>
          </div>

          <div className="p-6">
            {tasks.length === 0 ? (
              <div className="text-center py-12">
                <div className="text-6xl mb-4 text-slate-300">📋</div>
                <h3 className="text-lg font-medium text-slate-600 mb-2">No tasks yet</h3>
                <p className="text-slate-500">Add your first task to get started!</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tasks.map((task) => (
                  <div
                    key={task._id}
                    className={`p-5 rounded-lg border-2 ${task.status === "Completed"
                      ? "bg-emerald-50 border-emerald-200"
                      : "bg-slate-50 border-slate-200"
                      }`}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 flex-1">
                        <button
                          onClick={() => toggleStatus(task)}
                          className={`mt-1 w-5 h-5 rounded border-2 flex items-center justify-center ${task.status === "Completed"
                            ? "bg-emerald-500 border-emerald-500 text-white"
                            : "border-slate-300 hover:border-emerald-400"
                            }`}
                        >
                          {task.status === "Completed" && (
                            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </button>

                        <div className="flex-1">
                          <h2 className={`text-lg font-semibold ${task.status === "Completed"
                            ? "text-emerald-700 line-through"
                            : "text-slate-800"
                            }`}>
                            {task.title}
                          </h2>

                          {task.description && (
                            <p className={`mt-1 text-sm ${task.status === "Completed"
                              ? "text-emerald-600"
                              : "text-slate-600"
                              }`}>
                              {task.description}
                            </p>
                          )}

                          <div className="mt-2">
                            <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${task.status === "Completed"
                              ? "bg-emerald-100 text-emerald-700"
                              : "bg-amber-100 text-amber-700"
                              }`}>
                              {task.status}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row gap-2">
                        <button
                          className={`px-3 py-2 rounded-md text-sm font-medium ${task.status === "Completed"
                            ? "bg-amber-500 text-white hover:bg-amber-600"
                            : "bg-emerald-500 text-white hover:bg-emerald-600"
                            }`}
                          onClick={() => toggleStatus(task)}
                        >
                          {task.status === "Completed" ? "Undo" : "Complete"}
                        </button>

                        <button
                          className="bg-red-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-red-600"
                          onClick={() => deleteTask(task._id)}
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
