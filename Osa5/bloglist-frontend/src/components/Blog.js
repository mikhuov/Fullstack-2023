import React, { useState } from 'react';

const Blog = ({ blog, deleteBlog, like }) => {
    const [blogVisible, setBlogVisible] = useState(false);

    if(!blogVisible) {
        return (
            <div className="blog-border">
                { blog.title }, { blog.author } <button onClick={() => setBlogVisible(true) }>View</button>
            </div>
        );
    }

    return (
        <div className="blog-border">
            { blog.title }, { blog.author } <button onClick={() => setBlogVisible(false) }>Hide</button>
            <div>{ blog.url }</div>
            <div>{ blog.likes } <button onClick={ () => like(blog) }>Like</button></div>
            <div>{ blog.user.name }</div>
            <div><button onClick={ () => deleteBlog(blog) }>Remove</button></div>
        </div>  
    );
};

export default Blog;