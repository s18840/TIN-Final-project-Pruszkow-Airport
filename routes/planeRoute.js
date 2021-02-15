const express = require('express');
const router = express.Router();

const planeControler = require('../controllers/planeController');
router.get('/', planeControler.showPlaneList);
router.get('/add', planeControler.showAddPlaneForm);
router.get('/details/:planeId', planeControler.showPlaneDetails);
router.get('/edit/:planeId', planeControler.showEditPlaneForm);
router.post('/add', planeControler.addPlane);
router.post('/edit', planeControler.updatePlane);
router.get('/delete/:planeId', planeControler.deletePlane);

module.exports = router;