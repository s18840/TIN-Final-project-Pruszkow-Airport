const Sequelize = require('sequelize');
const sequelize = require('../../config/sequelize/sequelize');

const Plane = sequelize.define('Plane', {
    _id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 20],
                msg: "Pole powinno zawierać od 2 do 20 znaków"
            },
        }
    },
    planeNumber: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            len: {
                args: [2, 9],
                msg: "Pole powinno zawierać od 2 do 9 znaków"
            },
        }
    },
    destination: {
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
    date: {
        type: Sequelize.DATE,
        allowNull: true,
        validate: {
            notEmpty: {
                msg: "Pole jest wymagane"
            },
            isDate: {
                msg: "Pole powinno zawierać prawidłową datę, nie z przeszłości."
            }
        }
    }
});

module.exports = Plane;