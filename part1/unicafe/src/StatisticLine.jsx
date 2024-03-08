const StatisticLine = ({text, value}) => {
	const displayedText = `${text} ${value}`;
	return (
		<tr>
			<td>{text}</td>
			<td>{value}</td>
		</tr>
	)
}

export default StatisticLine;