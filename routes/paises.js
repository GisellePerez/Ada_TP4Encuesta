var express = require('express');
var router = express.Router();

var paises = {
"paises":[
    {"nombre":"Argentina", "codigo":"AR"},
    {"nombre":"Bolivia", "codigo":"BO"}, 
    {"nombre":"Brasil", "codigo":"BR"},
    {"nombre":"Chile", "codigo":"CL"},
    {"nombre":"Paraguay", "codigo":"PY"},
    {"nombre":"Uruguay", "codigo":"UY"},
]
}

//cuando se hace una llamada ajax a /paises, devuelve el objeto de arriba en formato JSON
router.get('/', function(req, res, next) {
  res.send(JSON.stringify(paises));
});

module.exports = router;