import React from "react";
import "./index.css";

export const Notification = ({ notification }) => {
  if (notification === null) return null;
  return (
    <div
      className={
        notification.type === "success" ? "success-msg-box" : "error-msg-box"
      }
    >
      <h3>{notification.msg}</h3>
    </div>
  );
};
