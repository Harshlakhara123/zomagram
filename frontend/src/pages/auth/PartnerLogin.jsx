import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';

const PartnerLogin = () => {
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

                    <div className="auth-tabs">
                        <Link to="/user/login" className="auth-tab">User</Link>
                        <Link to="/food-partner/login" className="auth-tab active">Partner</Link>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="auth-input-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" placeholder="name@example.com" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="••••••••" />
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
