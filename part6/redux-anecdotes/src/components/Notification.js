import React from "react";
import { connect } from "react-redux";

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
  };
};

const NotificationC = ({ notification }) => {
  const style = {
    border: "solid",
    padding: 10,
    borderWidth: 1,
  };
  return <>{notification && <div style={style}>{notification}</div>}</>;
};

export const Notification = connect(mapStateToProps)(NotificationC);
