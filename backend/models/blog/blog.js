const mongoose = require('mongoose');

// Blog post Schema
const BlogPostSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: [100, 'Title cannot exceed 100 characters'],
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    index: true,
  },
  content: {
    type: String,
    required: true,
    minlength: [2, 'Content must be at least 100 characters long'],
  },
  excerpt: {
    type: String,
    maxlength: [300, 'Excerpt cannot exceed 300 characters'],
    default: '',
  },
  author: {
    type: String,
    required: true,
  },
  tags: [{
    type: String,
    trim: true,
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
  publishedAt: {
    type: Date,
    default: null,
  },
  status: {
    type: String,
    enum: ['draft', 'published', 'archived'],
    default: 'draft',
  },
  coverImage: {
    type: String,
    default: '',
  },
  seo: {
    title: {
      type: String,
      maxlength: [70, 'SEO title cannot exceed 70 characters'],
      default: '',
    },
    description: {
      type: String,
      maxlength: [160, 'SEO description cannot exceed 160 characters'],
      default: '',
    },
    keywords: [{
      type: String,
    }],
  },
  views: {
    type: Number,
    default: 0,
  },
  comments: [{
    author: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
    status: {
      type: String,
      enum: ['approved', 'pending', 'spam'],
      default: 'pending',
    },
  }],
}, {
  timestamps: true,
});

// Pre-save middleware to update the slug
BlogPostSchema.pre('save', function (next) {
  if (this.title) {
    this.slug = this.title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^[-]+|[-]+$/g, '');
  }
  next();
});

BlogPostSchema.plugin(require('mongoose-autopopulate'))

module.exports = mongoose.model('Blog', BlogPostSchema)
