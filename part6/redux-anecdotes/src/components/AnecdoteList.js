import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { newVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notifcationReducer";

export const AnecdoteList = () => {
  const anecdotes = useSelector((state) => state.anecdotes);
  const filter = useSelector((state) => state.filter);
  const dispatch = useDispatch();

  const vote = (anecdote) => {
    dispatch(newVote(anecdote));
    dispatch(setNotification(`you voted ${anecdote.content}`, 5));
  };
  return (
    <>
      {anecdotes.map((anecdote) =>
        anecdote.content.includes(filter) ? (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ) : null
      )}
    </>
  );
};
