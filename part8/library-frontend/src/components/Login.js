import React from "react";

export const Login = ({
  name,
  setName,
  password,
  setPassword,
  handleLogin,
  show,
}) => {
  if (!show) return null;
  return (
    <form>
      <div>
        name
        <input value={name} onChange={(e) => setName(e.target.value)} />
      </div>
      <div>
        password
        <input value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <button onClick={handleLogin}>Login</button>
    </form>
  );
};
