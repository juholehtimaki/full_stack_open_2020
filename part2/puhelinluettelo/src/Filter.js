import React from "react";

export const Filter = ({ nameFilter, setNameFilter }) => (
  <div>
    filter shown with
    <input value={nameFilter} onChange={(e) => setNameFilter(e.target.value)} />
  </div>
);
