import React, { useState } from "react";
import ReactDOM from "react-dom";

const App = ({ anecdotes }) => {
  const [selected, setSelected] = useState(0);
  const [points, setPoints] = useState({});

  const getRandomAnecdote = () =>
    setSelected(Math.floor(Math.random() * (anecdotes.length - 0) + 0));

  const handleVote = () => {
    const newPoints = { ...points };
    if (newPoints[anecdotes.indexOf(anecdotes[selected])])
      newPoints[anecdotes.indexOf(anecdotes[selected])] += 1;
    else newPoints[anecdotes.indexOf(anecdotes[selected])] = 1;
    setPoints(newPoints);
  };

  const getMostVotedOne = () => {
    let max = 0;
    let keyOfMostVoted = 0;
    for (let key in points) {
      if (points[key] > max) {
        max = points[key];
        keyOfMostVoted = key;
      }
    }
    return keyOfMostVoted;
  };

  return (
    <div>
      <h1>Anecdote of the day</h1>
      {anecdotes[selected]}
      <div>
        <button onClick={handleVote}>vote</button>
        <button onClick={getRandomAnecdote}>next anecdote</button>
      </div>
      <h1>Anecdote with most votes</h1>
      {anecdotes[getMostVotedOne()]}
    </div>
  );
};

const anecdotes = [
  "If it hurts, do it more often",
  "Adding manpower to a late software project makes it later!",
  "The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
  "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
  "Premature optimization is the root of all evil.",
  "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
];

ReactDOM.render(<App anecdotes={anecdotes} />, document.getElementById("root"));
