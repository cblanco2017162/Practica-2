const jwt_simple = require('jwt-simple');
const moment = require('moment');
const secret = 'clave_secreta_practica'

exports.crearToken = function(usuario) {
    let playload = {
        sub: usuario._id,
        nombre: usuario.nombre,
        email: usuario.email,
        rol: usuario.rol,
        iat: moment().unix(),
        exp: moment().day(10, 'days').unix()
    }

    return jwt_simple.encode(playload, secret);
}