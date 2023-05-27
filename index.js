const express = require('express');

const app = express();

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

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

const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Server running on ${port}, http://localhost:${port}`));
