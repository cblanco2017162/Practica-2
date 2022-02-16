const express = require('express');
const usuariosControlador = require('../controllers/usuarios.controller');
const md_autenticacion = require('../middlewares/autenticacion');

const api = express.Router();

api.post('/registrarMaestro', usuariosControlador.registrarMaestro);
api.post('/registrarAlumno', usuariosControlador.registrarAlumno);
api.put('/login',usuariosControlador.Login);
api.put('/editarUsuario/:idUsuario', md_autenticacion.Auth, usuariosControlador.EditarUsuario);
api.delete('/eliminarUsuario/:idUsuario', md_autenticacion.Auth, usuariosControlador.EliminarUsuario);

module.exports = api;