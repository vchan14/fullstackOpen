import {createAnecdoteDb} from "../reducers/anecdoteReducer.js";
import {useDispatch} from "react-redux";

const AnecdoteForm = () => {
    const dispatch = useDispatch();
    const addAnecdote =  (event) => {
        event.preventDefault();
        const content = event.target.anecdote.value;
        event.target.anecdote.value = '';
        dispatch(createAnecdoteDb(content));
    }

    return (
        <div>
            <h2>create new</h2>
            <form onSubmit={addAnecdote}>
                <div><input name="anecdote" /></div>
                <button>create</button>
            </form>
        </div>


    )

}

export default AnecdoteForm