require('dotenv').config();
const mongoose = require('mongoose');
const url = process.env.MONGODB_URI;
console.log('url', url);

mongoose.set('strictQuery', false);
mongoose.connect(url).then(() => {
    console.log('Connected to MongoDB');
});

const validator = [ 
    {
        validator: number => {
            return /\d{2,3}-\d{7}/.test(number);
        },
        message: result => `${result.value} is not a valid phone number!`
    }
];

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minlength: 3,
        required: true
    },
    number: {
        type: String,
        validate: validator, 
        required: true
    }
});

personSchema.set('toJSON', {
    transform: (document, returnedObject) => {
        returnedObject.id = returnedObject._id.toString();
        delete returnedObject._id;
        delete returnedObject.__v;
    }
});

module.exports = mongoose.model('Person', personSchema);