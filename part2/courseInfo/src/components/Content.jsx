import Part from "./Part.jsx";

const Content = ({parts}) => {
	return (
		<>
			{parts.map(({name, exercises, id}) => <Part key={id} name={name} exercise={exercises}/>
			)}
		</>
	)
}

export default Content;