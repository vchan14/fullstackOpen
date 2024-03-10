import { useState } from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-123456', id: 1 },
		{ name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
		{ name: 'Dan Abramov', number: '12-43-234345', id: 3 },
		{ name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
	])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	const handleNewSearch = (e) => {
		const newString = e.target.value;
		setNewSearch(newString)
	}

	const handleNameChange = (e) => {
		const newString = e.target.value;
		setNewName(newString);
	}

	const handleNewNumberChange = (e) => {
		const newNumber = e.target.value;
		setNewNumber(newNumber);
	}

	const shownNames = () => {
		return persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.some(person => person.name === newName)) {
			alert(`${name} is already added to phonebook`);
			return
		}
		setPersons(persons.concat({name:newName, number:newNumber, id:persons.length}));
		setNewName('');
		setNewNumber('')
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<Filter newSearch={newSearch} handleNewSearch={handleNewSearch} />
			<h3>add a new</h3>
			<PersonForm
				handleSubmit={handleSubmit}
				newName={newName}
				handleNameChange={handleNameChange}
				newNumber={newNumber}
				handleNewNumberChange={handleNewNumberChange}
			/>
			<h3>Numbers</h3>
			<Persons shownPersons={shownNames()} />
		</div>
	)
}

export default App