import { useNavigate, useLoaderData } from "react-router-dom";
import { useState } from "react";
import { logout } from "../services/authService";

function Dashboard() {
  const { tasks } = useLoaderData();  // The data loaded by the loader
  const [taskList, setTaskList] = useState(tasks);
  const [newTask, setNewTask] = useState('');
  const [editingTaskId, setEditingTaskId] = useState(null);
  const [editingTaskTitle, setEditingTaskTitle] = useState('');
  const navigate = useNavigate();
  // Function to update task status
  const updateTaskStatus = (id, newStatus) => {
    setTaskList(taskList.map(task => 
      task.id === id ? { ...task, status: newStatus } : task
    ));
  };

  // function to add task
  const addTask = (e) => {
    e.preventDefault();
    if (newTask.trim() !== "") {
        const newTaskObj = {
            id: taskList.length +1,
            title: newTask,
            status: "to do"
        };
        setTaskList([...taskList, newTaskObj]);
        setNewTask("");
    }
  }

  // funciton to delete task
  const deleteTask = (id) => {
    setTaskList(taskList.filter( task => task.id !== id));
  }
  

  const startEditingTask = (task) => {
    setEditingTaskId(task.id);
    setEditingTaskTitle(task.title);
  }

  const saveEditedTask = (id) => {
    setTaskList(taskList.map(task => (
        task.id === id ? {...task, title: editingTaskTitle} : task
    )));
    setEditingTaskId(null)
  }

  const  handleLogout = () => {
    console.log('Logging out...');
    logout();
    navigate('/');
  }

  return (
    <div className="container mx-auto p-6">
        <nav>
            <button 
              onClick={handleLogout} 
              className= "bg-purple-500 text-white px-4 py-2 rounded"  
            >
               Logout
            </button>
        </nav>
      <h1 className="text-2xl font-bold mb-4">Tasks</h1>
      {/* Add new task for*/}
      <form onSubmit={addTask} className="mb-6">
        <input 
          type="text"
          placeholder="New task"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          className="border p-2 mr-2"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
          Add Task
        </button>
      </form>
      {/* Display tasks */}
      <div className="grid grid-cols-3 gap-4">
        {['to do', 'doing', 'done'].map(status => (
          <div key={status}>
            <h2 className="text-xl font-semibold">{status.toUpperCase()}</h2>
            <ul>
              {taskList.filter(task => task.status === status).map(task => (
                <li key={task.id} className="border p-2 my-2">
                  {editingTaskId === task.id ? (
                   <>
                   <input 
                     type="text" 
                     value={editingTaskTitle}
                     onChange={(e) => setEditingTaskTitle(e.target.value)}
                     className="border p-2 mr-2"
                     />
                     
                     <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => saveEditedTask(task.id)}
                      >
                        Save
                      </button>
                   </>
                     
                  ) : (
                    <span>{task.title}</span>
                  )}
                  <div>
                    {status !== 'done' && status !== 'doing' && (
                      <button 
                        className="bg-blue-500 text-white px-2 py-1 rounded"
                        onClick={() => updateTaskStatus(task.id, 'doing')}
                      >
                        Move to Doing
                      </button>
                    )}
                    {status === 'doing' && (
                      <button 
                        className="bg-green-500 text-white px-2 py-1 rounded"
                        onClick={() => updateTaskStatus(task.id, 'done')}
                      >
                        Move to Done
                      </button>
                    )}
                    <button 
                    className="bg-red-500 text-white px-2 py-1 rounded"
                    onClick={() => deleteTask(task.id)}
                  >
                    Delete
                  </button>
                  <button 
                    className="bg-orange-500 text-white px-2 py-1 rounded"
                    onClick={() => startEditingTask(task)}
                  >
                    Edit
                  </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
