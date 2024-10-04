const express = require('express');
const mongoose = require('mongoose');

const cors = require('cors');
const cookieParser = require('cookie-parser');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();
require('dotenv').config();

//middleware
app.use(express.json());
app.use(cookieParser());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//
const corsOptions = {
  origin: ['http://localhost:5173', 'https://zenith-quest.vercel.app'],

  credentials: true,
};

app.use(cors(corsOptions));

app.get('/', (req, res) => {
  res.json('Hello there!! ');
});
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_KEY).then(() => {
  // console.log('Connected to database');
  app.listen(process.env.PORT || 5000, () =>
    console.log(
      `Server is running on port ${
        process.env.PORT || 5000
      }, https://zenquest-api.vercel.app , http://localhost:${
        process.env.PORT
      }/api/blogs`
    )
  );
});
