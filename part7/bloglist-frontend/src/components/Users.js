import React, { useEffect } from "react";
import { getUsers } from "../reducers/usersReducer";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
const Users = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  const users = useSelector((state) => state.users);
  return (
    <div>
      <h1>Users</h1>
      {users.map((user, index) => (
        <div key={index}>
          <p>
            <Link to={`/users/${user.id}`}>{user.name}</Link>,{" "}
            {user.blogs.length} blogs created
          </p>
        </div>
      ))}
    </div>
  );
};

export default Users;
