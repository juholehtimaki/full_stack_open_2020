import React, { useState, useEffect } from "react";
import Blog from "./components/Blog";
import Login from "./components/Login";
import AddBlock from "./components/AddBlog";
import Notification from "./components/Notification";
import blogService from "./services/blogs";
import userService from "./services/users";

const App = () => {
  const [blogs, setBlogs] = useState([]);
  const [user, setUser] = useState(null);
  const [notification, setNotification] = useState();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON);
      setUser(user);
      blogService.setToken(user.token);
      blogService
        .getAll()
        .then((blogs) => setBlogs(blogs.sort((a, b) => b.likes - a.likes)));
    }
  }, []);

  const handleLogout = () => {
    setUser(null);
    window.localStorage.clear();
  };

  const handleNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleNewBlog = async ({ title, author, url }) => {
    const newBlog = {
      title,
      author,
      url,
    };
    console.log(newBlog);
    try {
      const blog = await blogService.create(newBlog);
      setBlogs(blogs.concat(blog));
      handleNotification(`a new blog ${blog.title} added`);
    } catch (e) {} // eslint-disable-line
  };

  const handleLike = async (blog) => {
    const updatedBlogWithLikes = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
    };
    await blogService.update(blog._id, updatedBlogWithLikes);
    for (let bl of blogs) {
      if (bl._id === updatedBlogWithLikes._id)
        bl.likes = updatedBlogWithLikes.likes;
    }
    const sortedBlogs = blogs.sort((a, b) => b.likes - a.likes);
    setBlogs(sortedBlogs);
  };

  const handleDelete = async (blog) => {
    try {
      await blogService.remove(blog._id);
      const updatedBlogs = blogs.filter((x) => x._id !== blog._id);
      setBlogs(updatedBlogs);
    } catch (e) {} // eslint-disable-line
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const user = await userService.login(username, password);
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      setUsername("");
      setPassword("");
      setUser(user);
      blogService.setToken(user.token);
    } catch (e) {
      handleNotification("wrong username or password:D");
    }
  };

  return (
    <>
      {notification && <Notification msg={notification} />}
      {user ? (
        <div>
          <p>{user.name} logged in</p>
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
