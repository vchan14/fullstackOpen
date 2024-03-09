const Course = ({course}) => {

	const {name, parts, id} = course;

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

		</>
	)
}

export default Course;