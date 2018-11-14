'use strict'

moduleCommon.controller('homeController', ['$scope', '$location', 'toolService', '$http',
    function ($scope, $location, toolService, $http) {

        $scope.ruta = $location.path();

        $scope.isActive = toolService.isActive;
        
        //Chequeo Sesión
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
        }).then(function (response) {
            $scope.estado = response.data.status;
            $scope.nombre = response.data.message["login"];

        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.estado = response.status;
        });

    }]);