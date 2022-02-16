const Usuario = require('../models/usuarios.models');
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');

function registrarMaestro(req, res) {
    var parametros = req.body;
    var usuarioMaestro = new Usuario();

    if(parametros.nombre && parametros.apellido && parametros.email &&
        parametros.password) {
            usuarioMaestro.nombre = parametros.nombre;
            usuarioMaestro.apellido = parametros.apellido;
            usuarioMaestro.email = parametros.email;
            usuarioMaestro.rol = 'ROL_MAESTRO';

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioMaestro.password = passwordEncriptada;

                        usuarioMaestro.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}

function registrarAlumno(req, res) {
    var parametros = req.body;
    var usuarioAlumno = new Usuario();

    if(parametros.nombre && parametros.apellido && parametros.email &&
        parametros.password) {
            usuarioAlumno.nombre = parametros.nombre;
            usuarioAlumno.apellido = parametros.apellido;
            usuarioAlumno.email = parametros.email;
            usuarioAlumno.rol = 'ROL_ALUMNO';

            Usuario.find({ email : parametros.email }, (err, usuarioEncontrado) => {
                if ( usuarioEncontrado.length == 0 ) {

                    bcrypt.hash(parametros.password, null, null, (err, passwordEncriptada) => {
                        usuarioAlumno.password = passwordEncriptada;

                        usuarioAlumno.save((err, usuarioGuardado) => {
                            if (err) return res.status(500)
                                .send({ mensaje: 'Error en la peticion' });
                            if(!usuarioGuardado) return res.status(500)
                                .send({ mensaje: 'Error al agregar el Usuario'});
                            
                            return res.status(200).send({ usuario: usuarioGuardado });
                        });
                    });                    
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este correo, ya  se encuentra utilizado' });
                }
            })
    }
}

function Login(req, res) {
    var parametros = req.body;
    Usuario.findOne({ email : parametros.email }, (err, usuarioEncontrado)=>{
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion' });
        if(usuarioEncontrado){
            
            bcrypt.compare(parametros.password, usuarioEncontrado.password, 
                (err, verificacionPassword)=>{
                    if ( verificacionPassword ) {
                        
                        if(parametros.obtenerToken === 'true'){
                            return res.status(200)
                                .send({ token: jwt.crearToken(usuarioEncontrado) })
                        } else {
                            usuarioEncontrado.password = undefined;
                            return  res.status(200)
                                .send({ usuario: usuarioEncontrado })
                        }

                        
                    } else {
                        return res.status(500)
                            .send({ mensaje: 'Las contrasena no coincide'});
                    }
                })

        } else {
            return res.status(500)
                .send({ mensaje: 'Error, el correo no se encuentra registrado.'})
        }
    })

}

function EditarUsuario(req, res) {
    var idUser = req.params.idUsuario;
    var parametros = req.body;    

    if ( idUser !== req.user.sub ) return res.status(500)
        .send({ mensaje: 'No puede editar otros usuarios'});

    Usuario.findByIdAndUpdate(req.user.sub, parametros, {new : true},
        (err, usuarioActualizado)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!usuarioActualizado) return res.status(500)
                .send({ mensaje: 'Error al editar el Usuario'});
            
            return res.status(200).send({usuario : usuarioActualizado})
        })
}

function EliminarUsuario(req, res) {
    var idUser = req.params.idUsuario;

    Usuario.findByIdAndDelete(idUser, (err, usuarioEliminado) => {
        if(err) return res.status(500).send({ mensaje: 'Error en la peticion'});
        if(!usuarioEliminado) return res.status(404).send( { mensaje: 'Error al eliminar el usuario'});

        return res.status(200).send({ usuario: usuarioEliminado});
    })
}

module.exports ={
    registrarMaestro,
    registrarAlumno,
    Login,
    EditarUsuario,
    EliminarUsuario
}