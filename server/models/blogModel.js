const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema(
  {
    user: {
      type: String,
      required: true,
    },
    text: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const blogSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    content: {
      type: String,
      required: true,
    },
    img: {
      type: String,
      default: '/uploads/defaultimg01.webp',
    },
    slug: {
      type: String,
      required: true,
      unique: true,
    },
    likes: {
      type: Number,
      default: 0,
    },
    meta: {
      description: { type: String, required: true },
      keywords: [{ type: String, required: true }],
    },
    comments: [commentSchema],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('blogs', blogSchema);
