import React from 'react';
import './Leaderboard.css';

const MOCK_DATA = [
    { id: 1, name: 'Alice', points: 1250, streak: 12 },
    { id: 2, name: 'You', points: 850, streak: 5, isCurrentUser: true },
    { id: 3, name: 'Bob', points: 720, streak: 3 },
    { id: 4, name: 'Charlie', points: 600, streak: 0 },
    { id: 5, name: 'Diana', points: 450, streak: 1 },
];

const Leaderboard = () => {
    return (
        <div className="leaderboard-container">
            <h2>Class Leaderboard</h2>
            <div className="leaderboard-list">
                {MOCK_DATA.map((student, index) => (
                    <div
                        key={student.id}
                        className={`leaderboard-item ${student.isCurrentUser ? 'current-user' : ''}`}
                    >
                        <div className="rank">{index + 1}</div>
                        <div className="student-info">
                            <span className="student-name">{student.name}</span>
                            <span className="student-streak">🔥 {student.streak}</span>
                        </div>
                        <div className="student-points">{student.points} pts</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Leaderboard;
