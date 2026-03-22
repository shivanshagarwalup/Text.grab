require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/database');
const clipRoutes = require('./routes/clipRoutes');

const app = express();

// Connect to Database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/clip', clipRoutes);

// Health check
app.get('/', (req, res) => {
    res.send('API is running...');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
