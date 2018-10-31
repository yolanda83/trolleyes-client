'use strict'

moduleProducto.controller('tipoproductoEditController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {

        $scope.id = $routeParams.id;
        $scope.mostrar = false;
        $scope.activar = true;
        $scope.ajaxData = "";
        $scope.toggle = function () {
            $scope.mostrar = !$scope.mostrar;
        }
        $scope.enable = function () {
            $scope.activar = !$scope.activar;
        }

        $scope.guardar = function () {
            $http({

//               json = {
//                    id: $scope.ajaxData.id,
//                    codigo: $scope.ajaxData.codigo,
//                    desc: $scope.ajaxData.desc,
//                    existencias: $scope.ajaxData.existencias,
//                    precio: $scope.ajaxData.precio,
//                    id_tipoProducto: $scope.ajaxData.id_tipoProducto
//                },

                method: 'GET',
                withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=update',
//                data: JSON.stringify(json),
            }).then(function (response) {
                $scope.status = response.status;
//                $scope.ajaxDataProductos = response.data.message;
                $scope.resultado = "Datos actualizados correctamente.";
            }, function (response) {
                $scope.ajaxDataProductos = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
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
    }]);