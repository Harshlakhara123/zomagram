import React, { useRef, useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Profile.css';

const MOCK_PARTNER_DATA = {
    storeName: "Sweet & Spicy Diner",
    avatar: "https://images.unsplash.com/photo-1555396273-367ea4eb4db5?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&q=80",
    dishes: 18,
    customersServed: "12.4k",
    description: "Serving the best fusion comfort food in town since 2018! 🌶️🍩 Award-winning spicy noodles & hand-crafted desserts.",
    address: "742 Evergreen Terrace, Springfield",
    videos: [
        { id: 1, url: 'https://ik.imagekit.io/qxjlk4ben/f5e600a9-0e15-42b1-9723-118df1298e2a_kDB0ikKGp?updatedAt=1772051833885' },
        { id: 2, url: 'https://ik.imagekit.io/qxjlk4ben/69591921-8aa7-4109-87d2-37e8e5135825_yUYeRtARY' },
        { id: 3, url: 'https://ik.imagekit.io/qxjlk4ben/410075b6-1f37-441b-980c-ced21d4377d0_hH1EDbQ2q' },
        { id: 4, url: 'https://ik.imagekit.io/qxjlk4ben/d6f24d46-3c47-4dca-89c5-b892aec3edc3_s6nfXjxoL' }
    ]
};

const VideoGridItem = ({ videoUrl, videoId, onDelete }) => {
    const videoRef = useRef(null);

    return (
        <div
            className="grid-item"
            onMouseEnter={() => videoRef.current?.play()}
            onMouseLeave={() => {
                if (videoRef.current) {
                    videoRef.current.pause();
                    videoRef.current.currentTime = 0;
                }
            }}
        >
            <video
                ref={videoRef}
                className="grid-video"
                src={videoUrl}
                muted
                loop
                playsInline
            />
            <div className="grid-overlay">
                <span>▶ View</span>
            </div>

            <button
                className="delete-post-btn"
                onClick={(e) => {
                    e.stopPropagation(); // prevent triggering view/play if implemented later
                    if (window.confirm("Are you sure you want to delete this post?")) {
                        onDelete(videoId);
                    }
                }}
            >
                🗑️
            </button>
        </div>
    );
};

const Profile = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [partner, setPartner] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPartner = async () => {
            try {
                // Determine API base url
                const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const apiUrl = `${baseUrl}/api/food-partner/${id}`;
                const response = await axios.get(apiUrl, {
                    withCredentials: true
                });

                setPartner(response.data.foodPartner);
                setLoading(false);
            } catch (err) {
                console.error("Error fetching partner details:", err);
                setError(err.response?.data?.message || "Failed to load profile");
                setLoading(false);
            }
        };

        if (id) {
            fetchPartner();
        }
    }, [id]);

    if (loading) {
        return (
            <div className="profile-container">
                <div className="profile-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'white' }}>
                    <h2>Loading Profile...</h2>
                </div>
            </div>
        );
    }

    if (error || !partner) {
        return (
            <div className="profile-container">
                <div className="profile-content" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', color: 'white' }}>
                    <h2>{error || "Partner not found"}</h2>
                </div>
            </div>
        );
    }

    const p = {
        storeName: partner.name || MOCK_PARTNER_DATA.storeName,
        avatar: MOCK_PARTNER_DATA.avatar,
        dishes: partner.foodItems ? partner.foodItems.length : 0,
        customersServed: MOCK_PARTNER_DATA.customersServed,
        description: MOCK_PARTNER_DATA.description,
        address: partner.address || MOCK_PARTNER_DATA.address,
        videos: partner.foodItems ? partner.foodItems.map((item, idx) => ({
            id: item._id,
            url: item.video
        })) : []
    };

    const handleDeletePost = async (videoId) => {
        try {
            const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
            await axios.delete(`${baseUrl}/api/food/${videoId}`, {
                withCredentials: true
            });
            // Update UI by filtering out the deleted video
            setPartner(prevPartner => ({
                ...prevPartner,
                foodItems: prevPartner.foodItems.filter(item => item._id !== videoId)
            }));
        } catch (err) {
            console.error("Failed to delete post:", err);
            alert(err.response?.data?.message || "Failed to delete post. Please try again.");
        }
    };

    return (
        <div className="profile-container">
            <div className="profile-content">

                {/* Header Information */}
                <header className="profile-header">
                    <div className="profile-avatar-container">
                        <img src={p.avatar} alt="Restaurant Avatar" className="profile-avatar" />
                    </div>

                    <div className="profile-info">
                        <div className="profile-title-row">
                            <h1>{p.storeName}</h1>
                            <button className="profile-edit-btn">Edit Profile</button>
                            <button
                                className="profile-logout-btn"
                                onClick={async () => {
                                    try {
                                        const baseUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                                        await axios.get(`${baseUrl}/api/auth/food-partner/logout`, {
                                            withCredentials: true
                                        });
                                        navigate('/food-partner/login');
                                    } catch (err) {
                                        console.error("Logout failed", err);
                                    }
                                }}
                            >
                                Logout
                            </button>
                        </div>

                        <ul className="profile-stats">
                            <li><span>{p.videos.length}</span> posts</li>
                            <li><span>{p.dishes}</span> menu items</li>
                            <li><span>{p.customersServed}</span> served</li>
                        </ul>

                        <div className="profile-bio">
                            <p><strong>{p.storeName}</strong></p>
                            <p>{p.description}</p>
                            <p className="profile-address">📍 {p.address}</p>
                        </div>
                    </div>
                </header>

                {/* Action Menu */}
                <div className="profile-actions">
                    <button className="action-btn" onClick={() => navigate("/create-food")} style={{ background: 'linear-gradient(135deg, #e23744, #ff6b6b)', color: 'white' }}>
                        ➕ Create Post
                    </button>
                    <button className="action-btn">
                        📖 View Menu
                    </button>
                    <button className="action-btn">
                        ⭐ Feedback & Reviews
                    </button>
                    <button className="action-btn">
                        📊 App Analytics
                    </button>
                    <button className="action-btn">
                        🛑 Report Issue
                    </button>
                </div>

                {/* Tabs */}
                <div className="profile-tabs">
                    <div className="profile-tab active">
                        🎬 VIDEOS
                    </div>
                </div>

                {/* Instagram/TikTok Video Grid */}
                <div className="profile-grid">
                    {p.videos.map((vid) => (
                        <VideoGridItem
                            key={vid.id}
                            videoId={vid.id}
                            videoUrl={vid.url}
                            onDelete={handleDeletePost}
                        />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Profile;