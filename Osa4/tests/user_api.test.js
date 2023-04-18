const bcrypt = require("bcrypt");
const mongoose = require('mongoose');
const supertest = require('supertest');
const app = require('../app');
const helper = require('./test_helper')
const User = require('../models/blog');
const api = supertest(app);

beforeEach(async () => {
    await User.deleteMany({});
});