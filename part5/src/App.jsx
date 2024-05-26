import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";

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


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)
    try {
      const user = await loginService.login({
        username, password,
      })
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


  return (
    <div>
      {errorMessage !== null && (<h2>{errorMessage}</h2>)}
      <h2>blogs</h2>
      {user === null ? (
          <LoginForm {...{handleLogin, setUsername, setPassword, username, password }}/>
      ) : (
          blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )
      )}
    </div>
  )
}

export default App