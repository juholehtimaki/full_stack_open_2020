import React, { useState } from "react";
import { newAnecdote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifcationReducer";
import { connect } from "react-redux";

const mapDispatchToProps = {
  setNotification,
  newAnecdote,
};

const AnecdoteFormC = ({ setNotification, newAnecdote }) => {
  const [anecdote, setAnecdote] = useState("");

  const handleNewAnecdote = (e) => {
    e.preventDefault();
    setNotification(`${anecdote} added`, 5);
    newAnecdote(anecdote);
    setAnecdote("");
  };

  return (
    <>
      <h2>create new</h2>
      <form onSubmit={handleNewAnecdote}>
        <div>
          <input
            value={anecdote}
            onChange={(e) => setAnecdote(e.target.value)}
          />
        </div>
        <button>create</button>
      </form>
    </>
  );
};

export const AnecdoteForm = connect(null, mapDispatchToProps)(AnecdoteFormC);
