const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
    Blog.find({}).then(result => {
        response.json(result);
    });
});

blogRouter.post("/", async (request, response) => {
    const blog = await new Blog({
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes,
    });
    
    const savedBlog = await blog.save();

    response.status(201).json(savedBlog.toJSON());
});

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndRemove(request.params.id);
    response.status(204).end();
});

blogRouter.put('/:id', async (request, response) => {
    const blogToUpdate = await Blog.findByIdAndUpdate(request.params.id, request.body);
    response.status(200).json(blogToUpdate.toJSON());
});

module.exports = blogRouter;