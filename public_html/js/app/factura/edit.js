'use strict'

moduleFactura.controller('facturaEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.id = $routeParams.id;


        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }



        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.fecha = response.data.message.fecha;
            $scope.iva = response.data.message.iva;
            $scope.user = response.data.message.obj_usuario.login;
            $scope.obj_usuario = response.data.message.obj_usuario;
            $scope.lineas = response.data.message.numLineas;
        }), function (response) {
            console.log(response);
        };


        $scope.guardar = function () {

//            var json = {
//                id: $scope.id,
//                fecha: $scope.fecha,
//                iva: $scope.iva,
//                obj_usuario: $scope.obj_usuario
//            }
            var json = {
                id: $scope.id,
                fecha: null,
                iva: $scope.iva,
                obj_usuario: {
                    id: $scope.obj_usuario.id
                },
                numLineas: $scope.lineas
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                if (response.status == 200) {
                    $scope.edit = true;
                } else {
                    $scope.edit = false;
                }
            }), function (response) {
                console.log(response);
            }
        }



        $scope.isActive = toolService.isActive;
    }]);