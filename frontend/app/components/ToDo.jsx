'use client'
import { useEffect, useState } from "react"

const Todo = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
  
    // Fetch tasks from backend API
    const fetchTasks = async () => {
        try {
            const response = await fetch('http://localhost:8080/tasks');
            const data = await response.json();
            console.log("Fetched data:", data);
            const tasksArray = data.map(doc => ({
                id: doc.id,
                name: doc.name,
                completed: false,
            }));
            setTasks(tasksArray);
            console.log("Tasks set:", tasksArray);
        } catch (error) {
            console.error('Error fetching tasks:', error);
        }
    };
  
    // Add a new task to backend API
    const addTask = async () => {
      if (newTask.trim() === '') return; // Don't add empty tasks
      try {
        await fetch('http://localhost:8080/tasks', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ name: newTask }),
        });
        setNewTask(''); // Clear the input after adding
        fetchTasks(); // Refresh the task list
      } catch (error) {
        console.error('Error adding task:', error);
      }
    };
  
    // Delete a task by ID from backend API
    const deleteTask = async (taskId) => {
      try {
        await fetch(`http://localhost:8080/tasks/${taskId}`, {
          method: 'DELETE',
        });
        fetchTasks(); // Refresh the task list after deletion
      } catch (error) {
        console.error('Error deleting task:', error);
      }
    };

    // Handle task completion toggle
    const handleToggle = (taskId) => {
        setTasks(prevTasks =>
            prevTasks.map(task =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };
  
    // Load tasks when component mounts
    useEffect(() => {
      fetchTasks();
    }, []);

    return (
        <div className="container">
          <div className="todo-app">
            <h2>To-Do List <img src="images/icon.png" alt="Icon" /></h2>
            <ul>
                {tasks.map((task) => (
                    <li key={task.id} className={`task-item ${task.completed ? 'checked' : ''}`}>
                        <input
                            type="checkbox"
                            checked={task.completed}
                            onChange={() => handleToggle(task.id)}
                        />
                        {task.name}
                        <button onClick={() => deleteTask(task.id)}>Delete</button>
                    </li>
                ))}
            </ul>
            <div className="row">
              <input
                type="text"
                value={newTask}
                onChange={(e) => setNewTask(e.target.value)}
                placeholder="Add a new task"
              />
              <button onClick={addTask}>Add Task</button>
            </div>
          </div>
        </div>
    );
};

export default Todo;