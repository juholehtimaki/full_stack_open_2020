import userService from "../services/users";

const usersReducer = (state = [], action) => {
  switch (action.type) {
    case "GET_USERS": {
      return action.data.users;
    }
    default:
      return state;
  }
};

export const getUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch({
        type: "GET_USERS",
        data: { users },
      });
    } catch (e) {}
  };
};

export default usersReducer;
