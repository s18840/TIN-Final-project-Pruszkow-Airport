const Klient = require("../../model/sequelize/Klient");
const Ticket = require("../../model/sequelize/Ticket");
const Plane = require("../../model/sequelize/Plane");

exports.getPlanes = () => {
    return Plane.findAll();
};

exports.getPlaneById = (planeId) => {
    return Plane.findByPk(planeId,
        {
            include: [{
                model: Ticket,
                as: 'tickets',
                include: [{
                    model: Klient,
                    as: 'Klient'
                }]
            }]
        });
};

exports.createPlane = (newPlaneData) => {
    return Plane.create({
        name: newPlaneData.name,
        planeNumber: newPlaneData.planeNumber,
        destination: newPlaneData.destination,
        date: newPlaneData.date
    });
};

exports.updatePlane = (planeId, planeData) => {
    const name = planeData.name;
    const planeNumber = planeData.planeNumber;
    const destination = planeData.destination;
    const date = planeData.date;
    return Plane.update(planeData, { where: { _id: planeId } });
};

exports.deletePlane = (planeId) => {
    return Plane.destroy({
        where: { _id: planeId }
    });

}; 