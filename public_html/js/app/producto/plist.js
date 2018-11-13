'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();

        //con variable $scope para hacerlo con un botón con ng-model
        //$scope.productos = function () {
        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=5000&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message;
        }, function (response) {
            $scope.ajaxDataProductos = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
//        }

        $scope.isActive = toolService.isActive;

        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataProductosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataProductosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

//        $scope.productosLimpiar = function () {
//            $scope.ajaxDataProductos = "";
//        }

//        $scope.crearProductos = function () {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataProductos = response.data.message;
//            }, function (response) {
//                $scope.ajaxDataProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }




    }
]);
