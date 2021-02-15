const KlientRepository = require('../repository/sequelize/KlientRepository');

exports.showKlientList = (req, res, next) => {
    KlientRepository.getKlients()
        .then(Klients => {
            res.render('pages/Klient/Klient-list', {
                Klients: Klients,
                navLocation: 'Klient'
            });
        });
}

exports.showAddKlientForm = (req, res, next) => {
    res.render('pages/Klient/Klient-form', {
        Klient: {},
        pageTitle: 'Nowy pracownik',
        formMode: 'createNew',
        btnLabel: 'Dodaj pracownika',
        formAction: '/Klient/add',
        navLocation: 'Klient',
        validationErrors: []
    });
}

exports.showEditKlientForm = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.getKlientById(KlientId)
        .then(Klient => {
            res.render('pages/Klient/Klient-form', {
                Klient: Klient,
                formMode: 'edit',
                pageTitle: 'Edycja pracownika',
                btnLabel: 'Edytuj pracownika',
                formAction: '/Klient/edit',
                navLocation: 'Klient',
                validationErrors: []
            });
        });
};

exports.showKlientDetails = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.getKlientById(KlientId)
        .then(Klient => {
            res.render('pages/Klient/Klient-form', {
                Klient: Klient,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły pracownika',
                formAction: '',
                navLocation: 'Klient',
                validationErrors: []
            });
        });
};

exports.addKlient = (req, res, next) => {
    const KlientData = { ...req.body };
    KlientRepository.createKlient(KlientData)
        .then(result => {
            res.redirect('/Klient');

        }).catch(err => {
            res.render('pages/Klient/Klient-form', {
                Klient: KlientData,
                pageTitle: 'Dodawanie klienta',
                formMode: 'createNew',
                btnLabel: 'Dodaj klienta',
                formAction: '/Klient/add',
                navLocation: 'Klient',
                validationErrors: err.errors
            })
        });
};

exports.updateKlient = (req, res, next) => {
    const KlientId = req.body._id;
    const KlientData = { ...req.body };
    let error;
    KlientRepository.updateKlient(KlientId, KlientData)
        .then(result => {
            res.redirect('/Klient');
        }).catch(err => {
            error = err;
            return KlientRepository.getKlientById(KlientId)
        }).then(Klient => {
            res.render('pages/Klient/Klient-form', {
                Klient: Klient,
                pageTitle: 'Edycja klienta',
                formMode: 'edit',
                btnLabel: 'Edytuj klienta',
                formAction: '/Klient/edit',
                navLocation: 'Klient',
                validationErrors: error.errors
            });
        });
};

exports.deleteKlient = (req, res, next) => {
    const KlientId = req.params.KlientId;
    KlientRepository.deleteKlient(KlientId)
        .then(() => {
            res.redirect('/Klient');
        }).catch(err => {
            res.render('pages/Klient/Klient-form', {
                Klient: KlientData,
                pageTitle: 'Usuwanie klienta',
                formMode: 'delete',
                btnLabel: 'usuń klienta',
                formAction: '/Klient/delete',
                navLocation: 'Klient',
                validationErrors: []
            })
        });
};

