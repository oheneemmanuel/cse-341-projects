const express = require('express');
const router = express.Router();

//router.get('/', (req, res) => {
//  res.send('hello world');
//});
const userControllers =  require("../controllers/user");
router.get('/', userControllers.getAll);

router.get('/:id', userControllers.getSingle);


module.exports = router;