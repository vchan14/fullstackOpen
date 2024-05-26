import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";

const BLOG_USER = 'BLOG_USER';

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
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
    // console.log('logging in with', username, password)
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

  return (
    <div>
      {errorMessage !== null && (<h2>{errorMessage}</h2>)}
      <h2>blogs</h2>
      {user === null ? (
          <LoginForm {...{handleLogin, setUsername, setPassword, username, password }}/>
      ) : (
          <div>
            <button onClick={handleLogout}>Logout</button>
            {blogs.map(blog => <Blog key={blog.id} blog={blog} />)}
          </div>
      )}
    </div>
  )
}

export default App