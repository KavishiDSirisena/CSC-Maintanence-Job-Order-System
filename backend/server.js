const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();

require("dotenv").config();

const PORT = process.env.PORT || 8000;


app.use(cors());
app.use(express.json());

const URI = process.env.ATLAS_URI;

mongoose.connect(URI);


const connection = mongoose.connection;

connection.once("open", () => {
  console.log('MongoDB Connection Success!!!...')
})

const usersRouter = require('./routes/users');
const addordersRouter = require('./routes/addorders');
const maintainersRouter = require('./routes/maintainers');


app.use('/users',usersRouter);
app.use('/addorders',addordersRouter);
app.use('/maintainers',maintainersRouter);



app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
})