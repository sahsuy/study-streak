import React from 'react';
import './StudyTips.css';

const TIPS = [
    {
        title: 'Pomodoro Technique',
        description: 'Work for 25 minutes, then take a 5-minute break. After 4 cycles, take a longer break (15-30 mins). Best for general focus.'
    },
    {
        title: '52/17 Rule',
        description: 'Work for 52 minutes, then rest for 17 minutes. Studies show this ratio maximizes productivity for cognitive tasks.'
    },
    {
        title: '90/20 Rule',
        description: 'Work for 90 minutes (ultradian rhythm), then rest for 20 minutes. Good for deep work sessions.'
    },
    {
        title: 'Active Recall',
        description: 'Test yourself on what you just learned instead of passively re-reading. It strengthens memory retention.'
    }
];

const StudyTips = () => {
    return (
        <div className="study-tips-container">
            <h3>Study Tips & Methods</h3>
            <div className="tips-grid">
                {TIPS.map((tip, index) => (
                    <div key={index} className="tip-card">
                        <h4>{tip.title}</h4>
                        <p>{tip.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default StudyTips;
