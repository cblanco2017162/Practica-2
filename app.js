const express = require('express'); 
const cors = require('cors'); 
//const pdfPrinter = require('pdfmake');
//const fs = require('fs');
var app = express();

const UsuarioRutas = require('./src/routes/usuarios.routes');
const Materias = require('./src/routes/materia.routes');

app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(cors());

app.use('/api', UsuarioRutas, Materias);

module.exports = app;