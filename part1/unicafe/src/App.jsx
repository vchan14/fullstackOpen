import { useState } from 'react'
import Statistics from "./Statistics.jsx";
import Button from "./Button.jsx";
import StatisticLine from "./StatisticLine.jsx";

const App = () => {
	// save clicks of each button to its own state
	const [good, setGood] = useState(0)
	const [neutral, setNeutral] = useState(0)
	const [bad, setBad] = useState(0)

	const total = good+neutral+bad;

	return (
		<div>
			<h2>give feedback</h2>
			<div className="buttons">
				<Button handleClick={() => setGood(good + 1)} text="good" />
				<Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
				<Button handleClick={() => setBad(bad + 1)} text="bad" />
			</div>

			<h2>statistics</h2>
			{
				(total > 0) && (<Statistics good={good} neutral={neutral} bad={bad}/>)
			}
			{
				(total === 0) && (
					<p>No feedback given</p>
				)
			}
		</div>
	)
}

export default App