import { useState } from 'react'
import Statistics from "./Statistics.jsx";

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
				<button onClick={() => setGood(good + 1)}>good</button>
				<button onClick={() => setNeutral(neutral + 1)}>neutral</button>
				<button onClick={() => setBad(bad + 1)}>bad</button>
			</div>

			<h2>statistics</h2>
			{
				(total > 0) && (
					<div className="display">
						<p>good {good}</p>
						<p>neutral {neutral}</p>
						<p>bad {bad}</p>
						<p>all {total}</p>
						<Statistics good={good} neutral={neutral} bad={bad}/>
					</div>
				)
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