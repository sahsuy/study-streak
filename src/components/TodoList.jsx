import React, { useState, useEffect } from 'react';
import './TodoList.css';

const TodoList = () => {
    const [tasks, setTasks] = useState([]);
    const [newTask, setNewTask] = useState('');
    const [activeTaskId, setActiveTaskId] = useState(null);

    useEffect(() => {
        const savedTasks = JSON.parse(localStorage.getItem('studyTasks') || '[]');
        setTasks(savedTasks);
    }, []);

    const saveTasks = (updatedTasks) => {
        setTasks(updatedTasks);
        localStorage.setItem('studyTasks', JSON.stringify(updatedTasks));
    };

    const addTask = (e) => {
        e.preventDefault();
        if (!newTask.trim()) return;

        const task = {
            id: Date.now(),
            text: newTask,
            status: 'pending', // pending, active, completed
            startTime: null,
            duration: 0, // in seconds
        };

        saveTasks([...tasks, task]);
        setNewTask('');
    };

    const startTask = (id) => {
        if (activeTaskId) {
            // Pause current active task if any (simplified: just stop tracking time for now)
            // For MVP, we only allow one active task.
            alert('Please complete or pause the current task first.');
            return;
        }

        const updatedTasks = tasks.map(task =>
            task.id === id ? { ...task, status: 'active', startTime: Date.now() } : task
        );
        setActiveTaskId(id);
        saveTasks(updatedTasks);
    };

    const completeTask = (id) => {
        const updatedTasks = tasks.map(task => {
            if (task.id === id) {
                const endTime = Date.now();
                const duration = task.startTime ? Math.floor((endTime - task.startTime) / 1000) : 0;
                return { ...task, status: 'completed', duration: task.duration + duration, startTime: null };
            }
            return task;
        });
        setActiveTaskId(null);
        saveTasks(updatedTasks);
    };

    const deleteTask = (id) => {
        const updatedTasks = tasks.filter(task => task.id !== id);
        if (activeTaskId === id) setActiveTaskId(null);
        saveTasks(updatedTasks);
    };

    const clearCompleted = () => {
        const updatedTasks = tasks.filter(task => task.status !== 'completed');
        saveTasks(updatedTasks);
    };

    const getProgress = () => {
        if (tasks.length === 0) return 0;
        const completed = tasks.filter(task => task.status === 'completed').length;
        return Math.round((completed / tasks.length) * 100);
    };

    const getSmartGreeting = () => {
        const progress = getProgress();
        if (tasks.length === 0) return "Ready to plan your day?";
        if (progress === 0) return "Let's get started!";
        if (progress < 50) return "Good start, keep going!";
        if (progress < 100) return "Almost there, you got this!";
        return "All done! Amazing work! 🎉";
    };

    const formatDuration = (seconds) => {
        if (seconds < 60) return `${seconds}s`;
        const mins = Math.floor(seconds / 60);
        return `${mins}m ${seconds % 60}s`;
    };

    return (
        <div className="todo-container">
            <div className="todo-header">
                <h3>Daily Planner</h3>
                <span className="progress-text">{getSmartGreeting()}</span>
            </div>

            <div className="progress-container">
                <div
                    className="progress-bar"
                    style={{ width: `${getProgress()}%` }}
                ></div>
            </div>

            <form onSubmit={addTask} className="todo-form">
                <input
                    type="text"
                    value={newTask}
                    onChange={(e) => setNewTask(e.target.value)}
                    placeholder="Add a new task..."
                />
                <button type="submit">+</button>
            </form>

            <div className="todo-list">
                {tasks.map(task => (
                    <div key={task.id} className={`todo-item ${task.status}`}>
                        <div className="task-content">
                            <span className="task-text">{task.text}</span>
                            {task.status === 'completed' && (
                                <span className="task-duration">Took: {formatDuration(task.duration)}</span>
                            )}
                            {task.status === 'active' && (
                                <span className="task-status-badge">In Progress...</span>
                            )}
                        </div>

                        <div className="task-actions">
                            {task.status === 'pending' && (
                                <button onClick={() => startTask(task.id)} className="start-btn">Start</button>
                            )}
                            {task.status === 'active' && (
                                <button onClick={() => completeTask(task.id)} className="complete-btn">Done</button>
                            )}
                            <button
                                onClick={() => deleteTask(task.id)}
                                className="delete-btn"
                                aria-label="Delete task"
                            >
                                🗑️
                            </button>
                        </div>
                    </div>
                ))}
                {tasks.length === 0 && <p className="empty-state">No tasks yet. Plan your day!</p>}
            </div>

            {tasks.some(t => t.status === 'completed') && (
                <button onClick={clearCompleted} className="clear-completed-btn">
                    Clear Completed
                </button>
            )}
        </div>
    );
};

export default TodoList;
