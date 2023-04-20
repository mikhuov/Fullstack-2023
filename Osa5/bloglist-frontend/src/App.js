import { useState, useEffect } from 'react';
import Blog from './components/Blog';
import LogInForm from './components/LogInForm';
import blogService from './services/blogs';
import loginService from './services/login';

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState(null);

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, []);

const handleLogin = async (event) => {
  event.preventDefault();

  try {
    const user = await loginService.login({ username, password });
    setUser(user);
    setUsername('');
    setPassword('');
    console.log("logging in with", username, password);
  } catch (exception) {
    console.log(exception);
  }
}

const handleLogout = async (event) => {
  event.preventDefault();
  /* window.localStorage */
  setUser(null);
}

if(user === null) {
  return <LogInForm username={ username } setUsername={ setUsername } password={ password } setPassword={ setPassword } handleLogin={ handleLogin }/>
}

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <h4>{ user.name } logged in <button id='logout' onClick={ handleLogout }>Logout</button></h4>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  );
};

export default App