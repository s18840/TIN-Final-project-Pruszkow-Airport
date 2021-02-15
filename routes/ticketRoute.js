const express = require('express');
const router = express.Router();

const ticketControler = require('../controllers/ticketController');
router.get('/', ticketControler.showTicketList);
router.get('/add', ticketControler.showAddTicketForm);
router.get('/details/:ticketId', ticketControler.showTicketDetails);
router.get('/edit/:ticketId', ticketControler.showEditTicketForm);
router.post('/add', ticketControler.addTicket);
router.post('/edit', ticketControler.updateTicket);
router.get('/delete/:ticketId', ticketControler.deleteTicket);

module.exports = router;