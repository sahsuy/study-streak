import React, { useState, useEffect } from 'react';
import './Timer.css';

const STUDY_METHODS = {
    pomodoro: { name: 'Pomodoro', work: 25 * 60, break: 5 * 60 },
    rule5217: { name: '52/17 Rule', work: 52 * 60, break: 17 * 60 },
    rule9020: { name: '90/20 Rule', work: 90 * 60, break: 20 * 60 },
};

const Timer = ({ onComplete }) => {
    const [method, setMethod] = useState('pomodoro');
    const [timeLeft, setTimeLeft] = useState(STUDY_METHODS.pomodoro.work);
    const [isActive, setIsActive] = useState(false);
    const [mode, setMode] = useState('work'); // 'work' or 'break'

    useEffect(() => {
        // Reset timer when method changes
        setIsActive(false);
        setMode('work');
        setTimeLeft(STUDY_METHODS[method].work);
    }, [method]);

    useEffect(() => {
        let interval = null;
        if (isActive && timeLeft > 0) {
            interval = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        } else if (timeLeft === 0) {
            setIsActive(false);
            handleComplete();
        }
        return () => clearInterval(interval);
    }, [isActive, timeLeft]);

    const handleComplete = () => {
        if (mode === 'work') {
            if (onComplete) onComplete(); // Award points
            setMode('break');
            setTimeLeft(STUDY_METHODS[method].break);
        } else {
            setMode('work');
            setTimeLeft(STUDY_METHODS[method].work);
        }
    };

    const toggleTimer = () => {
        setIsActive(!isActive);
    };

    const resetTimer = () => {
        setIsActive(false);
        setMode('work');
        setTimeLeft(STUDY_METHODS[method].work);
    };

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    };

    const currentTotalTime = mode === 'work'
        ? STUDY_METHODS[method].work
        : STUDY_METHODS[method].break;

    const progress = ((currentTotalTime - timeLeft) / currentTotalTime) * 100;

    return (
        <div className={`timer-container ${mode}`}>
            <div className="method-selector">
                <select value={method} onChange={(e) => setMethod(e.target.value)}>
                    {Object.entries(STUDY_METHODS).map(([key, value]) => (
                        <option key={key} value={key}>{value.name}</option>
                    ))}
                </select>
            </div>

            <div className="timer-display">
                <div className="timer-circle" style={{ '--progress': `${progress}%` }}>
                    <span className="time-text">{formatTime(timeLeft)}</span>
                    <span className="mode-text">{mode === 'work' ? 'Focus' : 'Break'}</span>
                </div>
            </div>
            <div className="timer-controls">
                <button onClick={toggleTimer} className={isActive ? 'active' : ''}>
                    {isActive ? 'Pause' : 'Start'}
                </button>
                <button onClick={resetTimer} className="secondary">
                    Reset
                </button>
            </div>
        </div>
    );
};

export default Timer;
