import React, { useState, useEffect, useRef } from 'react';
import Blog from './components/Blog';
import LogInForm from './components/LogInForm';
import BlogForm from './components/BlogForm';
import Notifications from './components/Notifications';
import Togglable from './components/Togglable';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
    const [blogs, setBlogs] = useState([]);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [notification, setNotification] = useState('');
    const [user, setUser] = useState(null);
    const blogFormRef = useRef();

    useEffect(() => {
        blogService.getAll().then(blogs =>
            setBlogs(blogs)
        );  
    }, []);

    useEffect(() => {
        const localStorage = window.localStorage.getItem('Logged User');
        const user = JSON.parse(localStorage);

        if(user) {
            setUser(user);
            blogService.setToken (user.token);
        }
    }, []);

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({ username, password });
            blogService.setToken(user.token);

            setUser(user);
            setUsername('');
            setPassword('');
        
            window.localStorage.setItem(
                'Logged User', JSON.stringify(user)
            );
            console.log('logging in with', username, password);
        } catch (exception) {
            setNotification({
                type: `error`,
                text: `Wrong username or password`
            });
        }
    };

    const handleLogout = async (event) => {
        event.preventDefault();
      
        window.localStorage.removeItem('Logged User');
        setUser(null);
    };

    const createBlog = async (blog) => {
        try {
            blogFormRef.current.toggleVisibility();
            await blogService.createBlog(blog);
            blogService.getAll().then(blogs =>
                setBlogs(blogs)
            );
            setNotification({
                type: `success`,
                text: `A New Blog ${ blog.title } by ${ blog.author } was added`
            });
        } catch (error) {
            setNotification({
                type: `error`,
                text: `Something went wrong, try again`
            });
        }
    };

    const likeBlog = async (blog) => {
        await blogService.like(blog);
        setBlogs(blogs);
    };
        

    const deleteBlog = async (blog) => {
        if(window.confirm(`Remove blog ${ blog.title } by ${ blog.author }`)) {
            await blogService.deleteBlog(blog);
            setBlogs(blogs.filter(currnetBlog => currnetBlog.id !== blog.id));
        } 
    };

    if(user === null) {
        return <div>
            <Notifications notification={ notification }/>
            <LogInForm username={ username } setUsername={ setUsername } 
                password={ password } setPassword={ setPassword } 
                handleLogin={ handleLogin }/>
        </div>;
    }

    return (
        <div>
            <div>
                <h2>blogs</h2>
                <Notifications notification={ notification }/>
                <h4>{ user.name } logged in <button id='logout' onClick={ handleLogout }>Logout</button></h4>
                <div>
                </div>
                <Togglable buttonLabel={ 'New Note' } ref={ blogFormRef }>     
                    <h2>Create New</h2>
                    <BlogForm createBlog={ createBlog }/>
                </Togglable>
                {blogs.sort((a, b) => b.likes - a.likes).map(blog =>
                    <Blog key={blog.id} blog={blog} deleteBlog={ deleteBlog } like={ likeBlog }/>
                )}
            </div>
        </div>
    );
};

export default App;