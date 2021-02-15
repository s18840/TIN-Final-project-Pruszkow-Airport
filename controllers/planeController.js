const PlaneRepository = require('../repository/sequelize/PlaneRepository');

exports.showPlaneList = (req, res, next) => {
    PlaneRepository.getPlanes()
        .then(planes => {
            res.render('pages/plane/plane-list', {
                planes: planes,
                navLocation: 'plane'
            });
        });
}

exports.showAddPlaneForm = (req, res, next) => {
    res.render('pages/plane/plane-form', {
        plane: {},
        pageTitle: 'Nowy samolot',
        formMode: 'createNew',
        btnLabel: 'Dodaj samolot',
        formAction: '/plane/add',
        navLocation: 'plane',
        validationErrors: []
    });
}

exports.showEditPlaneForm = (req, res, next) => {
    const planeId = req.params.planeId;
    PlaneRepository.getPlaneById(planeId)
        .then(plane => {
            res.render('pages/plane/plane-form', {
                plane: plane,
                formMode: 'edit',
                pageTitle: 'Edycja samolot',
                btnLabel: 'Edytuj samolot',
                formAction: '/plane/edit',
                navLocation: 'plane',
                validationErrors: []
            });
        });
};

exports.showPlaneDetails = (req, res, next) => {
    const planeId = req.params.planeId;
    PlaneRepository.getPlaneById(planeId)
        .then(plane => {
            res.render('pages/plane/plane-form', {
                plane: plane,
                formMode: 'showDetails',
                pageTitle: 'Szczegóły samolotu',
                formAction: '',
                navLocation: 'plane',
                validationErrors: []
            });
        });
};

exports.addPlane = (req, res, next) => {
    const planeData = { ...req.body };
    PlaneRepository.createPlane(planeData)
        .then(result => {
            res.redirect('/plane');
        }).catch(err => {
            res.render('pages/plane/plane-form', {
                plane: planeData,
                pageTitle: 'Dodawanie samolotu',
                formMode: 'createNew',
                btnLabel: 'Dodaj samolot',
                formAction: '/plane/add',
                navLocation: 'plane',
                validationErrors: err.errors
            })
        });
};

exports.updatePlane = (req, res, next) => {
    // const planeId = req.body._id;
    // const planeData = { ...req.body };
    // PlaneRepository.updatePlane(planeId, planeData)
    //     .then(result => {
    //         res.redirect('/plane');
    //     }).catch(err => {
    //         res.render('pages/plane/plane-form', {
    //             plane: planeData,
    //             pageTitle: 'Edycja samolotu',
    //             formMode: 'edit',
    //             btnLabel: 'Edytuj samolotu',
    //             formAction: '/plane/edit',
    //             navLocation: 'plane',
    //             validationErrors: err.errors
    //         })
    //     });
    const planeId = req.body._id;
    const planeData = { ...req.body };
    let error;
    PlaneRepository.updatePlane(planeId, planeData)
        .then(result => {
            res.redirect('/plane');
        }).catch(err => {
            error = err;
            return PlaneRepository.getPlaneById(planeId)
        }).then(plane => {
            res.render('pages/plane/plane-form', {
                plane: plane,
                pageTitle: 'Edycja samolotu',
                formMode: 'edit',
                btnLabel: 'Edytuj samolotu',
                formAction: '/plane/edit',
                navLocation: 'plane',
                validationErrors: error.errors
            });
        });

};

exports.deletePlane = (req, res, next) => {
    const planeId = req.params.planeId;
    PlaneRepository.deletePlane(planeId)
        .then(() => {
            res.redirect('/plane');
        }).catch(err => {
            res.render('pages/plane/plane-form', {
                plane: planeData,
                pageTitle: 'Usuwanie samolotu',
                formMode: 'delete',
                btnLabel: 'usuń samolot',
                formAction: '/plane/delete',
                navLocation: 'plane',
                validationErrors: []
            })
        });
};


