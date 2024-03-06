import Part from "./Part.jsx";

const Content = ({parts}) => {
	return (
		<>
			<Part part={parts[0].name} exercise={parts[0].exercises}/>
			<Part part={parts[1].name} exercise={parts[1].exercises}/>
			<Part part={parts[2].name} exercise={parts[2].exercises}/>

		</>
	)
}

export default Content;