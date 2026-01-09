const mongodb = require("../data/database");
const { ObjectId } = require("mongodb"); // use proper capitalization

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDatabase();
    const results = await db.collection("contacts").find().toArray();
    res.setHeader("Content-Type", "application/json");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const getSingle = async (req, res) => {
  try {
    // Use ObjectId with proper capitalization
    const userId = new ObjectId(req.params.id);
    const db = mongodb.getDatabase();
    const result = await db.collection("contacts").findOne({ _id: userId });

    res.setHeader("Content-Type", "application/json");
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  getSingle,
};
