'use strict'

moduleLinea.controller('lineaPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        
        $scope.ruta = $location.path();
        $scope.id = $routeParams.id;
        $scope.user = $routeParams.user;

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpage&rpp=5000&page=1&id=' + $scope.id 
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataLinea = response.data.message;
        }, function (response) {
            $scope.ajaxDataLinea = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

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
            $scope.ajaxDataFacturaNumber = response.data.message;
        }, function (response) {
            $scope.ajaxDataFacturaNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });




        $scope.isActive = toolService.isActive;

    }
]);