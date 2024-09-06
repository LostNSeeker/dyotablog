import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BlogForm = () => {
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate(); // useNavigate hook for navigation

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        if (file && (file.type === "image/jpeg" || file.type === "image/png")) {
            if (file.size > 2 * 1024 * 1024) {
                setMessage('Error: File size exceeds 2MB');
                setImage(null);
                setImagePreview('');
            } else {
                setImage(file);
                setImagePreview(URL.createObjectURL(file));  // Preview the image
                setMessage('');
            }
        } else {
            setMessage('Error: Please upload a valid image file (jpeg or png)');
            setImage(null);
            setImagePreview('');
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!image) {
            setMessage('Please upload an image');
            return;
        }

        setLoading(true);

        const formData = new FormData();
        formData.append('heading', heading);
        formData.append('content', content);
        formData.append('image', image);

        try {
            const response = await fetch('http://localhost:5001/api/blog', {
                method: 'POST',
                body: formData,
            });

            const result = await response.json();

            if (response.ok) {
                setMessage('Blog post created successfully!');
                
                // Clear form fields
                setHeading('');
                setContent('');
                setImage(null);
                setImagePreview('');

                // Navigate to homepage after successful submission
                navigate('/');
            } else {
                setMessage(`Error: ${result.message}`);
            }
        } catch (error) {
            setMessage(`Error: ${error.message}`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex items-center justify-center h-screen bg-gray-100">
            <div className="max-w-lg w-full p-6 bg-white shadow-md rounded-lg">
                <h1 className="text-2xl font-bold mb-6 text-center">Create a New Blog Post</h1>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label htmlFor="heading" className="block text-sm font-medium text-gray-700">Blog Heading</label>
                        <input
                            type="text"
                            id="heading"
                            value={heading}
                            onChange={(e) => setHeading(e.target.value)}
                            required
                            autoComplete='off'
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Blog Content</label>
                        <textarea
                            id="content"
                            rows="5"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            required
                            className="mt-2 w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Upload an Image</label>
                        <div className="flex items-center mt-2">
                            <label className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded cursor-pointer">
                                Choose File
                                <input
                                    type="file"
                                    id="image"
                                    accept="image/jpeg, image/png"
                                    onChange={handleFileChange}
                                    className="hidden"
                                />
                            </label>
                            <span className="ml-3 text-sm text-gray-600">
                                {image ? image.name : 'No file selected'}
                            </span>
                        </div>
                        {imagePreview && (
                            <div className="mt-4">
                                <img src={imagePreview} alt="Preview" className="max-w-full h-56 rounded-md" />
                            </div>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full py-3 px-6 text-white rounded-md ${
                            loading ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'
                        }`}
                        disabled={loading}
                    >
                        {loading ? 'Submitting...' : 'Submit Blog Post'}
                    </button>
                </form>

                {message && (
                    <p className={`mt-6 text-center text-sm ${message.includes('Error') ? 'text-red-500' : 'text-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
        </div>
    );
};

export default BlogForm;
