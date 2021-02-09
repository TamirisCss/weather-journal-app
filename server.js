// Setup empty JS object to act as endpoint for all routes
projectData = [];
// Express to run server and routes
const express = require ('express');

// Start up an instance of app
const app = express();

/* Dependencies */
const bodyParser = require('body-parser');

/* Middleware*/

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors = require('cors');
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const port = 8000;

const server = app.listen(port, listening);

function listening() {
    console.log(server);
    console.log(`running on localhost: ${port}`);
}

// Callback to debug

// Initialize POST /all route with a callback function
app.post('/add', (req,res) => {
  res.send('POST received');
  addData(req.body)
  console.log(req.body)
});

// Adds post content to the projectData list
const addData = (body) => {
    projectData.push(body)
}

// Callback function to complete GET '/all'
app.get('/all', (req, res) => {
    res.send(projectData)
});