import React from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';

const PartnerRegister = () => {
    return (
        <div className="auth-container auth-split">
            {/* Left Side: Branding / Imagery */}
            <div className="auth-left">
                <div className="auth-left-content">
                    <h2>Partner with the Best</h2>
                    <p>Join thousands of restaurants accelerating their growth with our platform.</p>
                </div>
            </div>

            {/* Right Side: Form */}
            <div className="auth-right">
                <div className="auth-card">
                    <div className="auth-header">
                        <div className="auth-brand">zomagram</div>
                        <h1>Partner with Zomagram</h1>
                        <p>Register to grow your business</p>
                    </div>

                    <div className="auth-tabs">
                        <Link to="/user/register" className="auth-tab">User</Link>
                        <Link to="/food-partner/register" className="auth-tab active">Partner</Link>
                    </div>

                    <form className="auth-form" onSubmit={(e) => e.preventDefault()}>
                        <div className="auth-input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" placeholder="Business Name" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="contactName">Contact name</label>
                            <input type="text" id="contactName" placeholder="John Doe" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="phone">Phone number</label>
                            <input type="tel" id="phone" placeholder="+1 234 567 8900" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" placeholder="123 Main St, City" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" placeholder="restaurant@example.com" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" placeholder="Create a strong password" />
                        </div>

                        <button type="submit" className="auth-submit-btn">
                            Create partner account
                        </button>
                    </form>

                    <div className="auth-footer">
                        Already a partner?
                        <Link to="/food-partner/login">Log in</Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PartnerRegister;
