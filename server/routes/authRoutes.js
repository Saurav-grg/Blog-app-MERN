const express = require('express');
const router = express.Router();
const verifyToken = require('../middleware/verifyToken');
const { google, checkAuth, logout } = require('../controller/authControl');

router.post('/google', google);
router.get('/check-auth', verifyToken, checkAuth);
router.post('/logout', logout);
module.exports = router;
