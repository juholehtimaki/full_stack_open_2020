import blogService from "../services/blogs";

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case "NEW_BLOG": {
      const newState = [...state, action.data].sort(
        (a, b) => b.likes - a.likes
      );
      return newState;
    }
    case "INITIALIZE_BLOGS": {
      return action.data;
    }
    case "DELETE_BLOG": {
      const newState = state
        .filter((blog) => blog._id !== action.data)
        .sort((a, b) => b.likes - a.likes);
      return newState;
    }
    case "NEW_LIKE": {
      const newState = [...state];
      for (let blog of newState) if (blog._id === action.data) blog.likes += 1;
      return state.sort((a, b) => b.likes - a.likes);
    }
    default: {
      return state;
    }
  }
};

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch({
      type: "INITIALIZE_BLOGS",
      data: blogs,
    });
  };
};

export const newBlog = (blog) => {
  return async (dispatch) => {
    const response = await blogService.create(blog);
    dispatch({
      type: "NEW_BLOG",
      data: response,
    });
  };
};

export const deleteBlog = (id) => {
  return async (dispatch) => {
    await blogService.remove(id);
    dispatch({
      type: "DELETE_BLOG",
      data: id,
    });
  };
};

export const newLike = (id, blog) => {
  return async (dispatch) => {
    await blogService.update(id, blog);
    dispatch({
      type: "NEW_LIKE",
      data: id,
    });
  };
};

export default blogReducer;
