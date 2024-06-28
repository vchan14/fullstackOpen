import {createSlice} from "@reduxjs/toolkit";
import anecdoteService from "../services/anecdotes.js";

const anecdotesAtStart = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000 * Math.random()).toFixed(0)

const asObject = (anecdote) => {
    return {
        content: anecdote,
        id: getId(),
        votes: 0
    }
}


const anecdotesSlice = createSlice({
    name: 'anecdotes',
    initialState : [],
    reducers: {
        incrementVote(state, action) {
            const id = action.payload
            console.log('id', id, action)
            return state
              .map(anecdote => {
                    if (anecdote.id === id) {
                        console.log('anecdote1', anecdote)
                        return {
                            ...anecdote,
                            votes: anecdote.votes + 1
                        }
                    } else {
                        return anecdote
                    }
                }
              );
        },
        createAnecdote(state, action) {
            return [...state, action.payload]
        },
        appendAnecdote(state, action) {
            return [...state, action.payload]
        },
        setAnecdote(state, action) {
            return action.payload
        }
    }
})

export const initializeAnecdotes = () => {
    return async dispatch => {
        const anecdotes = await anecdoteService.getAll()
        dispatch(setAnecdote(anecdotes))
    }
}

export const createAnecdoteDb = (content) => {
    return async dispatch => {
        const newAnecdote = await anecdoteService.createNew(content);
        dispatch(createAnecdote(newAnecdote));
    }
}

export const incrementVoteDb = (id) => {
    return async dispatch => {
        const updatedAnecdote = await anecdoteService.incrementVote(id);
        dispatch(incrementVote(updatedAnecdote.id));
    }
}


export const {incrementVote, createAnecdote, appendAnecdote, setAnecdote} = anecdotesSlice.actions;
export default anecdotesSlice.reducer;