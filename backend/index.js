const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routers
const usersRouter = require('./controllers/routes/users');
const accountRouter = require('./controllers/routes/account');
const articlesRouter = require('./controllers/routes/articles');

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.use('/api/users', usersRouter);
app.use('/api/account', accountRouter);
app.use('/api/articles', articlesRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});