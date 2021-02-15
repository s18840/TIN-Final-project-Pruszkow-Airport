const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.getKlient = (req, res, next) => {
    KlientRepository.getKlients()
        .then(Klients => {
            res.status(200).json(Klients);
        })
        .catch(err => {
            console.log(err);
        });
};

exports.getKlientById = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.getKlientById(KlientId)
        .then(emp => {
            if (!emp) {
                res.status(404).json({
                    message: 'Klient with id: ' + KlientId + ' not found'
                })
            } else {
                res.status(200).json(emp);
            }
        });
};

exports.createKlient = (req, res, next) => {
    KlientRepository.createKlient(req.body)
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

exports.updateKlient = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.updateKlient(KlientId, req.body)
        .then(result => {
            res.status(200).json({ message: 'Klient updated!', Klient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });

};

exports.deleteKlient = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.deleteKlient(KlientId)
        .then(result => {
            res.status(200).json({ message: 'Deleted Klient', Klient: result });
        })
        .catch(err => {
            if (!err.statusCode) {
                err.statusCode = 500;
            }
            next(err);
        });
};