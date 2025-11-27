import React, { useState, useEffect } from 'react';
import './StreakCounter.css';

const StreakCounter = ({ points }) => {
    const [streak, setStreak] = useState(0);

    useEffect(() => {
        // Load streak from local storage (mock logic for MVP)
        const savedStreak = parseInt(localStorage.getItem('studyStreak') || '0', 10);
        setStreak(savedStreak);
    }, []);

    return (
        <div className="streak-container">
            <div className="stat-card">
                <h3>Current Streak</h3>
                <div className="stat-value fire-text">
                    {streak} <span className="stat-unit">days</span>
                </div>
            </div>
            <div className="stat-card">
                <h3>Total Points</h3>
                <div className="stat-value points-text">
                    {points} <span className="stat-unit">pts</span>
                </div>
            </div>
        </div>
    );
};

export default StreakCounter;
