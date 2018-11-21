'use strict'

moduleLinea.controller('lineaRemoveController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {
        $scope.id = $routeParams.id;


        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }
        $scope.deleted = false;

        //Muestra los datos del id usuario indicado de la BBDD
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=linea&op=remove&id=` + $scope.id
            }).then(function (response) {
                $scope.deleted = true;
            })
        }

        $scope.isActive = toolService.isActive;

    }
]);