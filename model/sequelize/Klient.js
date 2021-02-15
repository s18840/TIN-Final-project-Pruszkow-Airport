const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Klient = sequelize.define('Klient', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    firstName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    lastName: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 60],
                msg: "Pole powinno zawierać od 2 do 60 znaków"
            },
        }
    },
    numerTelefonu: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [9, 14],
                msg: "Pole powinno zawierać od 9 do 14 znaków"
            },
            isNumeric: {
                msg: 'Pole powinno zawierać prawidłowy numer telefonu np: ((48)(0048))506123567'
            }
        }
    }
});

module.exports = Klient;