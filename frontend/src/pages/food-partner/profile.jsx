import React, { useRef } from 'react';
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

const VideoGridItem = ({ videoUrl }) => {
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
        </div>
    );
};

const Profile = () => {
    const p = MOCK_PARTNER_DATA;

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
                        <VideoGridItem key={vid.id} videoUrl={vid.url} />
                    ))}
                </div>

            </div>
        </div>
    );
};

export default Profile;