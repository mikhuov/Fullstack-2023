const http = require('http');
const express = require('express');
const app = express();
const cors = require('cors');
const mongoose = require('mongoose');
const Blog = require('./models/blog')
const config = require('./utils/config');
const logger = require('./utils/logger');

const PORT = 3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});