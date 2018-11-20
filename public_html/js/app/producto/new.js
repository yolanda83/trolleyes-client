'use strict'

moduleProducto.controller('productoNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.numRegistros = 0;

        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }

//        //Getpage trae todos los tipos de productos existentes en la BBDD
//        $http({
//            method: "GET",
//            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=100&page=1'
//        }).then(function (response) {
//            console.log(response);
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//            $scope.numRegistros = $scope.ajaxData.length;
//            $scope.arrayTipos = [];
//            var desc = "";
//            for (var i = 0; i < $scope.numRegistros; i++) {
//                desc = $scope.ajaxData[i]["desc"];
//                $scope.arrayTipos.push(desc);
//            }
//        }), function (response) {
//            console.log(response);
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        };

        $scope.isActive = toolService.isActive;


        $scope.guardar = function () {

//            var descTipoUsuario = $scope.selectedId;
//            for (var i = 0; i < $scope.numRegistros; i++) {
//                var descrip = $scope.ajaxData[i]["desc"];
//                if (descTipoUsuario == descrip) {
//                    var idTU = $scope.ajaxData[i]["id"];
//                }
//            }
            var json = {
                id: $scope.id,
                codigo: $scope.codigo,
                desc: $scope.desc,
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