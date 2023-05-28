const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser')

const app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');


const corsOpts = {
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: [
    'Content-Type'
  ]
}

app.use(cors());
console.log("App is using cors");

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

app.use('/index', indexRouter);
app.use('/user', usersRouter);

app.get('/', (req, res) => res.send('Home Page Route'));

app.get('/about', (req, res) => res.send('About Page Route'));

app.get('/portfolio', (req, res) => res.send('Portfolio Page Route'));

app.get('/contact', (req, res) => res.send('Contact Page Route'));



const mongoose = require("mongoose");
const uri = "mongodb+srv://igniteAdmin:6Yx0hbSU3dqsdW8F@webproject.88plx.mongodb.net/temp"
console.log(uri);
mongoose.connect(uri);
const connection = mongoose.connection;

const port = process.env.PORT || 3005;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
