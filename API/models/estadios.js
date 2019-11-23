const mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var EstadioSchema = new Schema({
    nombre:{
        type: Schema.Types.ObjectId,
        required: true,
        unique: true,
        ref: "nombre"
    },
    ubicacion: {
        type: String,
        required: true
    },
    cant_asientos: String,
    fecha_const: String,
    equipo: {
        type: String,
        required: true,
        ref: "nombre"
    },
}, {
    timestamps: true
});

module.exports = mongoose.model("Estadio", EstadioSchema);