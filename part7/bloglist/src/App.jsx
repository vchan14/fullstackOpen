import { useState, useEffect, useRef, useCallback } from "react";
import Blog from "./components/Blog";
import blogService from "./services/blogService.js";
import LoginForm from "./components/LoginForm.jsx";
import loginService from "./services/loginService.js";
import BlogForm from "./components/BlogForm.jsx";
import Notification from "./components/notification/Notification.jsx";
import Togglable from "./components/Togglable.jsx";
import { setNotification } from "./reducers/notificationReducer.js";
import { useDispatch } from "react-redux";

const BLOG_USER = "BLOG_USER";

const App = () => {
  const dispatch = useDispatch();

  const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);

  const [messageObj, setMessageObj] = useState({ message: "", isError: false });

  const fetchBlogs = useCallback(async () => {
    if (!user) return;
    const token = user.token;
    const blogs = await blogService.getAll(token);
    blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(blogs);
  }, [user]);

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem(BLOG_USER);
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [user, fetchBlogs]);

  const handleLogin = async (event) => {
    event.preventDefault();
    try {
      const user = await loginService.login({ username, password });
      window.localStorage.setItem(BLOG_USER, JSON.stringify(user));
      setUser(user);
      setUsername("");
      setPassword("");
    } catch (exception) {
      dispatch(
        setNotification(
          {
            message: "Wrong credentials ",
            isError: true,
          },
          5,
        ),
      );
    }
  };

  const handleLogout = () => {
    window.localStorage.removeItem(BLOG_USER);
    setUser(null);
  };

  const handleAddForm = async (blogObject) => {
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    try {
      await blogService.addBlog(blogObject, token);
      await fetchBlogs();
      dispatch(
        setNotification({
          message: `A new blog ${blogObject.title} by ${blogObject.author} added`,
          isError: false,
        }),
      );
      blogFormRef.current.toggleVisibility();
    } catch (e) {
      dispatch(setNotification("Failed to add blog"));
    }
  };

  const handleIncreaseLikes = async (blog) => {
    blog.likes += 1;
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    try {
      await blogService.updateBlog(blog, token);
      await fetchBlogs();
    } catch (e) {
      dispatch(
        setNotification({
          message: "Failed to update blog",
          isError: true,
        }),
      );
    }
  };

  const handleDeleteBlog = async (blog) => {
    const isAccepted = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}`,
    );
    if (!isAccepted) return;
    const user = window.localStorage.getItem(BLOG_USER);
    const token = JSON.parse(user).token;
    try {
      await blogService.deleteBlog(blog.id, token);
      await fetchBlogs();
      dispatch(
        setNotification({
          message: `Blog ${blog.title} by ${blog.author} deleted`,
          isError: false,
        }),
      );
    } catch (e) {
      dispatch(
        setNotification({
          message: "Failed to delete blog",
          isError: true,
        }),
      );
    }
  };

  const blogFormRef = useRef();

  return (
    <div>
      <Notification />
      <h2>blogs</h2>
      {user === null ? (
        <LoginForm
          {...{ handleLogin, setUsername, setPassword, username, password }}
        />
      ) : (
        <div>
          <p>
            Welcome <b>{user.name}</b>
          </p>
          <button onClick={handleLogout}>Logout</button>
          <h3>Create New One</h3>
          <Togglable
            buttonLabel="new blog"
            cancelLabel="cancel"
            ref={blogFormRef}
          >
            <BlogForm {...{ handleAddForm }} />
          </Togglable>
          <div className="blog-list">
            {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blog={blog}
                name={user?.name}
                handleIncreaseLikes={handleIncreaseLikes}
                handleDeleteBlog={handleDeleteBlog}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
