import React, { useState, useEffect } from "react";
import personService from "./services/persons";

//componenets
import { PersonForm } from "./PersonForm";
import { Persons } from "./Persons";
import { Filter } from "./Filter";
import { Notification } from "./Notification";

export const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newPhoneNumber, setNewPhoneNumber] = useState("");
  const [nameFilter, setNameFilter] = useState("");
  const [notification, setNotification] = useState(null);

  useEffect(() => {
    personService.getAll().then((response) => setPersons(response));
  }, []);

  const handleNewNumber = (e) => {
    e.preventDefault();
    if (checkIfPersonExists()) {
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personService
          .update(findId(), { name: newName, number: newPhoneNumber })
          .then(() => {
            const newPersons = [...persons];
            for (let person of newPersons) {
              if (person.name === newName) person.number = newPhoneNumber;
            }
            setPersons(newPersons);
            handleNotification({ type: "success", msg: `Updated ${newName}` });
            setNewName("");
            setNewPhoneNumber("");
            return;
          })
          .catch((e) => {
            handleNotification({
              type: "error",
              msg: e.response.data.error.message,
            });
          });
      }
      return;
    }
    personService
      .create({ name: newName, number: newPhoneNumber })
      .then((result) => {
        setPersons(
          persons.concat({
            name: newName,
            number: newPhoneNumber,
            id: result.id ? result.id : null, //getting new id from the backend, should probably get the whole thing and not just id
          })
        );
        handleNotification({ type: "success", msg: `Added ${newName}` });
        setNewName("");
        setNewPhoneNumber("");
      })
      .catch((e) =>
        handleNotification({
          type: "error",
          msg: e.response.data.error.message,
        })
      );
  };

  const handleDelete = (personToBeDeleted) => {
    if (window.confirm(`Delete ${personToBeDeleted.name}?`))
      personService
        .deletePerson(personToBeDeleted.id)
        .then(() => {
          const newPersons = persons.filter(
            (person) => person.id !== personToBeDeleted.id
          );
          setPersons(newPersons);
          handleNotification({
            type: "success",
            msg: `Succesfully deleted ${newName}`,
          });
        })
        .catch((e) =>
          handleNotification({
            type: "error",
            msg: e.response.data.error.message,
          })
        );
  };

  const findId = () => {
    for (let person of persons) {
      if (person.name === newName) return person.id;
    }
  };

  const checkIfPersonExists = () => {
    for (let person of persons) {
      if (person.name === newName) return true;
    }
    return false;
  };

  const handleNotification = ({ type, msg }) => {
    setNotification({ type: type, msg: msg });
    setTimeout(() => setNotification(null), 2000);
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter nameFilter={nameFilter} setNameFilter={setNameFilter} />
      <h2>add a new</h2>
      <PersonForm
        newName={newName}
        newPhoneNumber={newPhoneNumber}
        handleNewNumber={handleNewNumber}
        setNewName={setNewName}
        setNewPhoneNumber={setNewPhoneNumber}
      />
      <h2>Numbers</h2>
      <Persons
        persons={persons}
        nameFilter={nameFilter}
        handleDelete={handleDelete}
      />
    </div>
  );
};
