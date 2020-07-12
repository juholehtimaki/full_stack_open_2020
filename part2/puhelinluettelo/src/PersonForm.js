import React from "react";

export const PersonForm = ({
  newName,
  newPhoneNumber,
  handleNewNumber,
  setNewName,
  setNewPhoneNumber,
}) => (
  <form onSubmit={handleNewNumber}>
    <h2>add a new</h2>
    <div>
      name:
      <input value={newName} onChange={(e) => setNewName(e.target.value)} />
    </div>
    <div>
      number:
      <input
        value={newPhoneNumber}
        onChange={(e) => setNewPhoneNumber(e.target.value)}
      />
    </div>
    <div>
      <button type="submit">add</button>
    </div>
  </form>
);
