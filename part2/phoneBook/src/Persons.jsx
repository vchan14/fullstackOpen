const Persons = ({shownPersons}) => {
	return (
		<div>
			{shownPersons && shownPersons.map(person => <div key={person.name}>{`${person.name} ${person.number}`}</div>)}
		</div>
	)
}

export default Persons;