const TicketRepository = require('../repository/sequelize/TicketRepository');
const KlientRepository = require('../repository/sequelize/KlientRepository');
const PlaneRepository = require('../repository/sequelize/PlaneRepository');

exports.showTicketList = (req, res, next) => {
    TicketRepository.getTickets()
        .then(tickets => {
            res.render('pages/ticket/ticket-list', {
                tickets: tickets,
                navLocation: 'ticket'
            });
        });
}


exports.showAddTicketForm = (req, res, next) => {
    let allKlients, allPlanes;
    TicketRepository.getTickets()
        .then(tickets => {
            allTickets = tickets;
            return KlientRepository.getKlients();
        })
        .then(Klients => {
            allKlients = Klients;
            return PlaneRepository.getPlanes();
        })
        .then(planes => {
            allPlanes = planes;
            res.render('pages/ticket/ticket-form', {
                ticket: {},
                formMode: 'createNew',
                allKlients: allKlients,
                allPlanes: allPlanes,
                pageTitle: 'Nowy bilet',
                btnLabel: 'Dodaj bilet',
                formAction: '/ticket/add',
                navLocation: 'ticket',
                validationErrors: []
            });
        });
}

exports.showEditTicketForm = (req, res, next) => {
    const ticketId = req.params.ticketId;
    let allKlients, allPlanes, allTickets;
    TicketRepository.getTickets()
        .then(tickets => {
            allTickets = tickets;
            return KlientRepository.getKlients();
        })
        .then(Klients => {
            allKlients = Klients;
            return PlaneRepository.getPlanes();
        })
        .then(planes => {
            allPlanes = planes;
            return TicketRepository.getTicketById(ticketId);
        })
        .then(ticket => {
            res.render('pages/ticket/ticket-form', {
                ticket: ticket,
                allKlients: allKlients,
                allPlanes: allPlanes,
                allTickets: allTickets,
                formMode: 'edit',
                pageTitle: 'Edycja biletu',
                btnLabel: 'Edytuj bilet',
                formAction: '/ticket/edit',
                navLocation: 'ticket',
                validationErrors: []
            });
        });
}

exports.showTicketDetails = (req, res, next) => {
    let allKlients, allPlanes;
    KlientRepository.getKlients()
        .then(Klients => {
            allKlients = Klients;
            return PlaneRepository.getPlanes();
        }).then(planes => {
            allPlanes = planes;
            const ticketId = req.params.ticketId;
            return TicketRepository.getTicketById(ticketId)
        }).then(ticket => {
            res.render('pages/ticket/ticket-form', {
                ticket: ticket,
                formMode: 'showDetails',
                allKlients: allKlients,
                allPlanes: allPlanes,
                pageTitle: 'Szczegóły biletu',
                formAction: '',
                navLocation: 'ticket',
                validationErrors: []
            });
        });

}
exports.addTicket = (req, res, next) => {
    let allKlients, allPlanes, error;
    const ticketData = { ...req.body };
    TicketRepository.createTicket(ticketData)
        .then(result => {
            res.redirect('/ticket');
        }).catch(err => {
            error = err;
            return KlientRepository.getKlients()
        }).then(Klients => {
            allKlients = Klients;
            return PlaneRepository.getPlanes();
        }).then(planes => {
            allPlanes = planes;
            res.render('pages/ticket/ticket-form', {
                ticket: {},
                formMode: 'createNew',
                allKlients: allKlients,
                allPlanes: allPlanes,
                pageTitle: 'Dodawanie bieltu',
                btnLabel: 'Dodaj bilet',
                formAction: '/ticket/add',
                navLocation: 'ticket',
                validationErrors: error.errors
            });
        });
};

exports.updateTicket = (req, res, next) => {
    let allKlients, allPlanes, error;
    const ticketId = req.body._id;
    const ticketData = { ...req.body };
    TicketRepository.updateTicket(ticketId, ticketData)
        .then(result => {
            res.redirect('/ticket');
        }).catch(err => {
            error = err;
            return KlientRepository.getKlients()
        }).then(Klients => {
            allKlients = Klients;
            return PlaneRepository.getPlanes();
        }).then(planes => {
            allPlanes = planes;
            return Ticket.getTicketById(ticketId)
        }).then(ticket => {
            res.render('pages/ticket/ticket-form', {
                ticket: ticket,
                formMode: 'edit',
                allKlients: allKlients,
                allPlanes: allPlanes,
                pageTitle: 'Edycja biletu',
                btnLabel: 'Edytuj biletu',
                formAction: '/ticket/edit',
                navLocation: 'ticket',
                validationErrors: error.errors
            });
        });
};

exports.deleteTicket = (req, res, next) => {
    const ticketId = req.params.ticketId;
    TicketRepository.deleteTicket(ticketId)
        .then(() => {
            res.redirect('/ticket');
        }).catch(err => {
            res.render('pages/ticket/ticket-form', {
                ticket: ticketData,
                pageTitle: 'Usuwanie biletu',
                formMode: 'delete',
                btnLabel: 'usuń bilet',
                formAction: '/ticket/delete',
                navLocation: 'ticket',
                validationErrors: []
            })
        });
};

