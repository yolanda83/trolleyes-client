'use strict'

moduleUsuario.controller('usuarioLogoutController', ['$scope', '$http', 'toolService', '$location',
    function ($scope, $http, toolService, $location) {


        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
        }).then(function (response) {
            console.log(response);
            $scope.status = response.status;
        }), function (response) {
            console.log(response);
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        };

        $scope.isActive = toolService.isActive;


        $scope.volver = function () {

            $location.path('/home');

        }

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