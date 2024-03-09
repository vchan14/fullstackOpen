import Header from "./Header.jsx";
import Content from "./Content.jsx";

const Course = ({course}) => {

	const {name, parts, id} = course;

	const totalExercises = parts.reduce((acc, part) => {
		return acc + part.exercises;
	}, 0)

	return (
		<>
			<Header course={name}/>
			<Content parts={parts}/>
			<h4>
				{`total of ${totalExercises} exercises`}
			</h4>

		</>
	)
}

export default Course;