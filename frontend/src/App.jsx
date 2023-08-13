import { useState, useEffect } from "react";
import axios from "axios";

function App() {
    const [tasks, setTasks] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    useEffect(() => {
        fetchTasks();
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await axios.get("http://localhost:3001/tasks");
            setTasks(response.data);
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    const addTask = async () => {
        try {
            await axios.post("http://localhost:3001/tasks", {
                title,
                description,
            });
            fetchTasks();
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    const deleteTask = async (id) => {
        try {
            await axios.delete(`http://localhost:3001/tasks/${id}`);
            fetchTasks();
        } catch (error) {
            alert(JSON.stringify(error));
        }
    };

    return (
        <div>
            <h1>Task Manager</h1>
            <div>
                <input
                    type="text"
                    placeholder="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                <input
                    type="text"
                    placeholder="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <button onClick={addTask}>Add Task</button>
            </div>
            <ul>
                {tasks.map((task) => (
                    <li key={task._id}>
                        <h3>{task.title}</h3>
                        <p>{task.description}</p>
                        <button onClick={() => deleteTask(task._id)}>
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
