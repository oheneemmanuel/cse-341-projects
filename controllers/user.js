// Here is where our logic will be implemented
const mongodb = require('../data/database');
const { ObjectId } = require('mongodb');

// Get all contacts
const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const results = await db.collection('contacts').find().toArray();
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get single contact
const getSingle = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').findOne({ _id: userId });

    if (!result) {
      return res.status(404).json({ message: 'Contact not found' });
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Create new contact
const createContact = async (req, res) => {
  try {
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').insertOne(user);

    if (result.acknowledged && result.insertedId) {
      res.status(201).json({ message: 'Contact created successfully!', id: result.insertedId });
    } else {
      res.status(500).json({ message: 'Creating a contact failed!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update contact
const updateContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const user = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      favoriteColor: req.body.favoriteColor,
      birthday: req.body.birthday
    };

    const db = mongodb.getDatabase();
    const result = await db
      .collection('contacts')
      .replaceOne({ _id: userId }, user);

    if (result.matchedCount > 0) {
      res.status(200).json({ message: 'Contact updated successfully!' });
    } else {
      res.status(404).json({ message: 'Contact not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete contact
const deleteContact = async (req, res) => {
  try {
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection('contacts').deleteOne({ _id: userId });

    if (result.deletedCount > 0) {
      res.status(200).json({ message: 'Contact deleted successfully!' });
    } else {
      res.status(404).json({ message: 'Contact not found!' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
  createContact,
  updateContact,
  deleteContact
};
