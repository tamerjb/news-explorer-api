const express = require('express');
// listen to port 3000
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;

const app = express();
const { MONGODB_URI = 'mongodb://localhost:27017/newsdb' } = process.env;
mongoose.connect(MONGODB_URI);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
