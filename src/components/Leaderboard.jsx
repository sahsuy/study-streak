import React, { useState, useEffect } from 'react';
import './Leaderboard.css';

const Leaderboard = ({ currentUser }) => {
    const [leaderboardData, setLeaderboardData] = useState([]);

    useEffect(() => {
        // Get all users from localStorage
        const users = JSON.parse(localStorage.getItem('studyUsers') || '[]');

        // Sort by points (descending)
        const sortedUsers = users
            .map(user => ({
                name: user.username,
                points: user.points || 0,
                streak: user.streak || 0,
                isCurrentUser: currentUser && user.username.toLowerCase() === currentUser.username.toLowerCase()
            }))
            .sort((a, b) => b.points - a.points);

        setLeaderboardData(sortedUsers);
    }, [currentUser]);

    return (
        <div className="leaderboard-container">
            <h2>Class Leaderboard</h2>
            <div className="leaderboard-list">
                {leaderboardData.length > 0 ? (
                    leaderboardData.map((student, index) => (
                        <div
                            key={index}
                            className={`leaderboard-item ${student.isCurrentUser ? 'current-user' : ''}`}
                        >
                            <div className="rank">{index + 1}</div>
                            <div className="student-info">
                                <span className="student-name">
                                    {student.name}
                                    {student.isCurrentUser && ' (You)'}
                                </span>
                                <span className="student-streak">🔥 {student.streak}</span>
                            </div>
                            <div className="student-points">{student.points} pts</div>
                        </div>
                    ))
                ) : (
                    <p className="empty-state">No users yet</p>
                )}
            </div>
        </div>
    );
};

export default Leaderboard;
