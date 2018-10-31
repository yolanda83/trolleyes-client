'use strict'

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService',
        function ($scope, $http, $location, toolService) {
            $scope.ruta = $location.path();
          
            $scope.mostrar = false;
            $scope.activar = true;
            $scope.ajaxData = "";
            $scope.toggle = function () {
                $scope.mostrar = !$scope.mostrar;
            }
            $scope.enable = function () {
                $scope.activar = !$scope.activar;
            }
            $scope.tipousuarios = function () {
                $http({
                    method: 'GET',
                    //withCredentials: true,
                    url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=5000&page=1'
                }).then(function (response) {
                    $scope.status = response.status;
                    $scope.ajaxDataTipoUsuarios = response.data.message;
                }, function (response) {
                    $scope.ajaxDataTipoUsuarios = response.data.message || 'Request failed';
                    $scope.status = response.status;
                });
            }
            
             $scope.tipousuariosLimpiar = function () {
            $scope.ajaxDataTipoUsuarios = "";
        }
            
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=2'
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