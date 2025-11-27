import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import StreakCounter from './StreakCounter';
import Leaderboard from './Leaderboard';
import WeatherWidget from './WeatherWidget';
import TodoList from './TodoList';
import StudyTips from './StudyTips';
import './Dashboard.css';

const Dashboard = ({ user, onLogout, theme, toggleTheme }) => {
    const [points, setPoints] = useState(0);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // Load points from user object
        setPoints(user.points || 0);

        // Set Greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, [user]);

    const handleTimerComplete = () => {
        const newPoints = points + 50;
        setPoints(newPoints);

        // Update user points in localStorage
        const users = JSON.parse(localStorage.getItem('studyUsers') || '[]');
        const updatedUsers = users.map(u =>
            u.username.toLowerCase() === user.username.toLowerCase()
                ? { ...u, points: newPoints }
                : u
        );
        localStorage.setItem('studyUsers', JSON.stringify(updatedUsers));

        // Update current user
        const currentUser = updatedUsers.find(u => u.username.toLowerCase() === user.username.toLowerCase());
        localStorage.setItem('currentUser', JSON.stringify(currentUser));
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-top">
                    <h1>Study Streak</h1>
                    <div className="header-controls">
                        <WeatherWidget />
                        <button
                            onClick={toggleTheme}
                            className="theme-toggle-btn"
                            aria-label="Toggle theme"
                        >
                            {theme === 'dark' ? '☀️' : '🌙'}
                        </button>
                        <button onClick={onLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
                <p className="greeting">{greeting}, {user.username}!</p>
            </header>

            <div className="dashboard-grid">
                <div className="main-column">
                    <Timer onComplete={handleTimerComplete} />
                    <TodoList />
                    <StreakCounter points={points} />
                </div>

                <div className="side-column">
                    <Leaderboard currentUser={user} />
                    <StudyTips />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
