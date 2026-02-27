import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../../styles/CreateFood.css';

const CreateFood = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [video, setVideo] = useState(null);
    const [previewURL, setPreviewURL] = useState("");
    const [isUploading, setIsUploading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState("");
    const [dragActive, setDragActive] = useState(false);

    const handleFile = (file) => {
        if (file && file.type.startsWith("video/")) {
            setVideo(file);
            setPreviewURL(URL.createObjectURL(file));
            setError("");
        } else {
            setError("Please select a valid video file.");
            setVideo(null);
            setPreviewURL("");
        }
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleFile(e.dataTransfer.files[0]);
        }
    };

    const handleChange = (e) => {
        e.preventDefault();
        if (e.target.files && e.target.files[0]) {
            handleFile(e.target.files[0]);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!name.trim()) {
            setError("A name for the food item is required.");
            return;
        }

        if (!video) {
            setError("A video is required to create a food item.");
            return;
        }

        setIsUploading(true);
        setError("");
        setSuccess("");

        const formData = new FormData();
        formData.append("name", name);
        formData.append("description", description);
        formData.append("video", video); // matches multer configuration 'upload.single("video")'

        try {
            const response = await axios.post("http://localhost:3000/api/food", formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
                withCredentials: true
            });

            setSuccess("Food item posted successfully!");
            setName("");
            setDescription("");
            setVideo(null);
            setPreviewURL("");

            // Redirect to the partner's profile
            const partnerId = response.data.food.foodPartner;
            setTimeout(() => {
                navigate(`/food-partner/${partnerId}`);
            }, 1000); // 1 second delay so they can see the success message
        } catch (err) {
            console.error(err);
            setError(err.response?.data?.message || "Something went wrong uploading the video.");
        } finally {
            setIsUploading(false);
        }
    };

    return (
        <div className="create-food-container">
            <div className="create-food-card">
                <h2>Create a Post</h2>
                <p className="subtitle">Share your latest dish with the Zomagram community</p>

                {error && <div className="alert-box alert-error">{error}</div>}
                {success && <div className="alert-box alert-success">{success}</div>}

                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Item Name</label>
                        <input
                            type="text"
                            id="name"
                            className="form-control"
                            placeholder="What did you make?"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            disabled={isUploading}
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="description">Description</label>
                        <textarea
                            id="description"
                            className="form-control"
                            placeholder="Describe your tasty creation..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={isUploading}
                        />
                    </div>

                    <div className="form-group">
                        <label>Upload Video</label>
                        <div
                            className={`file-upload-zone ${dragActive ? 'drag-active' : ''}`}
                            onDragEnter={handleDrag}
                            onDragLeave={handleDrag}
                            onDragOver={handleDrag}
                            onDrop={handleDrop}
                        >
                            <input
                                type="file"
                                accept="video/*"
                                onChange={handleChange}
                                disabled={isUploading}
                            />

                            {previewURL ? (
                                <div>
                                    <video src={previewURL} style={{ width: '100%', maxHeight: '200px', borderRadius: '8px' }} controls />
                                    <p className="file-info">{video.name}</p>
                                </div>
                            ) : (
                                <div>
                                    <span className="upload-icon">🎥</span>
                                    <p>Drag and drop your video here<br />or click to browse</p>
                                </div>
                            )}
                        </div>
                    </div>

                    <button
                        type="submit"
                        className="submit-btn"
                        disabled={isUploading || !video}
                    >
                        {isUploading ? "Cooking up a post..." : "Post Item"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default CreateFood;