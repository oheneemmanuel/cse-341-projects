const express = require('express');
const mongodb = require('./data/database');
require('dotenv').config();



const app = express();
// the port to host the server in the browser
const port = process.env.PORT || 3000;

//middleware to parse JSON request bodies
app.use(express.json());

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, PUT, DELETE, OPTIONS'
  );
  next(); 
});




app.use('/', require('./route/index'));

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }
});
