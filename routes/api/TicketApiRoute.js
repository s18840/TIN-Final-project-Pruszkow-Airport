const express = require('express');
const router = express.Router();

const ticketApiController = require('../../api/TicketAPI');

router.get('/', ticketApiController.getTickets);
router.get('/:ticketId', ticketApiController.getTicketById);
router.post('/', ticketApiController.createTicket);
router.put('/:ticketId', ticketApiController.updateTicket);
router.delete('/:ticketId', ticketApiController.deleteTicket);

module.exports = router;