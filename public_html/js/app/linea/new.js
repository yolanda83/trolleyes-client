'use strict'

moduleLinea.controller('lineaNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.numRegistros = 0;
//        $scope.obj_factura.id = $routeParams.id;

//        //Chequeo sesión
//        if (oSessionService.getUserName() !== "") {
//            $scope.usuario = oSessionService.getUserName();
//            $scope.logeado = true;
//            $scope.userId = oSessionService.getId();
//        }

        $scope.isActive = toolService.isActive;


        $scope.guardar = function () {

            var json = {
                cantidad: $scope.cantidad,
                id_producto: $scope.obj_producto.id,
//                id_factura: $scope.obj_factura.id
                id_factura: $routeParams.id
            }
            
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.resultado = "Línea creada correctamente.";
                $scope.new = true;
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
                $scope.resultado = "No se ha podido crear la línea.";
            }
        }


    }]);