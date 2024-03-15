let entries = require("./entries.json");

const express = require('express')
const app = express()

app.get('/', (request, response) => {
	response.send('<h1>Hello World!</h1>')
})

// GET all
app.get('/api/persons', (request, response) => {
	response.json(entries)
})

// GET info
app.get('/info', (request, response) => {
	const numEntries = entries.length;

	const currentDate = new Date();
	const dateString = currentDate.toString();

	console.log(numEntries, dateString);
	response.send(`
		<p>Phonebook has info for ${numEntries} people</p>
		<p>${dateString}</p>
	`)
})


// GET http://localhost:3001/api/persons/5
app.get('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	const entry = entries.find(note => note.id === id)

	if (entry) {
		response.json(entry)
	} else {
		response.status(404).end()
	}
})


const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
