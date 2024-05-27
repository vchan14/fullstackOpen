import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService.js'
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/notification/Notification.jsx";

const BLOG_USER = 'BLOG_USER';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [url, setUrl] = useState('');

  const [messageObj, setMessageObj] = useState({message:'', isError: false});

  const timeoutMessage = () => {
    setTimeout(() => {
      setMessageObj({
        message: '',
        isError: false
      })
    }, 5000)
  }

  const fetchBlogs = async () => {
    if (!user) return;
    const token = user.token;
    const blogs = await blogService.getAll(token);
    setBlogs(blogs);
  }

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER)
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
    }
  }, [])

  useEffect( () => {
    fetchBlogs()
  }, [user])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(BLOG_USER, JSON.stringify(user))
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (exception) {
      setMessageObj({
            message: 'Wrong credentials',
            isError: true
        })
        timeoutMessage()
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
    try {
      await blogService.addBlog(blogObject, token);
      await fetchBlogs();
      setMessageObj({
        message: `A new blog ${title} by ${author} added`,
        isError: false
      })
    } catch (e) {
      setMessageObj({
        message: 'Failed to add blog',
        isError: true
      })
    }
    timeoutMessage()
  }

  return (
    <div>
      <Notification messageObj={messageObj}/>
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