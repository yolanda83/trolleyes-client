'use strict'

var trolleyes = angular.module('MyApp', [
    'ngRoute',
    'services',
    'commonControllers',
    'facturaControllers',
    'lineaControllers',
    'productoControllers',
    'tipoproductoControllers',
    'tipousuarioControllers',
    'usuarioControllers',
    'Directives',
]);


var moduleCommon = angular.module('commonControllers', []);
var moduleService = angular.module('services', []);
var moduleFactura = angular.module('facturaControllers', []);
var moduleLinea = angular.module('lineaControllers', []);
var moduleProducto = angular.module('productoControllers', []);
var moduleTipoproducto = angular.module('tipoproductoControllers', []);
var moduleTipousuario = angular.module('tipousuarioControllers', []);
var moduleUsuario = angular.module('usuarioControllers', []);
var moduloDirectivas = angular.module('Directives', []);

