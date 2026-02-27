import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserLogin = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/login", {
            email,
            password
        }, {
            withCredentials: true
        });

        navigate("/")
    }
    return (
        <div className="auth-container auth-split">
            {/* Left Side: Branding / Imagery */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h2>Discover the Best Food & Drinks</h2>
                    <p>Log in to your account and explore thousands of restaurants around you.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-brand">zomagram</div>
                        <h1>Welcome back</h1>
                        <p>Sign in to your account</p>
                    </div>

                    <div className="auth-tabs">
                        <Link to="/user/login" className="auth-tab active">User</Link>
                        <Link to="/food-partner/login" className="auth-tab">Partner</Link>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" placeholder="name@example.com" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="••••••••" />
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Log in
                        </button>
                    </form>

                    <div className="auth-footer">
                        Don't have an account?
                        <Link to="/user/register">Sign up</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserLogin;
