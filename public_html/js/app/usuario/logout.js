'use strict'

moduleUsuario.controller('usuarioLogoutController', ['$scope', '$http', 'toolService', '$location', 'sessionService',
    function ($scope, $http, toolService, $location, oSessionService) {

        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=logout'
        }).then(function (response) {

            $scope.status = response.status;
            $scope.usuario = "";
            oSessionService.setUserName($scope.usuario);
            $scope.logeado = false;
        }), function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        };

        $scope.isActive = toolService.isActive;


        $scope.volver = function () {

            $location.path('/home');

        }





    }]);