import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const UserRegister = () => {
    const navigate = useNavigate();
    const handleSubmit = async (e) => {
        e.preventDefault();

        const name = e.target.elements.name.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        const response = await axios.post("http://localhost:3000/api/auth/user/register", {
            fullName: name,
            email,
            password
        }, {
            withCredentials: true
        });

        console.log(response.data);

        navigate("/")
    }
    return (
        <div className="auth-container auth-split">
            {/* Left Side: Branding / Imagery */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h2>Join the Foodie Community</h2>
                    <p>Create an account to save your favorite spots and leave reviews.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-brand">zomagram</div>
                        <h1>Create an account</h1>
                        <p>Join to explore top restaurants</p>
                    </div>

                    <div className="auth-tabs">
                        <Link to="/user/register" className="auth-tab active">User</Link>
                        <Link to="/food-partner/register" className="auth-tab">Partner</Link>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="John Doe" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" placeholder="name@example.com" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Create a password" />
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Create account
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already have an account?
                        <Link to="/user/login">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default UserRegister;
