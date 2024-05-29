import {useState, useEffect, useRef} from 'react'
import Blog from './components/Blog'
import blogService from './services/blogService.js'
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/notification/Notification.jsx";
import Togglable from "./components/Togglable.jsx";

const BLOG_USER = 'BLOG_USER';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

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
    blogs.sort((a, b) => b.likes - a.likes);
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

  const handleAddForm = async (blogObject) => {
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    debugger;
    try {
      await blogService.addBlog(blogObject, token);
      await fetchBlogs();
      setMessageObj({
        message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
        isError: false
      })
      blogFormRef.current.toggleVisibility()
    } catch (e) {
      setMessageObj({
        message: 'Failed to add blog',
        isError: true
      })
    }
    timeoutMessage()
  }

  const handleIncreaseLikes = async (blog) => {
    blog.likes += 1;
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    try {
      await blogService.updateBlog(blog, token);
      await fetchBlogs();
    } catch (e) {
      setMessageObj({
        message: 'Failed to update blog',
        isError: true
      })
    }
    timeoutMessage()
  }

  const handleDeleteBlog = async (blog) => {
    const isAccepted = window.confirm(`Remove blog ${blog.title} by ${blog.author}`);
    if (!isAccepted) return;
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    try {
      await blogService.deleteBlog(blog.id, token);
      await fetchBlogs();
    } catch (e) {
      setMessageObj({
        message: 'Failed to delete blog',
        isError: true
      })
    }
    timeoutMessage()
  }

  const blogFormRef = useRef()

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
            <Togglable buttonLabel='new blog' cancelLabel="cancel" ref={blogFormRef}>
              <BlogForm {...{handleAddForm}} />
            </Togglable>
            {blogs.map(blog =>
                <Blog key={blog.id}
                      blog={blog}
                      name={user?.name}
                      handleIncreaseLikes={handleIncreaseLikes}
                      handleDeleteBlog={handleDeleteBlog}
            />)}
          </div>
      )}
    </div>
  )
}

export default App