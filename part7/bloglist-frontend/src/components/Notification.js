import React from "react";
import PropTypes from "prop-types";

const Notification = ({ msg }) => (
  <div>
    <h2>{msg}</h2>
  </div>
);

Notification.propTypes = {
  msg: PropTypes.string.isRequired,
};

export default Notification;
