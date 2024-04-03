const Blog = require('../models/blogModel');
const slugify = require('slugify');
const mongoose = require('mongoose');

//create new blog
const createBlog = async (req, res) => {
  try {
    const { title, img, meta, ...rest } = req.body;
    const metaData = JSON.parse(meta);
    const { description, keywords } = metaData;
    const keywordsArray = keywords.split(',').map((keyword) => keyword.trim());

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
      img: req.file ? req.file.path : 'uploads/default01.webp',
      meta: {
        description,
        keywords: keywordsArray,
      },
      ...rest,
    });
    console.log(req.file);
    res.status(200).json(newBlog);
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
};
//edit blog
const editBlog = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, category, content, meta, image } = req.body;
    const metaData = JSON.parse(meta);
    const { description, keywords } = metaData;
    // Find the blog post by id and update it
    const blogPost = await Blog.findByIdAndUpdate(
      id,
      {
        title,
        category,
        content,
        meta: {
          description,
          keywords,
        },
        image,
      },
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
    const blogPost = await Blog.find().select(
      '-content -comments -likes -updatedAt'
    );

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

    const blog = await Blog.findOneAndDelete({ _id: id });
    if (!blog) {
      return res.status(404).json({ error: 'data not found' });
    }
    res.status(200).json(blog);
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
