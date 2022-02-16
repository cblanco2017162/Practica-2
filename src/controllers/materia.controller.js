const Materia = require('../models/materia.model');

function agregarMateria(req, res){
    var parametros = req.body;
    var materiaModel = new Materia();

    if(parametros.nombre && parametros.alumno){
        materiaModel.nombre = parametros.nombre;
        materiaModel.alumno = parametros.alumno;
        materiaModel.idAsignacion = req.user.sub;

        materiaModel.save((err, materiaGuardada)=>{
            if(err) return res.status(500).send({ mensaje: "Error en la peticion" });
            if(!materiaGuardada) return res.status(500).send({ mensaje: "Error al guardar la materia"});
            
            return res.status(200).send({ materia: materiaGuardada });
        });
    }else{
        return res.status(500).send({ mensaje: "Debe rellenar los campos necesarios." });
    }
}

function inscripcion(req, res) {
    var idCur = req.params.idMateria;
    var parametros = req.body;

    Materia.findByIdAndUpdate(idCur, {$push:{asignacion:{textoAlumno: parametros.textoAlumno,
        idUsuarioAsignacion: req.user.sub}}},{new:true},(err,alumnoAgregado)=>{

            if(err) return res.status(500).send({mensaje:"Error en la peticion"});
            if(!alumnoAgregado) return res.status(500).send({mensaje:"Error al asignar curso"});
            return res.status(200).send({materias:alumnoAgregado})

        })

}

function obtenerMateria(req, res) {
    Materia.find({},(err, materiasEncontradas)=>{
        if(err) return res.status(500).send({mensaje:"Error en la peticion"});
            if(!materiasEncontradas) return res.status(500).send({mensaje:"Error al buscar materias"});
            return res.status(200).send({materias: materiasEncontradas})
    }).populate('idAsignacion', 'email');
}

function editarMateria(req, res){
    var idMat = req.params.idMateria;
    var parametros = req.body;
    //if ( idMat !== req.user.sub ) return res.status(500).send({ mensaje: 'No puede editar otras materias'});

    Materia.findByIdAndUpdate(idMat, parametros, {new : true},
        (err, materiaActualizada)=>{
            if(err) return res.status(500)
                .send({ mensaje: 'Error en la peticion' });
            if(!materiaActualizada) return res.status(500)
                .send({ mensaje: 'Error al editar la materia'});
            
            return res.status(200).send({materia: materiaActualizada});
        })
}


module.exports ={
    agregarMateria,
    inscripcion,
    obtenerMateria,
    editarMateria
}