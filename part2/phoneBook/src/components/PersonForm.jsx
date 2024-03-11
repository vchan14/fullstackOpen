const PersonForm = ({handleSubmit, newName, handleNameChange,
	                    newNumber, handleNewNumberChange}) => {

	console.log('person formmmmm');
	return (
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
	)
}


export default PersonForm;