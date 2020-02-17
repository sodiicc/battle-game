const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require("path")

require('dotenv').config()

const app = express();
const port = process.env.PORT || 9000;

app.use(express.static(path.join(__dirname, "client", "build")))
app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, {useNewUrlParser: true, useCreateIndex: true});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('MongoB+DB connection is successfully !!!')
})

const heroesRouter = require('./routs/heroesRouter');
const itemsRouter = require('./routs/itemsRouter');
const usersRouter = require('./routs/usersRouter');

app.use('/heroes', heroesRouter);
app.use('/items', itemsRouter);
app.use('/users', usersRouter);

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`)
})