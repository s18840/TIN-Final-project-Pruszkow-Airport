const TicketRepository = require('../repository/sequelize/TicketRepository');

exports.getTickets = (req, res, next) => {
    TicketRepository.getTickets()
        .then(tickets => {
            res.status(200).json(tickets);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getTicketById = (req, res, next) => {
    const ticketId = req.params.ticketId;
    TicketRepository.getTicketById(ticketId)
        .then(ticket => {
            if (!ticket) {
                res.status(404).json({
                    message: 'Ticket with id: ' + ticketId + ' not found'
                })
            } else {
                res.status(200).json(ticket);
            }
        });
};

exports.createTicket = (req, res, next) => {
    TicketRepository.createTicket(req.body)
        .then(newObj => {
            res.status(201).json(newObj);
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};

exports.updateTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    TicketRepository.updateTicket(ticketId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Ticket updated!', ticket: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    TicketRepository.deleteTicket(ticketId)
        .then(result => {
            res.status(200).json({ message: 'Removed ticket', ticket: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};