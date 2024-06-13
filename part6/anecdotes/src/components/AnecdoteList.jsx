import {useDispatch, useSelector} from "react-redux";
import {incrementVote} from "../reducers/anecdoteReducer.js";

const AnecdoteList = () => {
    const sortedAnecdotes = useSelector(state => state.sort((a, b) => b.votes - a.votes));
    const dispatch = useDispatch()

    const vote = (id) => {
        dispatch(incrementVote(id));
        console.log('vote', id)
    }
    return (
        <>
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

        </>
    )
}

export default AnecdoteList;