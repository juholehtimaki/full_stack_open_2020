import React from "react";
import "./index.css";

export const Notification = ({ type, msg }) => {
  const className = type === "success" ? "success-msg-box" : "error-msg-box";
  return (
    <div className={className}>
      <h3>{msg}</h3>
    </div>
  );
};
