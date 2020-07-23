import React, { useState } from "react";
import PropTypes from "prop-types";

const Blog = ({ blog, handleDelete, handleLike }) => {
  const [showInfo, setShowInfo] = useState(false);

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  const authorizedToDelete = async () => {
    const loggedUserJSON = window.localStorage.getItem("loggedBlogUser");
    const user = JSON.parse(loggedUserJSON);
    if (!user) return false;
    return blog.user.username === user.username;
  };

  return (
    <div style={blogStyle} id={blog.title} className="blog-container">
      <h3>
        {blog.title}
        <button id="view-button" onClick={() => setShowInfo(!showInfo)}>
          {showInfo ? "hide" : "view"}
        </button>
      </h3>
      {showInfo && (
        <div>
          <h4 className="url">
            {blog.url} {blog.author}
          </h4>
          <h4 className="likes">
            likes {blog.likes}{" "}
            <button id="like-button" onClick={() => handleLike(blog)}>
              like
            </button>
          </h4>
          {authorizedToDelete() && (
            <button id="delete-button" onClick={() => handleDelete(blog)}>
              remove
            </button>
          )}
        </div>
      )}
    </div>
  );
};

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleDelete: PropTypes.func.isRequired,
  handleLike: PropTypes.func.isRequired,
};

export default Blog;
