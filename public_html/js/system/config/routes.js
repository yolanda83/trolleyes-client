trolleyes.config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/', {templateUrl:'js/app/common/home.html', controller: 'homeController'});
        $routeProvider.when('/tipousuario/plist', {templateUrl:'js/app/tipousuario/plist.html', controller: 'tipousuarioPlistController'});
        $routeProvider.when('/tipousuario/edit/:id?', {templateUrl:'js/app/tipousuario/edit.html', controller: 'tipousuarioEditController'});
        $routeProvider.when('/usuario/plist', {templateUrl:'js/app/usuario/plist.html', controller: 'usuarioPlistController'});
        $routeProvider.when('/factura/plist', {templateUrl:'js/app/factura/plist.html', controller: 'facturaPlistController'});
        $routeProvider.when('/tipoproducto/plist', {templateUrl:'js/app/tipoproducto/plist.html', controller: 'tipoproductoPlistController'});
        $routeProvider.when('/producto/plist', {templateUrl:'js/app/producto/plist.html', controller: 'productoPlistController'});
        $routeProvider.otherwise({redirectTo: '/'});
    }]);