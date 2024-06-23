import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import FilterBasic from "./components/FilterBasic.jsx";
import Notification from "./components/Notification.jsx";

const App = () => {
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