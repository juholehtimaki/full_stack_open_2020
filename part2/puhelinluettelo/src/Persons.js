import React from "react";

export const Persons = ({ persons, nameFilter, handleDelete }) => (
  <div>
    {persons
      .filter((person) =>
        person.name.toLowerCase().includes(nameFilter.toLowerCase())
      )
      .map((person, index) => (
        <p key={index}>
          {person.name} {person.number}
          <button onClick={() => handleDelete(person)}>delete</button>
        </p>
      ))}
  </div>
);
