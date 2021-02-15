const sequelize = require('./sequelize');

const Klient = require('../../model/sequelize/Klient');
const Plane = require('../../model/sequelize/Plane');
const Ticket = require('../../model/sequelize/Ticket');

module.exports = () => {
    Klient.hasMany(Ticket, { as: 'tickets', foreignKey: { name: 'Klient_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Ticket.belongsTo(Klient, { as: 'Klient', foreignKey: { name: 'Klient_id', allowNull: false } });
    Plane.hasMany(Ticket, { as: 'tickets', foreignKey: { name: 'plane_id', allowNull: false }, constraints: true, onDelete: 'CASCADE' });
    Ticket.belongsTo(Plane, { as: 'plane', foreignKey: { name: 'plane_id', allowNull: false } });

    let allKlients, allPlanes;
    return sequelize
        .sync({ force: true })
        .then(() => {
            return Klient.findAll();
        })
        .then(Klients => {
            if (!Klients || Klients.length == 0) {
                return Klient.bulkCreate([
                    { firstName: 'Jan', lastName: 'Kowalski', numerTelefonu: 501123428 },
                    { firstName: 'Anna', lastName: 'Owca', numerTelefonu: 123451152 },
                    { firstName: 'Zbigniew', lastName: 'Kalata', numerTelefonu: 585123512 }
                ])
                    .then(() => {
                        return Klient.findAll();
                    });
            } else {
                return Klients;
            }
        })
        .then(Klients => {
            allKlients = Klients;
            return Plane.findAll();
        })
        .then(planes => {
            if (!planes || planes.length == 0) {
                return Plane.bulkCreate([
                    { name: 'Biały Orzeł', planeNumber: '23971', destination: 'Ohio', date: '2019-11-21' },
                    { name: 'Czarny Pelikan', planeNumber: '13412', destination: 'Poznań', date: '2020-04-09' },
                    { name: 'Błękitny Bocian', planeNumber: '12341', destination: 'Gdańsk', date: '2019-04-05' }
                ])
                    .then(() => {
                        return Plane.findAll();
                    });
            } else {
                return planes;
            }
        })
        .then(planes => {
            allPlanes = planes;
            return Ticket.findAll();
        })
        .then(tickets => {
            if (!tickets || tickets.length == 0) {
                return Ticket.bulkCreate([
                    { Klient_id: allKlients[0]._id, plane_id: allPlanes[0]._id, sittingPlace: 'A01', baggageNumber: '02123' },
                    { Klient_id: allKlients[1]._id, plane_id: allPlanes[1]._id, sittingPlace: 'B12', baggageNumber: '61263' },
                    { Klient_id: allKlients[2]._id, plane_id: allPlanes[2]._id, sittingPlace: 'G47', baggageNumber: '14125' }

                ]);
            } else {
                return tickets;
            }
        });
};