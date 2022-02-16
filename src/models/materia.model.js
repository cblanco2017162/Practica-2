const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const MateriaSchema = Schema({
    nombre: String,
    alumno: String,
    asignacion:[{
        textoAlumno: String,
        idUsuarioAsignacion: {type: Schema.Types.ObjectId, ref:'Usuarios'}
    }],
    idAsignacion:{type: Schema.Types.ObjectId, ref: 'Usuarios'}
})

module.exports = mongoose.model('Materias', MateriaSchema);