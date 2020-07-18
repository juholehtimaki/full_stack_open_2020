import React, { useState } from "react";
import PropTypes from "prop-types";

const AddBlog = ({ handleNewBlog }) => {
  const [blogVisible, setBlogVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [url, setUrl] = useState("");

  const addBlock = (e) => {
    e.preventDefault();
    handleNewBlog({ title, author, url });
    setTitle("");
    setAuthor("");
    setUrl("");
  };

  return (
    <div>
      {blogVisible ? (
        <>
          <h2>create new</h2>
          <form className="blog-form" onSubmit={addBlock}>
            <div>
              title:
              <input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>
            <div>
              author:
              <input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
              />
            </div>
            <div>
              url:
              <input
                id="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
              />
            </div>
            <button id="create-button">Create</button>
          </form>
          <button onClick={() => setBlogVisible(!blogVisible)}>cancel</button>
        </>
      ) : (
        <button id="new-blog" onClick={() => setBlogVisible(!blogVisible)}>
          new blog
        </button>
      )}
    </div>
  );
};

AddBlog.propTypes = {
  handleNewBlog: PropTypes.func.isRequired,
};

export default AddBlog;
