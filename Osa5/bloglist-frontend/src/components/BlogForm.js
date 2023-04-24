import React, { useState } from 'react';
import PropTypes from 'prop-types';

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [url, setUrl] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
        createBlog({
            title: title,
            author: author,
            url: url
        });
        
        setTitle('');
        setAuthor('');
        setUrl('');
    };

    return (
        <form onSubmit={ handleSubmit }> 
            <div>
                Title: <input id='title' value={ title } required onChange={({ target }) => setTitle(target.value)}></input>
            </div>
            <div>
                Author: <input id='author' value={ author } required onChange={({ target }) => setAuthor(target.value)}></input>
            </div>
            <div>
                Url: <input id='url' value={ url } required onChange={({ target }) => setUrl(target.value)}></input>
            </div>
            <div>
                <button id='create-button' type='submit'>Create</button>
            </div>
        </form>
    );
};

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
};

export default BlogForm;