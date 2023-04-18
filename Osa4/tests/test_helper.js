const Blog = require('../models/blog');
const User = require('../models/user');

const initialBlogs = [
    {
        _id: "643686d2e11be0f80f9f6c1a",
        title: "testi",
        author: "the author",
        url: "google.com",
        likes: 1
    }
];

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
  };

const usersInDb = async () => {
    const users = await User.find({});
    return users.map(user => user.toJSON());
  };

module.exports = {
    initialBlogs, blogsInDb, usersInDb
}