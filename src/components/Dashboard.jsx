import React, { useState, useEffect } from 'react';
import Timer from './Timer';
import StreakCounter from './StreakCounter';
import Leaderboard from './Leaderboard';
import WeatherWidget from './WeatherWidget';
import TodoList from './TodoList';
import StudyTips from './StudyTips';
import './Dashboard.css';

const Dashboard = ({ user, onLogout }) => {
    const [points, setPoints] = useState(0);
    const [greeting, setGreeting] = useState('');

    useEffect(() => {
        // Load points
        const savedPoints = parseInt(localStorage.getItem('studyPoints') || '0', 10);
        setPoints(savedPoints);

        // Set Greeting
        const hour = new Date().getHours();
        if (hour < 12) setGreeting('Good Morning');
        else if (hour < 18) setGreeting('Good Afternoon');
        else setGreeting('Good Evening');
    }, []);

    const handleTimerComplete = () => {
        const newPoints = points + 50;
        setPoints(newPoints);
        localStorage.setItem('studyPoints', newPoints.toString());
    };

    return (
        <div className="dashboard">
            <header className="dashboard-header">
                <div className="header-top">
                    <h1>Study Streak</h1>
                    <div className="header-controls">
                        <WeatherWidget />
                        <button onClick={onLogout} className="logout-btn">Logout</button>
                    </div>
                </div>
                <p className="greeting">{greeting}, {user.username}!</p>
            </header>

            <div className="dashboard-grid">
                <div className="main-column">
                    <StreakCounter points={points} />
                    <Timer onComplete={handleTimerComplete} />
                    <StudyTips />
                </div>

                <div className="side-column">
                    <Leaderboard />
                    <TodoList />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
