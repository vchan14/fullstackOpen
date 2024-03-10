const Persons = ({shownPersons, onDelete}) => {
	return (
		<div>
			{shownPersons && shownPersons
				.map(person =>
					<div key={person.name}>
						{`${person.name} ${person.number} `}
						<button onClick={() => onDelete(person.id)}>delete</button>
					</div>)}
		</div>
	)
}

export default Persons;