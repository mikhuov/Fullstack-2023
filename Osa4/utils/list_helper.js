const _ = require("lodash");

const dummy = blogs => {
    return 1;
};

const totalLikes = blogs => {
    return blogs.length === 0 ? 0: blogs.reduce((sum, post) => sum + post.likes, 0);
};

const favoriteBlog = blogs => {
    const blog = _.maxBy(blogs, 'likes');
    
    return {
        title: blog.title,
        author: blog.author,
        likes: blog.likes
    }
};

const mostBlogs = blogs => {
    const blogsObj = _.countBy(blogs, 'author');
    const amount = Math.max(...Object.values(blogsObj));
    const name = Object.keys(blogsObj).find(key => blogsObj[key] === amount);

    return {
        author: name,
        blogs: amount
    }
};

const mostLikes = blogs => {
    const authors = _.chain(blogs).groupBy("author").map((value, key) => ({ author: key, likes: _.sumBy(value, "likes")})).value();
    
    return _.maxBy(authors, 'likes');
};

module.exports = {
    dummy,
    totalLikes,
    favoriteBlog,
    mostBlogs,
    mostLikes
};