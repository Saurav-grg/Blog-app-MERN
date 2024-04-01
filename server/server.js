const express = require('express');
const mongoose = require('mongoose');
const session = require('express-session');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

const passport = require('passport');
const app = express();
require('dotenv').config();

const passportSetup = require('./passport');

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});
//
const corsOptions = {
  origin: 'http://localhost:5173',
  credentials: true,
};

app.use(cors(corsOptions));
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 24 * 60 * 60 * 1000, // 24 hours
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);
app.use('/uploads', express.static('uploads'));

mongoose.connect(process.env.MONGODB_KEY).then(() => {
  console.log('Connected to database');
  app.listen(5000, () =>
    console.log(
      'Server is running on port 5000, http://localhost:5000/api/blogs'
    )
  );
});
