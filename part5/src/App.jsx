import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService.js'
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";
import BlogForm from "./components/BlogForm.jsx";

const BLOG_USER = 'BLOG_USER';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const fetchBlogs = async () => {
    const blogs = await blogService.getAll();
    setBlogs(blogs);
  }

  useEffect(async () => {
    await fetchBlogs();
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(BLOG_USER, JSON.stringify(user))
      console.log('user', user)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setErrorMessage('Wrong credentials')
      setTimeout(() => {
        setErrorMessage(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem(BLOG_USER)
    setUser(null)
  }

  const handleAddForm = async (event) => {
    event.preventDefault()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    await blogService.addBlog(blogObject, token);
    await fetchBlogs();
  }

  return (
    <div>
      {errorMessage !== null && (<h2>{errorMessage}</h2>)}
      <h2>blogs</h2>
      {user === null ? (
          <LoginForm {...{handleLogin, setUsername, setPassword, username, password }}/>
      ) : (
          <div>
            <button onClick={handleLogout}>Logout</button>
            <h3>Create New One</h3>
            <BlogForm {...{handleAddForm, setTitle, setAuthor, setUrl, title, author, url}} />
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
      )}
    </div>
  )
}

export default App