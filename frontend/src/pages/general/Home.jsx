import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../../styles/Home.css';

const VideoPost = ({ video }) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const observer = new IntersectionObserver((entries) => {
            const entry = entries[0];
            if (entry.isIntersecting) {
                // Video came into view, play it
                videoRef.current.play().catch(e => console.log('Autoplay prevented', e));
                setIsPlaying(true);
            } else {
                // Video left view, pause it
                videoRef.current.pause();
                setIsPlaying(false);
            }
        }, { threshold: 0.6 }); // Play when at least 60% of the video is visible

        if (videoRef.current) {
            observer.observe(videoRef.current);
        }

        return () => {
            if (videoRef.current) observer.unobserve(videoRef.current);
        };
    }, []);

    const togglePlay = () => {
        if (isPlaying) {
            videoRef.current.pause();
            setIsPlaying(false);
        } else {
            videoRef.current.play().catch(e => console.log(e));
            setIsPlaying(true);
        }
    };

    const storeName = video.foodPartner?.name || "Unknown Store";

    return (
        <div className="video-post-container" onClick={togglePlay}>
            <video
                ref={videoRef}
                className="video-player"
                src={video.video} // Pulled from backend model `video` string
                loop
                muted // Muted to allow browser autoplay policies without user interaction
                playsInline
            />

            {/* Overlay Elements */}
            <div className="video-overlay">
                <div className="video-info">
                    <p style={{ margin: 0, fontWeight: 'bold', color: 'white', textShadow: '1px 1px 2px rgba(0,0,0,0.6)' }}>
                        @{storeName}
                    </p>
                    <p className="video-description">{video.description}</p>
                    <button
                        className="visit-store-btn"
                        onClick={(e) => {
                            e.stopPropagation();
                            if (video.foodPartner && video.foodPartner._id) {
                                navigate(`/food-partner/${video.foodPartner._id}`);
                            } else {
                                alert("Sorry, store details are missing for this post!");
                            }
                        }}
                    >
                        Visit Store
                    </button>
                </div>
            </div>
        </div>
    );
};

const Home = () => {
    const [videos, setVideos] = useState([]);
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchVideos = async () => {
            try {
                const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                const response = await axios.get(`${apiUrl}/api/food`, {
                    withCredentials: true
                });
                setVideos(response.data.foodItems);
                setLoading(false);
            } catch (err) {
                console.error("Failed to load videos:", err);
                if (err.response && err.response.status === 402) {
                    setError("Please log in to view the exclusive Zomagram food feed!");
                } else {
                    setError("An error occurred while loading videos.");
                }
                setLoading(false);
            }
        };

        fetchVideos();
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: 'black', color: 'white' }}>
                <h2>Loading tastiest bites...</h2>
            </div>
        );
    }

    if (error) {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', color: 'white', textAlign: 'center', padding: '20px' }}>
                <div>
                    <h2>Oops! 🛑</h2>
                    <p>{error}</p>
                    <a href="/user/login" style={{ color: '#e23744', textDecoration: 'none', fontWeight: 'bold', marginTop: '10px', display: 'inline-block' }}>Go to Login Page</a>
                </div>
            </div>
        );
    }

    if (videos.length === 0) {
        return (
            <div style={{ height: '100vh', width: '100vw', display: 'flex', justifyContent: 'center', alignItems: 'center', backgroundColor: '#111', color: 'white', textAlign: 'center' }}>
                <h2>No videos available yet! 🍔</h2>
                <p>Partners are cooking up something good.</p>
            </div>
        );
    }

    return (
        <div className="reels-container" style={{ position: 'relative' }}>
            {videos.map((vid) => (
                <VideoPost key={vid._id} video={vid} />
            ))}

            <button
                className="feed-logout-btn"
                onClick={async () => {
                    try {
                        const apiUrl = import.meta.env.VITE_API_URL || "http://localhost:3000";
                        await axios.get(`${apiUrl}/api/auth/user/logout`, {
                            withCredentials: true
                        });
                        window.location.href = '/user/login';
                    } catch (err) {
                        console.error("Logout failed", err);
                    }
                }}
            >
                Logout🚪
            </button>
        </div>
    );
}

export default Home;