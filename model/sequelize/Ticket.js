const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Ticket = sequelize.define('Ticket', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    sittingPlace: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    baggageNumber: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isNumeric: {
                msg: 'Pole powinno zawierać prawidłowy numer bagażu np: 1234'
            }
        }
    },
    Klient_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    },
    plane_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            }
        }
    }
});

module.exports = Ticket;