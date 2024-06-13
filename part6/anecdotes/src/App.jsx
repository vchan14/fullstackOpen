import { useSelector, useDispatch } from 'react-redux'
import {incrementVote} from "./reducers/anecdoteReducer.js";
import AnecdoteForm from "./components/AnecdoteForm.jsx";

const App = () => {
    const sortedAnecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));
    const dispatch = useDispatch()

    const vote = (id) => {
      dispatch(incrementVote(id));
    console.log('vote', id)
    }

  return (
    <div>
      <h2>Anecdotes</h2>
      {sortedAnecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
        <AnecdoteForm/>

    </div>
  )
}

export default App