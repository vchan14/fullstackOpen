import {useDispatch, useSelector} from "react-redux";
import {incrementVote, incrementVoteDb} from "../reducers/anecdoteReducer.js";
import {notificationClear, notificationUpdate} from "../reducers/notificationReducer.js";

const AnecdoteList = () => {
    const sortedAnecdotes = useSelector(state =>
        [...state.anecdotes]
            .sort((a, b) => b.votes - a.votes)
            .filter(anecdote => anecdote.content.includes(state.filter))
    );
    const dispatch = useDispatch()

    const vote = (id, content) => {
        dispatch(incrementVoteDb(id));
        dispatch(notificationUpdate(`you voted '${content}'`))
        setTimeout(() => {
            dispatch(notificationClear())
        }, 5000)
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
                        <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                    </div>
                </div>
            )}

        </>
    )
}

export default AnecdoteList;