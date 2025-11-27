import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('studyUsers') || '[]');

        if (isLogin) {
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                onLogin(user);
            } else {
                setError('Invalid credentials');
            }
        } else {
            if (users.find(u => u.username === username)) {
                setError('Username already exists');
                return;
            }
            const newUser = { username, password, points: 0, streak: 0 };
            users.push(newUser);
            localStorage.setItem('studyUsers', JSON.stringify(users));
            onLogin(newUser);
        }
    };

    return (
        <div className="login-container">
            <div className="login-card">
                <h2>{isLogin ? 'Welcome Back' : 'Join Study Streak'}</h2>
                <p className="subtitle">
                    {isLogin ? 'Continue your focus journey' : 'Start building your habit today'}
                </p>

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Username</label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            placeholder="Enter your username"
                        />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            placeholder="Enter your password"
                        />
                    </div>

                    {error && <div className="error-message">{error}</div>}

                    <button type="submit" className="submit-btn">
                        {isLogin ? 'Login' : 'Sign Up'}
                    </button>
                </form>

                <div className="toggle-auth">
                    {isLogin ? "Don't have an account? " : "Already have an account? "}
                    <button
                        className="link-btn"
                        onClick={() => {
                            setIsLogin(!isLogin);
                            setError('');
                            setUsername('');
                            setPassword('');
                        }}
                    >
                        {isLogin ? 'Sign Up' : 'Login'}
                    </button>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;
