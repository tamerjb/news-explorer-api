const express = require('express');
const mongoose = require('mongoose');

const { PORT = 3000 } = process.env;
const helmet = require('helmet');
const cors = require('cors');
require('dotenv').config({ path: './.env' });
const { errors } = require('celebrate');

const app = express();
const { MONGODB_URI = 'mongodb://localhost:27017/newsdb' } = process.env;
mongoose.connect(MONGODB_URI);
const { requestLogger, errorLogger } = require('./middleware/logger');
const { limiter } = require('./middleware/limiter');

const router = require('./routes');
const errorHandler = require('./middleware/errorHandler');

app.use(cors());

app.options('*', cors());

app.use(helmet());

app.use(limiter);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(requestLogger);

app.use(router);

app.use(errorLogger);
app.use(errors());
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
