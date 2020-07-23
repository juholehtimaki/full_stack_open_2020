const initilState = "";
let timeOut;

const notificationReducer = (state = initilState, action) => {
  switch (action.type) {
    case "NOTIFICATION_ON":
      return action.data.msg;
    case "NOTIFICATION_OFF":
      return "";
    default:
      return state;
  }
};

export const notificationOn = (msg) => {
  return {
    type: "NOTIFICATION_ON",
    data: { msg },
  };
};

export const notificationOff = () => {
  return {
    type: "NOTIFICATION_OFF",
  };
};

export const setNotification = (msg, duration) => {
  return async (dispatch) => {
    clearTimeout(timeOut);
    dispatch(notificationOn(msg));
    timeOut = setTimeout(() => {
      dispatch(notificationOff());
    }, duration * 1000);
  };
};

export default notificationReducer;
