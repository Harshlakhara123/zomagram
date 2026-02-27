import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/Auth.css';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

const PartnerRegister = () => {
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); // reset error on new submission

        const name = e.target.elements.name.value;
        const contactName = e.target.elements.contactName.value;
        const phone = e.target.elements.phone.value;
        const address = e.target.elements.address.value;
        const email = e.target.elements.email.value;
        const password = e.target.elements.password.value;

        try {
            const response = await axios.post("http://localhost:3000/api/auth/food-partner/register", {
                name,
                contactName,
                phone,
                address,
                email,
                password
            }, {
                withCredentials: true
            });

            console.log(response.data);

            // The backend should return the partner ID in the response
            const partnerId = response.data.foodPartner._id;
            navigate(`/food-partner/${partnerId}`);
        } catch (err) {
            console.error("Partner Registration Error:", err);
            setError(err.response?.data?.message || "Registration failed. Please try again.");
        }
    }
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

                    {error && <div className="alert-box alert-error">{error}</div>}

                    <div className="auth-tabs">
                        <Link to="/user/register" className="auth-tab">User</Link>
                        <Link to="/food-partner/register" className="auth-tab active">Partner</Link>
                    </div>

                    <form className="auth-form" onSubmit={handleSubmit}>
                        <div className="auth-input-group">
                            <label htmlFor="name">Name</label>
                            <input type="text" id="name" name="name" placeholder="Business Name" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="contactName">Contact name</label>
                            <input type="text" id="contactName" name="contactName" placeholder="John Doe" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="phone">Phone number</label>
                            <input type="tel" id="phone" name="phone" placeholder="+1 234 567 8900" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="address">Address</label>
                            <input type="text" id="address" name="address" placeholder="123 Main St, City" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" id="email" name="email" placeholder="restaurant@example.com" />
                        </div>

                        <div className="auth-input-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" id="password" name="password" placeholder="Create a strong password" />
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
