const express = require('express');
const router = express.Router();

const planeApiController = require('../../api/PlaneAPI');

router.get('/', planeApiController.getPlanes);
router.get('/:planeId', planeApiController.getPlaneById);
router.post('/', planeApiController.createPlane);
router.put('/:planeId', planeApiController.updatePlane);
router.delete('/:planeId', planeApiController.deletePlane);

module.exports = router;