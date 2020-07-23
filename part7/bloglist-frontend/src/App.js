import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import AddBlock from "./components/AddBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import { useDispatch, useSelector } from "react-redux";
import { setNotification } from "./reducers/notifcationReducer";
import {
  initializeBlogs,
  newBlog,
  deleteBlog,
  newLike,
} from "./reducers/blogReducer";
import { loginUser, setUser, logOutUser } from "./reducers/userReducer";

const App = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const dispatch = useDispatch();
  const notification = useSelector((state) => state.notification);
  const blogs = useSelector((state) => state.blog);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(initializeBlogs());
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const parsedUser = JSON.parse(loggedUserJSON);
      blogService.setToken(parsedUser.token);
      dispatch(setUser(parsedUser));
    }
  }, [dispatch]);

  const handleLogout = () => {
    dispatch(logOutUser());
    window.localStorage.clear();
  };

  const handleNewBlog = ({ title, author, url }) => {
    const blog = {
      title,
      author,
      url,
    };
    dispatch(newBlog(blog));
    dispatch(setNotification(`${title} added`, 5));
  };

  const handleLike = (blog) => {
    console.log(user);
    const updatedBlogWithLikes = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    dispatch(newLike(blog._id, updatedBlogWithLikes));
  };

  const handleDelete = (blog) => {
    dispatch(deleteBlog(blog._id));
    dispatch(setNotification(`${blog.title} deleted`, 5));
  };

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginUser(username, password));
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
      {user ? (
        <div>
          <p>{user.username} logged in</p>
          <button onClick={handleLogout}>Logout</button>
          <h2>blogs</h2>
          {notification && <Notification msg={notification} />}
          {blogs.map((blog) => (
            <Blog
              key={blog.id}
              blog={blog}
              handleDelete={handleDelete}
              handleLike={handleLike}
            />
          ))}
          <AddBlock handleNewBlog={handleNewBlog} />
        </div>
      ) : (
        <>
          <Login
            username={username}
            password={password}
            handleUsernameChange={({ target }) => setUsername(target.value)}
            handlePasswordChange={({ target }) => setPassword(target.value)}
            handleLogin={handleLogin}
          />
        </>
      )}
    </>
  );
};

export default App;
