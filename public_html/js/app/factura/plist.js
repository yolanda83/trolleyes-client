'use strict'

moduleFactura.controller('facturaPlistController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();
        $scope.var1 = "Hola mundo";
        $scope.var2 = "Hola qué tal";
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }
        $scope.factura = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=5000&page=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataFactura = response.data.message;
            }, function (response) {
                $scope.ajaxDataFactura = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }

        $scope.facturaLimpiar = function () {
            $scope.ajaxDataFactura = "";
        }

//        $scope.crearFactura = function () {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=create'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataFactura = response.data.message;
//            }, function (response) {
//                $scope.ajaxDataFactura = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getcount'
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