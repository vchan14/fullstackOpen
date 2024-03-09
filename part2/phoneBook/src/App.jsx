import { useState } from 'react'

const App = () => {
	const [persons, setPersons] = useState([
		{ name: 'Arto Hellas' }
	])
	const [newName, setNewName] = useState('');

	const handleInputChange = (e) => {
		const newString = e.target.value;
		setNewName(newString);
	}

	const shownNames = () => {
		return (persons.map(person => <div key={person.name}>{person.name}</div>));
	}

	const handleSubmit = (e) => {
		e.preventDefault();
		setPersons(persons.concat({name:newName}));
		setNewName('');
	}

	return (
		<div>
			<h2>Phonebook</h2>
			<form onSubmit={handleSubmit}>
				<div>
					name:
					<input
						value={newName}
						onChange={handleInputChange}
					/>
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