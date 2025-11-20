const express = require('express');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const candidates = require('./routes/candidates');
require('dotenv').config();


const app = express();


// Connect DB
connectDB();


// Middleware
app.use(cors());
app.use(express.json());


// Serve uploads statically
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));


// Routes
app.use('/api/candidates', candidates);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));