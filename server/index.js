const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogRoutes");
const cors = require('cors');

const app = express();

// Connect Database
connectDB();

// Initialize Middleware
app.use(express.json());
app.use(cors());

// Define Routes
app.use("/api/auth", authRoutes);
app.use("/api/blog", blogRoutes); // Changed to "/api/blog" for consistency

const PORT = 5001;

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
