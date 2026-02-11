const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const { errorHandler } = require('./middleware/errorMiddleware');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const blogRoutes = require('./routes/blogRoutes');

dotenv.config();
connectDB();

const app = express();

// CORS
app.use(cors({
  origin: [
    "http://localhost:3000",
    "https://your-frontend.onrender.com"
  ],
  credentials: true
}));

// BODY PARSER (2MB to allow 1MB image + Base64 overhead)
app.use(express.json({ limit: '2mb' }));
app.use(express.urlencoded({ limit: '2mb', extended: true }));

// ROUTES
app.use('/api/users', userRoutes);
app.use('/api/blogs', blogRoutes);

// ERROR HANDLER
app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));