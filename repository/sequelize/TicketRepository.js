const Sequelize = require('sequelize');

const Ticket = require('../../model/sequelize/Ticket');
const Klient = require('../../model/sequelize/Klient');
const Plane = require('../../model/sequelize/Plane');

exports.getTickets = () => {
    return Ticket.findAll({
        include: [
            {
                model: Klient,
                as: 'Klient'
            },
            {
                model: Plane,
                as: 'plane'
            }]
    });
};


exports.getTicketById = (ticketId) => {
    return Ticket.findByPk(ticketId, {
        include: [
            {
                model: Klient,
                as: 'Klient'
            },
            {
                model: Plane,
                as: 'plane'
            }]
    });
};

exports.createTicket = (data) => {
    console.log(JSON.stringify(data));

    return Ticket.create({
        Klient_id: data.Klient_id,
        plane_id: data.plane_id,
        sittingPlace: data.sittingPlace,
        baggageNumber: data.baggageNumber
    });
};

exports.updateTicket = (ticketId, data) => {
    return Ticket.update(data, { where: { _id: ticketId } });
}

exports.deleteTicket = (ticketId) => {
    return Ticket.destroy({
        where: { _id: ticketId }
    });
}

exports.deleteManyTickets = (ticketIds) => {
    return Ticket.find({ _id: { [Sequelize.Op.in]: ticketIds } })
}