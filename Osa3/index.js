const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
const Person = require('./models/person');

app.use(express.json());
app.use(cors());
app.use(express.static('build'));

morgan.token('data', request => {
    return request.method === 'POST' ? JSON.stringify(request.body) : '';
});

app.use( morgan(':method :url :status :res[content-length] - :response-time ms :data') );
  
app.get('/api/persons', (request, response) => {
    Person.find({}).then(result => {
        response.json(result);
    });
});

app.get('/info', (request, response, next) => {
    Person.find({}).then(people => {
        response.send(
            `<p>Phonebook has info for ${
                people.length
            } people</p><p>${new Date()}</p>`
        );
    }).catch(error => next(error));
});

app.post('/api/persons', async (request, response, next) => {
    const body = request.body;

    const personObj = new Person({
        name:  body.name,
        number:  body.number
    });

    if(!body.name || !body.number || await Person.findOne({name: personObj.name})) {
        return response.status(400).json({
            error: 'Content missing or Person already exists'
        });
    } else {
        personObj.save().then(result => {
            response.json(result);
        }).catch(error => next(error));
    }
});

app.get('/api/persons/:id', (request, response, next)  => {
    Person.findById(request.params.id).then(person => {
        if (person) {
            response.json(person);
        } else {
            response.status(404).end();
        }
    }).catch(error => next(error));
});

app.delete('/api/persons/:id', (request, response, next) => {
    Person.findByIdAndDelete(request.params.id).then(() => {
        response.status(204).end();
    }).catch(error => next(error));
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});