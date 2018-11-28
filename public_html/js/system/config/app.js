/* global moment */

'use strict';


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
    'ngMaterial'
]).config(function ($mdDateLocaleProvider) {
    // Example of a Spanish localization.
    $mdDateLocaleProvider.months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio',
        'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'];
    $mdDateLocaleProvider.shortMonths = ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun',
        'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'];
    $mdDateLocaleProvider.days = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
    $mdDateLocaleProvider.shortDays = ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'];
    // Can change week display to start on Monday.
    $mdDateLocaleProvider.firstDayOfWeek = 1;
    // Optional.
    //$mdDateLocaleProvider.dates = [1, 2, 3, 4, 5, 6, 7,8,9,10,11,12,13,14,15,16,17,18,19,
    //                               20,21,22,23,24,25,26,27,28,29,30,31];
    // In addition to date display, date components also need localized messages
    // for aria-labels for screen-reader users.
    $mdDateLocaleProvider.weekNumberFormatter = function (weekNumber) {
        return 'Semana ' + weekNumber;
    };
    $mdDateLocaleProvider.msgCalendar = 'Calendario';
    $mdDateLocaleProvider.msgOpenCalendar = 'Abrir calendario';
    $mdDateLocaleProvider.formatDate = function (date) {
        return moment(date).format('DD-MM-YYYY');
    };
});


var moduleCommon = angular.module('commonControllers', []);
var moduleService = angular.module('services', []);
var moduleFactura = angular.module('facturaControllers', []);
var moduleLinea = angular.module('lineaControllers', []);
var moduleProducto = angular.module('productoControllers', []);
var moduleTipoproducto = angular.module('tipoproductoControllers', []);
var moduleTipousuario = angular.module('tipousuarioControllers', []);
var moduleUsuario = angular.module('usuarioControllers', []);
var moduloDirectivas = angular.module('Directives', []);

