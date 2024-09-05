import React, { useState } from 'react';

const BlogForm = () => {
    const [heading, setHeading] = useState('');
    const [content, setContent] = useState('');
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        
        // Check if the file exists and is an image
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

        // Create form data to send to the server
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
                
                // Clear the form after successful submission
                setHeading('');
                setContent('');
                setImage(null);
                setImagePreview('');
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
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '20px' }}>
            <h1>Create a New Blog Post</h1>
            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="heading">Blog Heading</label>
                    <input
                        type="text"
                        id="heading"
                        value={heading}
                        onChange={(e) => setHeading(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="content">Blog Content</label>
                    <textarea
                        id="content"
                        rows="5"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        required
                        style={{ width: '100%', padding: '10px', marginTop: '5px' }}
                    />
                </div>

                <div style={{ marginBottom: '20px' }}>
                    <label htmlFor="image">Upload an Image</label>
                    <input
                        type="file"
                        id="image"
                        accept="image/jpeg, image/png"
                        onChange={handleFileChange}
                        required
                    />
                    {imagePreview && (
                        <div style={{ marginTop: '10px' }}>
                            <img src={imagePreview} alt="Preview" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
                </div>

                <button
                    type="submit"
                    style={{ padding: '10px 20px', backgroundColor: '#28a745', color: '#fff', border: 'none', cursor: 'pointer' }}
                    disabled={loading}
                >
                    {loading ? 'Submitting...' : 'Submit Blog Post'}
                </button>
            </form>

            {message && <p style={{ marginTop: '20px', color: message.includes('Error') ? 'red' : 'green' }}>{message}</p>}
        </div>
    );
};

export default BlogForm;
