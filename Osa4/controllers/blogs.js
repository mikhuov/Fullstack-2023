const blogRouter = require("express").Router();
const Blog = require("../models/blog");

blogRouter.get("/", async (request, response) => {
    Blog.find({}).then(result => {
        response.json(result);
    });
});

module.exports = blogRouter;