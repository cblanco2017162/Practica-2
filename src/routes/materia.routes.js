const express = require('express');
const materiaControlador = require('../controllers/materia.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();
api.post('/agregarMateria', md_autenticacion.Auth, materiaControlador.agregarMateria);
api.put('/asignarAlumno/:idMateria', md_autenticacion.Auth, materiaControlador.inscripcion);
api.get('/obtenerMateria', md_autenticacion.Auth, materiaControlador.obtenerMateria);
api.put('/actualizarMateria/:idMateria', md_autenticacion.Auth, materiaControlador.editarMateria )

module.exports = api;