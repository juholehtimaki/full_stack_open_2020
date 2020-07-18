const initilState = "";

const filterReducer = (state = initilState, action) => {
  switch (action.type) {
    case "HANDLE_FILTER":
      return action.data.filter;
    default:
      return state;
  }
};

export const handleFilter = (filter) => {
  return {
    type: "HANDLE_FILTER",
    data: { filter },
  };
};

export default filterReducer;
