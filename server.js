const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const designerRoutes = require('./routes/designerRoutes');
const playerRoutes = require('./routes/playerRoutes');
const profileRoutes = require('./routes/profileRoutes');

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/designer', designerRoutes);
app.use('/api/player', playerRoutes);
app.use('/api/profile', profileRoutes); 

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

