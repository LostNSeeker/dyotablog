const express = require('express');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const blogRoutes = require('./routes/blogRoutes');
const cors = require('cors');
const path = require('path');
const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));

// Define Routes
app.use('/api/auth', authRoutes);
app.use("/api/blog", blogRoutes); // Ensures all blog routes are under "/api/blog"
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
