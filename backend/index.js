const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// Import routers
const accountRouter = require('./controllers/routes/account');
const articlesRouter = require('./controllers/routes/articles');
const stocksRouter = require('./controllers/routes/stocks');

const PORT = process.env.PORT || 4000;
app.use(cors());
app.use(bodyParser.json());

app.use('/api/account', accountRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/stocks', stocksRouter);

app.listen(PORT, () => {
	console.log(`Server is running on port ${PORT}`);
});