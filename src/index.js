const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const apiRouter = require('./api.js');

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use('/api', apiRouter);

const PORT = 4001;

app.listen(PORT, () => {
  console.log(`server running on PORT: ${PORT}`);
})

module.exports = app;