'use strict'

moduleProducto.controller('productoNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.numRegistros = 0;

        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }

        $scope.isActive = toolService.isActive;


        $scope.guardar = function () {

            var json = {
                id: $scope.id,
                codigo: $scope.codigo,
                desc: $scope.descripcion,
                existencias: $scope.existencias,
                precio: $scope.precio,
                id_tipoProducto: $scope.obj_tipoProducto.id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
                $scope.resultado = "Producto creado correctamente.";
                $scope.new = true;
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
                $scope.resultado = "No se ha podido crear el producto.";
            }
        }

    }]);