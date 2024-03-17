let entries = require("./entries.json");

const express = require('express')
const morgan = require('morgan')

const app = express();
app.use(express.json());

const customMorgan = (function (tokens, req, res) {
	const output = [
		tokens.method(req, res),
		tokens.url(req, res),
		tokens.status(req, res),
		tokens.res(req, res, 'content-length'), '-',
		tokens['response-time'](req, res), 'ms'
	]

	if (req.method === "POST") {
		output.push(JSON.stringify(req.body));
	}
	return output.join(' ');
})

app.use(morgan(customMorgan));


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

// HTTP DELETE
app.delete('/api/persons/:id', (request, response) => {
	const id = Number(request.params.id)
	entries = entries.filter(note => note.id !== id)
	response.status(204).end()
})

// POST  http://localhost:3001/api/persons

const getRandomNumAbstract = () =>  {
	const max_num = 1000000;
	const cache = new Set([1, 2, 3, 4]);
	return () => {
		while(true) {
			const randNum = Math.floor(Math.random() * max_num);
			if (!cache.has(randNum)) {
				cache.add(randNum)
				return randNum;
			}
		}
	}
}

const getRandomNum = getRandomNumAbstract();

const hasName = (name) => {
	return entries.some(entry => entry.name === name);
}

app.post('/api/persons', (request, response) => {
	const body = request.body
	if (!(body.name && body.number)) {
		return response.status(400).json({
			error: `Invalid body format. Need to provide both name and number key-pairs. Received: ${JSON.stringify(body)}`
		})
	}

	const name = body.name;
	const number = body.number;

	if (hasName(name)) {
		return response.status(400).json({
			error: `Name is already exist. ${name}`
		})
	}

	const entry = {
		name,
		number,
		id: getRandomNum(),
	}
	entries = entries.concat(entry)
	response.json(entry)
})


const PORT = 3001
app.listen(PORT, () => {
	console.log(`Server running on port ${PORT}`)
})
