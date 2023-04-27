import React, { useState } from 'react';
import PropTypes from 'prop-types';

const Blog = ({ blog, deleteBlog, like, username }) => {
    const [blogVisible, setBlogVisible] = useState(false);

    const deleteButton = () => {
        if(blog.user.username === username) {
            return (
                <button id='delete-button' onClick={ () => deleteBlog(blog) }>Remove</button>
            );
        }
    };

    if(!blogVisible) {
        return (
            <div className="blog-border">
                { blog.title }, { blog.author } <button id='view-button' onClick={() => setBlogVisible(true) }>View</button>
            </div>
        );
    }

    return (
        <div className="blog-border">
            { blog.title }, { blog.author } <button onClick={ () => setBlogVisible(false) }>Hide</button>
            <div>{ blog.url }</div>
            <div>{ blog.likes } <button id='like-button' onClick={ () => like(blog) }>Like</button></div>
            <div>{ blog.user.name }</div>
            <div>{ deleteButton() }</div>
        </div>  
    );
};

Blog.propTypes = {
    blog: PropTypes.object.isRequired,
    deleteBlog: PropTypes.func.isRequired,
    like: PropTypes.func.isRequired
};
  

export default Blog;