const Total = ({ parts }) => {
	const totalExercises = parts.reduce((a, b) => a + b.exercises, 0);
	return (
		<p>Number of exercises: {totalExercises}</p>
	);
};

export default Total;