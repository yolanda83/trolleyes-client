'use strict'

moduleProducto.controller('productoRemoveController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService', '$anchorScroll',
    function ($scope, $http, toolService, $routeParams, oSessionService, $anchorScroll) {
        
        $anchorScroll();
        $scope.id = $routeParams.id;

        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
            $scope.userId = oSessionService.getId();
        }
        
        $scope.deleted = false;

        //Muestra los datos del id usuario indicado de la BBDD
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.id
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
                url: `http://localhost:8081/trolleyes/json?ob=producto&op=remove&id=` + $scope.id
            }).then(function (response) {
                $scope.deleted = true;
            })
        }

        $scope.isActive = toolService.isActive;

    }
]);