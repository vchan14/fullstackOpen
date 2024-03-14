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

const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
