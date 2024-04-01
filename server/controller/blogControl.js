const Blog = require('../models/blogModel');
const slugify = require('slugify');

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
//
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
module.exports = { createBlog, getBlog, getALlBlogs, getByCategory };
