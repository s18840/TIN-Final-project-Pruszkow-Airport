const express = require('express');
const router = express.Router();

const KlientControler = require('../controllers/KlientController');
router.get('/', KlientControler.showKlientList);
router.get('/add', KlientControler.showAddKlientForm);
router.get('/details/:KlientId', KlientControler.showKlientDetails);
router.get('/edit/:KlientId', KlientControler.showEditKlientForm);
router.post('/add', KlientControler.addKlient);
router.post('/edit', KlientControler.updateKlient);
router.get('/delete/:KlientId', KlientControler.deleteKlient);

module.exports = router;