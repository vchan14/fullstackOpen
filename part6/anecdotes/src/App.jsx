import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import FilterBasic from "./components/FilterBasic.jsx";
import Notification from "./components/Notification.jsx";
import {useDispatch} from "react-redux";
import {useEffect} from "react";
import {setAnecdote} from "./reducers/anecdoteReducer.js";
import anecdoteService from "./services/anecdotes";

const App = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    anecdoteService.getAll().then(anecdotes => {
      dispatch(setAnecdote(anecdotes));
    });
  }, []);
  return (
    <div>
        <Notification/>
        <h2>Anecdotes</h2>
        <FilterBasic/>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}
export default App