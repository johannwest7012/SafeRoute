

console.log("Starting wafflehacks project SafeRoute");


const express = require('express');
const cors = require('cors');

const app = express();
const bodyParser = require('body-parser');
const db = require('./db');
const countryRouter = require('./routes/country');



// Other middleware and route handlers
app.use(bodyParser.json());

db.connect();
app.use(cors());

app.use('/api/country', countryRouter);


const port = process.env.PORT || 4000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});


