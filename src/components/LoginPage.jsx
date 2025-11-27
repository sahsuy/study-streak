import React, { useState } from 'react';
import './LoginPage.css';

const LoginPage = ({ onLogin }) => {
    const [isLogin, setIsLogin] = useState(true);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);

    const validatePassword = (password) => {
        const errors = [];
        if (password.length < 8) {
            errors.push('At least 8 characters');
        }
        if (!/[A-Z]/.test(password)) {
            errors.push('One uppercase letter');
        }
        if (!/[a-z]/.test(password)) {
            errors.push('One lowercase letter');
        }
        if (!/[0-9]/.test(password)) {
            errors.push('One number');
        }
        if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
            errors.push('One special character (!@#$%^&*...)');
        }
        return errors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setError('');
        setPasswordErrors([]);

        if (!username || !password) {
            setError('Please fill in all fields');
            return;
        }

        const users = JSON.parse(localStorage.getItem('studyUsers') || '[]');

        if (isLogin) {
            // Case-insensitive username check for login
            const user = users.find(u => u.username.toLowerCase() === username.toLowerCase() && u.password === password);
            if (user) {
                onLogin(user);
            } else {
                setError('Invalid credentials');
            }
        } else {
            // Check for duplicate username (case-insensitive)
            if (users.find(u => u.username.toLowerCase() === username.toLowerCase())) {
                setError('Username already exists');
                return;
            }

            // Validate password strength
            const passwordValidationErrors = validatePassword(password);
            if (passwordValidationErrors.length > 0) {
                setPasswordErrors(passwordValidationErrors);
                setError('Password does not meet requirements');
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

                    {!isLogin && (
                        <div className="password-requirements">
                            <p className="requirements-title">Password must contain:</p>
                            <ul>
                                <li className={passwordErrors.includes('At least 8 characters') ? 'invalid' : 'valid'}>
                                    At least 8 characters
                                </li>
                                <li className={passwordErrors.includes('One uppercase letter') ? 'invalid' : 'valid'}>
                                    One uppercase letter (A-Z)
                                </li>
                                <li className={passwordErrors.includes('One lowercase letter') ? 'invalid' : 'valid'}>
                                    One lowercase letter (a-z)
                                </li>
                                <li className={passwordErrors.includes('One number') ? 'invalid' : 'valid'}>
                                    One number (0-9)
                                </li>
                                <li className={passwordErrors.includes('One special character (!@#$%^&*...)') ? 'invalid' : 'valid'}>
                                    One special character (!@#$%^&*...)
                                </li>
                            </ul>
                        </div>
                    )}

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
