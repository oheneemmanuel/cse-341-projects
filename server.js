const express = require('express');
const mongodb = require('./data/database');
require('dotenv').config();

const app = express();
// the port to host the server in the browser
const port = process.env.PORT || 3000;

// Importing the contact routes
const contactsRoutes = require("./route/contact");

app.get('/', (req, res) => {
  res.send('Welcome to the Contact Management API');
});
app.use("/contacts", contactsRoutes);

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  }
  else {
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  }

});