import AnecdoteForm from "./components/AnecdoteForm.jsx";
import AnecdoteList from "./components/AnecdoteList.jsx";
import FilterBasic from "./components/FilterBasic.jsx";

const App = () => {
  return (
    <div>
        <h2>Anecdotes</h2>
        <FilterBasic/>
        <AnecdoteList/>
        <AnecdoteForm/>
    </div>
  )
}
export default App