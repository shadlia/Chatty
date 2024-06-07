const mongoose = require('mongoose');
const dotenv = require('dotenv');

const app = require('./app');
const { configureSocket } = require('./utils/socket');
dotenv.config({ path: './config.env' });

//Docker configuration
const uri = process.env.MONGODB_URI;
mongoose
  .connect(uri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch((err) => console.error('Error connecting to MongoDB:', err));

//1- dataabase
/* const db = process.env.DATABASE.replace(
  '<PASSWORD>',
  process.env.DATABASE_PASSWORD,
);
mongoose
  .connect(db)
  .then((conn) => {
    console.log('Connected to database');
  })
  .catch((error) => {
    console.log('Failed to connect to database' + error.message);
  }); */
//2- Server
const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
  console.log(`app listening on port ${port}`);
});

// Socket connection
const io = configureSocket(server);
