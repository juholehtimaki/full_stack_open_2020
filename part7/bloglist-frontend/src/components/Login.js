import React from "react";
import PropTypes from "prop-types";

const Login = ({
  username,
  password,
  handleUsernameChange,
  handlePasswordChange,
  handleLogin,
}) => {
  return (
    <div>
      <h1>Login</h1>
      <form className="login-form" onSubmit={handleLogin}>
        <div>
          username
          <input
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          password
          <input
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button id="login-button">Login</button>
      </form>
    </div>
  );
};

Login.propTypes = {
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  handleLogin: PropTypes.func.isRequired,
};

export default Login;
