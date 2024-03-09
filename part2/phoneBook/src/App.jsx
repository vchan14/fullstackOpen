import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas', number: '040-1234567'}
	])
	const [newName, setNewName] = useState('');
	const [newNumber, setNewNumber] = useState('');

	const handleNameChange = (e) => {
		const newString = e.target.value;
		setNewName(newString);
	}

	const handleNewNumberChange = (e) => {
		const newNumber = e.target.value;
		setNewNumber(newNumber);
	}

	const shownNames = () => {
		return (persons.map(person => <div key={person.name}>{`${person.name} ${person.number}`}</div>));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		if (persons.some(person => person.name === newName)) {
			alert(`${name} is already added to phonebook`);
			return
		}
		setPersons(persons.concat({name:newName, number:newNumber}));
		setNewName('');
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					<div>
						name:
						<input
							value={newName}
							onChange={handleNameChange}
						/>
					</div>
					<div>
						number:
						<input
							value={newNumber}
							onChange={handleNewNumberChange}
						/>

					</div>

				</div>
				<div>
					<button type="submit">add</button>
				</div>
			</form>
			<h2>Numbers</h2>
			{shownNames()}

		</div>
	)
}

export default App