'use strict'

moduleLinea.controller('lineaPlistController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();
        
        
        $scope.productos = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpage&rpp=5000&page=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataLinea = response.data.message;
            }, function (response) {
                $scope.ajaxDataLinea = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }

        $scope.lineaLimpiar = function () {
            $scope.ajaxDataLinea = "";
        }
//
//        $scope.crearLinea = function () {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=create'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataProductos = response.data.message;
//            }, function (response) {
//                $scope.ajaxDataProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });




        $scope.isActive = toolService.isActive;

    }
]);