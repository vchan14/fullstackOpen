const Course = ({course}) => {

	const {name, parts, id} = course;

	const totalExercises = parts.reduce((acc, part) => {
		return acc + part.exercises;
	}, 0)

	return (
		<>
			<h2 className="header">
				{name}
			</h2>

			{parts.map(part =>
				<p key={part.id}>
					{`${part.name} ${part.exercises}`}
				</p>
			)}

			<h4>
				{`total of ${totalExercises} exercises`}
			</h4>

		</>
	)
}

export default Course;