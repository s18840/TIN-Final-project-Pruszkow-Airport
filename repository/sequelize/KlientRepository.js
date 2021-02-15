const Klient = require("../../model/sequelize/Klient");
const Ticket = require("../../model/sequelize/Ticket");
const Plane = require("../../model/sequelize/Plane");

exports.getKlients = () => {
    return Klient.findAll();
};

exports.getKlientById = (KlientId) => {
    return Klient.findByPk(KlientId,
        {
            include: [{
                model: Ticket,
                as: 'tickets',
                include: [{
                    model: Plane,
                    as: 'plane'
                }]
            }]
        });
};

exports.createKlient = (newKlientData) => {
    return Klient.create({
        firstName: newKlientData.firstName,
        lastName: newKlientData.lastName,
        numerTelefonu: newKlientData.numerTelefonu
    });
};

exports.updateKlient = (KlientId, KlientData) => {
    const firstName = KlientData.firstName;
    const lastName = KlientData.lastName;
    const numerTelefonu = KlientData.numerTelefonu;
    return Klient.update(KlientData, { where: { _id: KlientId } });
};

exports.deleteKlient = (KlientId) => {
    return Klient.destroy({
        where: { _id: KlientId }
    });

}; 