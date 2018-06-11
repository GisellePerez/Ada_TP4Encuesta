var express = require('express');
var router = express.Router();

var preguntas = {
"preguntas":[
    {"pregunta":"1- ¿Lenguaje de programación preferido?", "opciones":["JavaScript", "Java", "C++"], "name":"lenguajes"},
    {"pregunta":"2- ¿Nivel de conocimiento del lenguaje elegido?", "opciones":["Básico", "Intermedio", "Experto"], "name":"nivel"}, 
    {"pregunta":"3- ¿Sistema operativo preferido?", "opciones":["Windows", "Linux", "Solaris"], "name": "sistema"},
    {"pregunta":"4- ¿Editor de texto preferido?", "opciones":["Sublime Text", "Visual Studio Code", "Atom"], "name":"editor"}
]
}

router.get('/', function(req, res, next) {
  res.send(JSON.stringify(preguntas));
});

module.exports = router;