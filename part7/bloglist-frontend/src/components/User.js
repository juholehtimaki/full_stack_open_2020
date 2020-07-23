import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUsers } from "../reducers/usersReducer";
import { useRouteMatch } from "react-router-dom";

const User = () => {
  const users = useSelector((state) => state.users);
  const dispatch = useDispatch();
  useEffect(() => {
    if (!users) {
      dispatch(getUsers());
    }
  }, [dispatch, users]);

  const match = useRouteMatch("/users/:id");
  const user = users.find((user) => user.id === match.params.id);

  if (!user) return null;

  return (
    <div>
      <h1>{user.name}</h1>
      <h3>added blogs</h3>
      <ul>
        {user.blogs.map((blog, index) => (
          <li key={index}>{blog.title}</li>
        ))}
      </ul>
    </div>
  );
};

export default User;
