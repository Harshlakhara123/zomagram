import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const PartnerLogin = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error on new submission

        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            const response = await axios.post(`${baseUrl}/api/auth/food-partner/login`, {
                email,
                password
            }, {
                withCredentials: true
            });

            // The backend should return the partner ID in the response
            const partnerId = response.data.foodPartner._id;
            navigate(`/food-partner/${partnerId}`);
        } catch (err) {
            console.error("Partner Login Error:", err);
            setError(err.response?.data?.message || "Invalid email or password");
        }
    }
    return (
        <div className="auth-container auth-split">
            {/* Left Side: Branding / Imagery */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h2>Grow Your Business with Us</h2>
                    <p>Partner with Zomagram and reach more customers than ever before.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-brand">zomagram</div>
                        <h1>Partner Portal</h1>
                        <p>Sign in to manage your restaurant</p>
                    </div>

                    {error && <div className="alert-box alert-error">{error}</div>}

                    <div className="auth-tabs">
                        <Link to="/user/login" className="auth-tab">User</Link>
                        <Link to="/food-partner/login" className="auth-tab active">Partner</Link>
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
                            Log in to dashboard
                        </button>
                    </form>

                    <div className="auth-footer">
                        New to Zomagram for Partners?
                        <Link to="/food-partner/register">Register your restaurant</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerLogin;
