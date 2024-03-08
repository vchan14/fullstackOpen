import StatisticLine from "./StatisticLine.jsx";

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
			<table>
				<tbody>
				<StatisticLine text="good" value={good}/>
				<StatisticLine text="neutral" value={neutral}/>
				<StatisticLine text="bad" value={bad}/>
				<StatisticLine text="all" value={good+neutral+bad}/>
				<StatisticLine text="avearge" value={Number(average.toFixed(1))}/>
				<StatisticLine text="positive" value={Number(positive.toFixed(1)) + '%'}/>
				</tbody>
			</table>
		</>

	)
}




export default Statistics;