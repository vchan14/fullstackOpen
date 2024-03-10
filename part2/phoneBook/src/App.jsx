import {useEffect, useState} from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import axios from "axios";

const App = () => {
	const [persons, setPersons] = useState([])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');
	const [newSearch, setNewSearch] = useState('');

	// example of axios and effect-initialPersonsHook
	const initialPersonsHook = () => {
		axios
			.get('http://localhost:3001/persons')
			.then(response => {
				setPersons(response.data)
			})
	}
	useEffect(initialPersonsHook, [])

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

		const newPerson = {name:newName, number:newNumber};

		axios
			.post('http://localhost:3001/persons', newPerson)
			.then(response => {
				setPersons(persons.concat(response.data));
			})

		setPersons(persons.concat());
		setNewName('');
		setNewNumber('');


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