import React from "react";
import { handleFilter } from "../reducers/filterReducer";
import { useDispatch } from "react-redux";

export const Filter = () => {
  const dispatch = useDispatch();
  const handleChange = (event) => {
    dispatch(handleFilter(event.target.value));
  };
  const style = {
    marginBottom: 10,
  };

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  );
};
