const router = require('express').Router();

const contactsRoutes = require('./contact');
const swaggerRoutes = require('./swagger');
router.get('/', (req, res) => {
  res.send('Welcome to the Contact Management API');
});

router.use('/contacts', contactsRoutes);
router.use('/', swaggerRoutes);



module.exports = router;