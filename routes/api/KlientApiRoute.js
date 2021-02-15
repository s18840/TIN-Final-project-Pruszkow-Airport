const express = require('express');
const router = express.Router();

const KlientApiController = require('../../api/KlientAPI');

router.get('/', KlientApiController.getKlient);
router.get('/:KlientId', KlientApiController.getKlientById);
router.post('/', KlientApiController.createKlient);
router.put('/:KlientId', KlientApiController.updateKlient);
router.delete('/:KlientId', KlientApiController.deleteKlient);

module.exports = router;