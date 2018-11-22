'use strict'

moduleLinea.controller('lineaEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.id = $routeParams.id;


        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }


        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=get&id=' + $scope.id
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.cantidad = response.data.message.cantidad;           
            $scope.id_producto = response.data.message.id_producto;
            $scope.id_factura = response.data.message.id_factura;
//            $scope.obj_tipoProducto_desc = response.data.message.obj_tipoProducto.desc;
////            $scope.obj_tipoUsuario_id = response.data.message.obj_tipoUsuario.id;
//            $scope.obj_tipoProducto = {
//                id: response.data.message.obj_tipoProducto.id,
//                desc: response.data.message.obj_tipoProducto.desc
//            }
        }), function (response) {
            console.log(response);
        };

        $scope.guardar = function () {
            var json = {
                id: $scope.id,
                cantidad: $scope.cantidad,
                id_producto: $scope.id_producto,
                id_factura: $scope.id_factura,
//                id_tipoProducto: $scope.obj_tipoProducto.id
            }

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                if ($scope.status == 200) {
                    $scope.resultado = "La línea ha sido actualizada correctamente."
                    $scope.edit = true;
                } else {
                    $scope.resultado = "La línea no se ha podido actualizar."
                    $scope.edit = false;
                }
            }), function (response) {
                console.log(response);
            }
        }


        $scope.isActive = toolService.isActive;
    }]);