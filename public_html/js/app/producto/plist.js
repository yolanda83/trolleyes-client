'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {

        $scope.ruta = "public_html";
        $scope.ob = "producto";
        $scope.op = "plist";
        $scope.selectedItem = null;
        $scope.order = "";
        $scope.ordervalue = "";

        if (!$routeParams.rpp) {
            $scope.rpp = 50;
        } else {

            $scope.rpp = $routeParams.rpp;
        }
        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp='
                    + $scope.rpp + '&page=' + $scope.page + '&order=' + $scope.order + '&ordervalue=' + $scope.ordervalue
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductos = response.data.message;
        }, function (response) {
            $scope.ajaxDataProductos = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.productosLimpiar = function () {
            $scope.ajaxDataProductos = "";
        }

        $scope.crearProductos = function () {
            $http({
                method: 'GET',
//                withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataProductos = response.data.message;
            }, function (response) {
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }

        $scope.update = function () {

            $scope.order = $scope.selectedItem;
            $scope.ordervalue = "asc";
            
            $http({
                method: 'GET',
//                withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp='
                        + $scope.rpp + '&page=' + $scope.page + '&order=' + $scope.order + '&ordervalue=' + $scope.ordervalue
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataProductos = response.data.message;
            }, function (response) {
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
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