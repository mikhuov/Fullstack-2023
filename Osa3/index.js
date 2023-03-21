const express = require('express')
const morgan = require("morgan");
const app = express()
app.use(express.json());

morgan.token("data", request => {
  return request.method === "POST" ? JSON.stringify(request.body) : "";
});

app.use( morgan(":method :url :status :res[content-length] - :response-time ms :data") );

let persons = [
    {
      "name": "Arto Hellas",
      "number": "040-123456",
      "id": 1
    },
    {
      "name": "Ada Lovelace",
      "number": "39-44-5323523",
      "id": 2
    },
    {
      "name": "Dan Abramov",
      "number": "12-43-234345",
      "id": 3
    },
    {
      "name": "Mary Poppendieck",
      "number": "39-23-6423122",
      "id": 4
    },
    {
      "name": "test",
      "number": "123",
      "id": 5
    }
  ];
  
app.get('/api/persons', (request, response) => {
  response.json(persons);
});

app.get('/info', (request, response) => {
  response.send(
    `
    <p>Phonebook has info for ${ persons.length } people</p>
    <p>${ new Date() }</p>
    `
  )
});

app.post('/api/persons', (request, response) => {
  const body = request.body
  console.log(`body`, body);

  const personObj = {
    name:  request.body.name,
    number:  request.body.number,
    id: Math.random() * 1000000
  };

  if(!body.name || !body.number || persons.find(person => person.name === personObj.name)) {
    return response.status(400).json({
      error: 'Content missing or Person already exists'
    });
  } else {
    response.json(personObj);
  }
});

app.get('/api/persons/:id', (request, response)  => {
  const id = Number(request.params.id);
  const person = persons.find(person => person.id === id);
  response.json(person);
});

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter(person => person.id !== id);

  response.status(204).end();
});

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
});