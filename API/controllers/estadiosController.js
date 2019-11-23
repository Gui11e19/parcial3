var Estadio = require('../models/estadios');
var debug = require('debug')('api:post_controller');

module.exports.getOne = (req, res, next) => {
    debug("Search Estadio", req.params.id);

    Estadio.findById(req.params.id)
        .then((estadio) => {
            debug("Found Estadio", estadio);
            if (estadio)
                return res.status(200).json(estadio);
            else
                return res.status(400).json(null)
        })
        .catch(err => {
            next(err);
        });
}

module.exports.create = (req, res, next) => {
    debug("Create Estadio");
    Estadio.findOne({
            nombre: estadio._id,
            equipo: req.body.equipo
        }, "-nombre -equipo")
        .then(foundEstadio => {
            if (foundEstadio) {
                throw new Error(`El estadio duplicado ${req.body.nombre}`);
            } else {
                let estadio = new Estadio({
                    nombre: req.body.nombre,
                    ubicacion: req.body.ubicacion,
                    cant_asientos: req.body.cant_asientos,
                    fecha_const: req.body.fecha_const,
                    equipo: req.body.equipo
                });

                return estadio.save()
            }
        })
        .then(estadio => {
            debug(estadio);
            return res
                .header('Location', '/estadios/' + estadio._id)
                .status(201)
                .json({
                    nombre: estadio.nombre,
                    ubicacion: estadio.ubicacion,
                    cant_asientos: estadio.cant_asientos,
                    fecha_const: estadio.fecha_const,
                    equipo: estadio.equipo
                });
        })
        .catch(err => {
            next(err)
        });
}

module.exports.getAll = (req, res, next) => {
    var perPage = Number(req.query.size) || 10,
        page = req.query.page > 0 ? req.query.page : 0;

    var sortProperty = req.query.sortby || "createdAt",
        sort = req.query.sort || "desc";

    debug("Estadios List",{size:perPage,page, sortby:sortProperty,sort});

    Estadio.find({}, "-nombre -equipo")
        .limit(perPage)
        .skip(perPage * page)
        .sort({ [sortProperty]: sort})
        .then((estadios) => {
           return res.status(200).json(users)
        }).catch(err => {
            next(err);
        })

}


module.exports.update = (req, res, next) => {
    debug("Update Estadio", {
        nombre: req.params.nombre,
        ...req.body
    });

    let update = {
        ...req.body
    };


    Estadio.findByIdAndUpdate({
        nombre: req.params.nombre,
    }, update, {
        new: true
    })
        .then((updated) => {
            if (updated)
                return res.status(200).json(updated);
            else
                return res.status(400).json(null);
        }).catch(err => {
            next(err);
        });

}

module.exports.delete = (req, res, next) => {

    debug("Delete Estadio", {
    nombre: req.params.nombre,
    });

    Post.findByIdAndDelete({nombre: req.params.nombre})
        .then((data) => {
            if (data) res.status(200).json(data);
            else res.status(404).send();
        }).catch(err => {
            next(err);
        })
}