//Here is where we define our routes for contact-related operations
const express = require('express');
const router = express.Router();

// Requiring the user controllers to implement the logic
const userControllers = require('../controllers/user');

//Route to get the contacts from the database

router.get('/', userControllers.getAll);

router.get('/:id', userControllers.getSingle);

router.post('/', userControllers.createContact);

router.put('/:id', userControllers.updateContact);

router.delete('/:id', userControllers.deleteContact);

module.exports = router;
