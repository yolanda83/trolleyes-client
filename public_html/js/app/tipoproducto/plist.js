'use strict'

moduleTipoproducto.controller('tipoproductoPlistController', ['$scope', '$http', '$location', 'toolService',
    function ($scope, $http, $location, toolService) {
        $scope.ruta = $location.path();

        $scope.ajaxData = "";

        $scope.tipoproductos = function () {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=getpage&rpp=5000&page=1'
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataTipoProductos = response.data.message;
            }, function (response) {
                $scope.ajaxDataTipoProductos = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
        }

        $scope.tipoproductosLimpiar = function () {
            $scope.ajaxDataTipoProductos = "";
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=2'
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