import {useEffect, useState} from 'react'
import Filter from "./Filter.jsx";
import PersonForm from "./PersonForm.jsx";
import Persons from "./Persons.jsx";
import axios from "axios";
import personService from './services/persons.js';

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

	const hook = () => {
		personService.getAll()
			.then(response => setPersons(response.data))
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

		const oldPerson = persons.find(person => person.name.toLowerCase() === newName.toLowerCase());

		if (oldPerson) {
			const confirmedMessage = `${oldPerson.name} is already added to phonebook, replace the old number with a new one?`;
			if (window.confirm(confirmedMessage)) {
				personService.update(oldPerson.id, {name:oldPerson.name, number: newNumber})
					.then(response => {
						const copy = persons.concat().filter(person => person.id !== oldPerson.id);
						copy.push(response.data);
						setPersons(copy)
					});
			}
			return
		}

		const newPerson = {name:newName, number:newNumber};

		personService.create(newPerson)
			.then(response => setPersons(persons.concat(response.data)));

		setPersons(persons.concat());
		setNewName('');
		setNewNumber('');
	}

	const onDelete = (id) => {
		const person = persons.find(person => 	person.id  === id);
		const confirmedMessage = `Delete ${person.name}`;
		if(!window.confirm(confirmedMessage)) {
			return;
		}
		personService.deleteRequest(id)
			.then(response => {
				const id = response.data.id;
				const copyPersons = [...persons].filter(person => person.id !== id);
				setPersons(copyPersons);
			})
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
			<Persons shownPersons={shownNames()}
				onDelete={onDelete}
			/>
		</div>
	)
}

export default App