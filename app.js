const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./api/config/database');
const semesterRoutes = require('./api/routes/semesterRoutes');
const courseRoutes = require('./api/routes/courseRoutes');

// Load env vars
dotenv.config();

// Connect to database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Mount routers
app.use('/api/semesters', semesterRoutes);
app.use('/api/courses', courseRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
