import userService from "../services/users";
import blogService from "../services/blogs";
import { setNotification } from "./notifcationReducer";

const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOG_IN_USER": {
      console.log(action.data.user);
      const newUser = { ...action.data.user };
      return newUser;
    }
    case "LOG_OFF_USER": {
      return null;
    }
    case "SET_USER": {
      const newUser = { ...action.data.user };
      return newUser;
    }
    default:
      return state;
  }
};

export const loginUser = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await userService.login(username, password);
      dispatch({
        type: "LOG_IN_USER",
        data: { user },
      });
      window.localStorage.setItem("loggedBlogUser", JSON.stringify(user));
      blogService.setToken(user.token);
    } catch (e) {
      dispatch(setNotification(`wrong username or password`, 5));
    }
  };
};

export const logOutUser = () => {
  return {
    type: "LOG_OFF_USER",
  };
};

export const setUser = (user) => {
  return {
    type: "SET_USER",
    data: { user },
  };
};

export default userReducer;
