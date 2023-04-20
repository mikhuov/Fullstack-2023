const blogRouter = require("express").Router();
const Blog = require("../models/blog");
const config = require("../utils/config");
const jwt = require("jsonwebtoken");
const logger = require("../utils/logger");
const middleware = require("../utils/middleware");
const User = require('../models/user');

blogRouter.get("/", async (request, response) => {
    const blogs = await Blog.find({}).populate("user", { username: 1, name: 1 });
    response.json(blogs);
});

blogRouter.post("/", async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!(token && decodedToken.id)) {
      return response.status(401).json({ error: "token missing or invalid" });
    }
  
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes,
      user: user._id,
    });
  
    const savedBlog = await blog.save();
  
    user.blogs = user.blogs.concat(savedBlog._id);
    await user.save();
  
    response.status(201).json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
    const body = request.body;
    const token = request.token;
    const decodedToken = jwt.verify(token, config.SECRET);
    const user = await User.findById(decodedToken.id);

    if (!(token && decodedToken.id)) {
      return response.status(401).json({ error: `Unauthorized user` });
    }

    const blogToDelete = await Blog.findById(request.params.id);

    if (blogToDelete.user._id.toString() === user._id.toString()) {
      await Blog.findByIdAndRemove(request.params.id);
      response.status(204).end();
    } else {
      return response.status(401).json({ error: `Unauthorized user` });
    }

    response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).json(blogToUpdate.toJSON());
});

module.exports = blogRouter;