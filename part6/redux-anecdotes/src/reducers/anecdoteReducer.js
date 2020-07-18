import anecdoteService from "../services/anecdotes";

const anecdoteReducer = (state = [], action) => {
  switch (action.type) {
    case "VOTE": {
      const newState = [...state];
      for (let obj of newState) {
        if (obj.id === action.data.id) obj.votes = obj.votes + 1;
      }
      return newState.sort((a, b) => b.votes - a.votes);
    }
    case "NEW_ANECDOTE": {
      const newState = [...state, action.data].sort(
        (a, b) => b.votes - a.votes
      );
      return newState;
    }
    case "INITIALIZE_ANECDOTES": {
      return action.data;
    }
    default: {
      return state;
    }
  }
};

export const initializeAnecdotes = () => {
  return async (dispatch) => {
    const anecdotes = await anecdoteService.getAll();
    dispatch({
      type: "INITIALIZE_ANECDOTES",
      data: anecdotes,
    });
  };
};

export const newAnecdote = (anecdote) => {
  return async (dispatch) => {
    const response = await anecdoteService.createNew(anecdote);
    dispatch({
      type: "NEW_ANECDOTE",
      data: response,
    });
  };
};

export const newVote = (anecdote) => {
  const updatedAnecdote = { ...anecdote };
  updatedAnecdote.votes += 1;
  return async (dispatch) => {
    const response = await anecdoteService.updateAnecdote(
      updatedAnecdote.id,
      updatedAnecdote
    );
    dispatch({
      type: "VOTE",
      data: response,
    });
  };
};

export default anecdoteReducer;
