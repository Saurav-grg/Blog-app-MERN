const express = require('express');
const crypto = require('crypto');
const router = express.Router();
const {
  createBlog,
  getBlog,
  getALlBlogs,
  getByCategory,
} = require('../controller/blogControl');

const multer = require('multer');
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads');
  },
  filename: function (req, file, cb) {
    const uniqueFilename = crypto.randomBytes(8).toString('hex'); // 16 characters instead of 32
    const fileExtension = file.originalname.split('.').pop();
    cb(null, uniqueFilename + '.' + fileExtension);
  },
});

const upload = multer({ storage: storage });

// const { isAuthorized } = require('../middleware/isAuthorized');
const { isDeveloper } = require('../middleware/isDeveloper');

//public routes
router.get('/', getALlBlogs);
router.get('/:category', getByCategory);

router.get('/:category/:slug', getBlog);

//authorised user routes
// router.use(isAuthorized)
// router.post('/comment', createComment)
// router.post('/like', createLike)

//developer routes
router.post('/create-blog', upload.single('image'), isDeveloper, createBlog);

module.exports = router;
//(economics|fitness&health|technology|self-improvement)
