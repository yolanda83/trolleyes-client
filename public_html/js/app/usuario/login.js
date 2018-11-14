'use strict'

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', 'toolService', '$location',
    function ($scope, $http, toolService, $location) {

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

        $scope.log = function () {
            $scope.error = false;
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + $scope.login + '&pass=' + $scope.pass,
//                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                console.log(response);
                $scope.status = response.data.status;
//                $scope.resultado = "Te has logueado correctamente";
                if ($scope.status == 200) {
                    $location.path('/home');
                } else {
                   $scope.error = true;
                }
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            }
        }


    }]);