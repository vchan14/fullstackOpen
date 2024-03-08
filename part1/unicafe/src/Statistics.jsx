const Statistics = ({good, neutral, bad}) => {

	let average = (good-bad)/(good+neutral+bad);
	let positive = (good)/(good+neutral+bad)
	if (isNaN(average)) {
		average = 0;
	}
	if (isNaN(positive)) {
		positive = 0;
	}

	return (
		<>
			<p>average {average}</p>
			<p>positive {positive}%</p>
		</>

	)
}




export default Statistics;