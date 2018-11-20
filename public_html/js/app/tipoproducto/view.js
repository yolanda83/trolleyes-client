'use strict'

moduleTipoproducto.controller('tipoproductoViewController', ['$scope', '$http', 'toolService', 
    '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {
        
        $scope.id = $routeParams.id;


        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }


        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        $scope.isActive = toolService.isActive;
        
//        $scope.id = $routeParams.id;
////        $scope.mostrar = false;
////        $scope.activar = true;
////        $scope.ajaxData = "";
////        $scope.toggle = function () {
////            $scope.mostrar = !$scope.mostrar;
////        }
////        $scope.enable = function () {
////            $scope.activar = !$scope.activar;
////        }
//
//        //Chequeo sesion
//        if (oSessionService.getUserName() !== "") {
//            $scope.usuario = oSessionService.getUserName();
//            $scope.logeado = true;
//        }
//        
//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.id
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//        }, function (response) {
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });
//        $scope.isActive = toolService.isActive;

    }
]);