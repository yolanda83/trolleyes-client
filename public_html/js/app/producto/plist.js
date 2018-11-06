'use strict'

moduleProducto.controller('productoPlistController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {

        $scope.ruta = "public_html";
        $scope.ob = "producto";
        $scope.op = "plist";
        $scope.opciones = null;
        $scope.order = "";
        $scope.ordervalue = "";
        $scope.vecindario = 1;

        if (!$routeParams.rpp) {
            $scope.rpp = 10;
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

            $scope.order = $scope.opciones;
            $scope.ordervalue = "asc";

            $http({
                method: 'GET',
//                withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=' + $scope.ob + '&op=getpage&rpp='
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
            $scope.totalPages = Math.ceil($scope.ajaxData / $scope.rpp);
            pagination2();
            $scope.list = [];
            for (var i = 1; i <= $scope.totalPages; i++) {
                $scope.list.push(i);
            }


        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });
        
         //paginacion neighborhood
        function pagination2() {
            $scope.list2 = [];
            $scope.pActual = Math.ceil($scope.page);
            $scope.pActual_next = $scope.pActual + 1;
            $scope.pActual_prev = $scope.pActual -1;

            $scope.aux1 = $scope.pActual_next +1;
            $scope.aux2 = $scope.pActual_prev -1;

            for (var i = 1; i <= $scope.totalPages; i++){
                if (i === $scope.pActual_next){
                    $scope.list2.push(i);
                } else if (i === $scope.pActual_prev) {
                    $scope.list2.push(i);
                } else if (i === $scope.pActual){
                    $scope.list2.push(i);
                } else if (i === $scope.aux1){
                    $scope.list2.push("...");
                } else if (i === $scope.aux2){
                    $scope.list2.push("...");
                }
            }
        }
        
        
        $scope.isActive = toolService.isActive;

    }
]);