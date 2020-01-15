require('dotenv/config')
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

console.log(process.env.DB_URL);

mongoose.connect('mongodb+srv://omnistack:omnistack@gusflopes-gqdvm.mongodb.net/omnistack10?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

app.listen(3333);