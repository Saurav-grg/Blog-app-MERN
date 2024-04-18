const express = require('express');
const mongoose = require('mongoose');

const session = require('express-session');
const MongoStore = require('connect-mongo');
const cors = require('cors');
const blogRoutes = require('./routes/blogRoutes');
const authRoutes = require('./routes/authRoutes');

// const proxy = require('express-http-proxy');
const passport = require('passport');
const app = express();
require('dotenv').config();

// app.set('trust proxy', true);

// // Use the express-http-proxy middleware
// app.use(proxy());
const passportSetup = require('./passport');

//middleware
app.use(express.json());
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
const mongoUrl = process.env.MONGODB_KEY;
app.use(
  session({
    secret: process.env.SESSION_SECRET, // Replace with a secure secret key
    resave: false,
    saveUninitialized: true,
    name: 'zenxenquest',
    cookie: {
      maxAge: 24 * 60 * 60 * 1000 * 2, // 2 days
      sameSite: 'none',
    },
    store: MongoStore.create({ mongoUrl }),
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.get('/', (req, res) => {
  res.json('Hello there!! ');
});
app.use('/api/blogs', blogRoutes);
app.use('/api/auth', authRoutes);

mongoose.connect(process.env.MONGODB_KEY).then(() => {
  console.log('Connected to database');
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
