const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const User = require('../models/blog');
const api = supertest(app);

describe('When there is initially one user at db', () => {  
    beforeEach(async () => {
        await User.deleteMany({});
    });

    test("Creating a new user", async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Testi',
            name: 'Post Testi',
            password: 'salasana'
        };

        await api.post('/api/users').send(newUser).expect(201).expect("Content-Type", /application\/json/);

        const usersAtEnd = await helper.usersInDb();
        expect(usersAtEnd).toHaveLength(usersAtStart.length + 1);
    
        const usernames = usersAtEnd.map(user => user.username);
        expect(usernames).toContain(newUser.username);
    });

    test('Password is too short', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'salasanaTesti',
            name: 'Salasana Testi',
            password: '12'
        };

       const result = await api.post('/api/users').send(newUser).expect(400).expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain('Username and Password have to be at least 3 chacarcters');

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    });

    test('Username is too short', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: '12',
            name: 'Salasana Testi',
            password: '123'
        };

       const result = await api.post('/api/users').send(newUser).expect(400).expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain('Username and Password have to be at least 3 chacarcters');

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    });

    test('Username already exists', async () => {
        const usersAtStart = await helper.usersInDb();

        const newUser = {
            username: 'Testi',
            name: 'Salasana Testi',
            password: '123'
        };

       const result = await api.post('/api/users').send(newUser).expect(400).expect("Content-Type", /application\/json/);

        expect(result.body.error).toContain('Username already exists');

        const usersAtEnd = await helper.usersInDb()
        expect(usersAtEnd).toHaveLength(usersAtStart.length)
    });
});