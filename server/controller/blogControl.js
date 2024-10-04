const Blog = require('../models/blogModel');
const slugify = require('slugify');
const mongoose = require('mongoose');

//create new blog
const createBlog = async (req, res) => {
  try {
    const { title, meta, ...rest } = req.body;
    const metaData = JSON.parse(meta);

    // Generate slug from the title
    const slug = slugify(title, {
      lower: true,
      strict: true,
      trim: true,
    });

    // Create a new blog post with the slug
    const newBlog = await Blog.create({
      title,
      slug,
      meta: metaData,
      ...rest,
    });
    res.status(200).json({ success: true, newBlog });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//edit blog
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, meta, img } = req.body;
    const metaData = JSON.parse(meta);

    const updates = {
      title,
      category,
      content,
      meta: metaData,
    };

    // If the image field is not empty or null, update the image field
    if (img !== null && img !== '') {
      updates.img = img;
    }

    // Find the blog post by id and update it
    const blogPost = await Blog.findByIdAndUpdate(
      id,
      { $set: updates },
      { new: true }
    );

    // If the blog post doesn't exist, return a 404 error
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }

    // If the blog post was updated successfully, return the updated blog post
    res.status(200).json(blogPost);
  } catch (error) {
    // If there was an error, return a 500 error and the error message
    res.status(500).json({ error: error.message });
  }
};

//full blog view
const getBlog = async (req, res) => {
  try {
    const { slug, category } = req.params;
    const blogPost = await Blog.findOne({ slug, category });
    const relatedBlogs = await Blog.find({
      category,
      _id: { $ne: blogPost._id }, // Exclude blog post with matching slug
    })
      .limit(4)
      .select('title img slug');
    if (!blogPost) {
      return res.status(404).json({ error: 'Blog post not found' });
    }
    res.status(200).json({ blogPost, relatedBlogs });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};

//get all
const getALlBlogs = async (req, res) => {
  try {
    const blogPost = await Blog.find()
      .select('-content -comments -likes -updatedAt')
      .sort({ createdAt: -1 });

    if (!blogPost) {
      return res.status(404).json({ error: 'Blogs empty ' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//get by category
const getByCategory = async (req, res) => {
  try {
    const { category } = req.params;
    const blogPost = await Blog.find({ category }).select(
      'title slug img meta.description category createdAt'
    );

    if (!blogPost) {
      return res.status(404).json({ error: 'Blogs empty ' });
    }
    res.status(200).json(blogPost);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//delete a blog
const deleteBlog = async (req, res) => {
  try {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({ error: 'data not found' });
    }

    // Find the blog post
    const blog = await Blog.findById(id);
    if (!blog) {
      return res.status(404).json({ error: 'data not found' });
    }

    // Delete the blog post from the database
    const deletedBlog = await Blog.findByIdAndDelete(id);
    if (!deletedBlog) {
      return res.status(500).json({ error: 'Failed to delete blog post' });
    }
    res.status(200).json(deletedBlog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  createBlog,
  getBlog,
  getALlBlogs,
  getByCategory,
  deleteBlog,
  editBlog,
};
