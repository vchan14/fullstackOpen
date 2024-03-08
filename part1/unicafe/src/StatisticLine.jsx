const StatisticLine = ({text, value}) => {
	const displayedText = `${text} ${value}`;
	return (
		<p>{displayedText}</p>
	)
}

export default StatisticLine;