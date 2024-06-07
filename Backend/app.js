const express = require('express');
const app = express();
const cors = require('cors');
const morgan = require('morgan');
const userRoute = require('./routes/userRoute');
const messageRoute = require('./routes/messageRoute');
const AppError = require('./utils/appError');
const gloablErrorHandler = require('./controller/errorController');
//1 global middlewares
if (process.env.NODE_ENV.trim() == 'development') {
  app.use(morgan('dev'));
}
app.use(cors());
app.use(express.json());

app.use('/api', userRoute);
app.use('/api/chat', messageRoute);
app.all('*', (req, res, next) => {
  next(new AppError(`Cant find ${req.originalUrl} on this server`, 404));
});

app.use(gloablErrorHandler);
module.exports = app;
