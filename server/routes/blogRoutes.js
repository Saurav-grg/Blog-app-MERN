const express = require('express');
// const crypto = require('crypto');
const router = express.Router();
const {
  createBlog,
  getBlog,
  getALlBlogs,
  getByCategory,
  deleteBlog,
  editBlog,
} = require('../controller/blogControl');
const verifyToken = require('../middleware/verifyToken');
/*  When using FormData, the data is not sent as a plain JSON object but as a multipart/form-data request.
    To fix this issue, you need to make sure that your server-side
    code is properly parsing the incoming multipart/form-data request. In your case, since you're using Express.js,
    you can use the multer middleware to handle file uploads and parse the request body.*/

// const multer = require('multer');
// const upload = multer();

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
router.use(verifyToken);
router.delete('/delete-blog/:id', isDeveloper, deleteBlog);
router.post('/create-blog', isDeveloper, createBlog);
router.put('/edit-blog/:id', isDeveloper, editBlog);

module.exports = router;
//(economics|fitness&health|technology|self-improvement)
