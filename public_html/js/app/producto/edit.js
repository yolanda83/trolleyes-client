'use strict'

moduleProducto.controller('productoEditController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.id = $routeParams.id;


        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }

//          $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.id
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//        }, function (response) {
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });

        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=get&id=' + $scope.id
//            url: `http://localhost:8081/trolleyes/json?ob=producto&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.codigo = response.data.message.codigo;
            $scope.desc = response.data.message.desc;
            $scope.existencias = response.data.message.existencias;
            $scope.precio = response.data.message.precio;
            $scope.obj_tipoProducto_desc = response.data.message.obj_tipoProducto.desc;
//            $scope.obj_tipoUsuario_id = response.data.message.obj_tipoUsuario.id;
            $scope.obj_tipoProducto = {
                id: response.data.message.obj_tipoProducto.id,
                desc: response.data.message.obj_tipoProducto.desc
            }
        }), function (response) {
            console.log(response);
        };




        $scope.guardar = function () {
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
                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.status;
                if ($scope.status == 200) {
                    $scope.resultado = "El Producto ha sido actualizado correctamente."
                    $scope.edit = true;
                } else {
                    $scope.resultado = "El Producto no se ha podido actualizar."
                    $scope.edit = false;
                }
            }), function (response) {
                console.log(response);
            }

//            $http({
//
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=producto&op=update',
////                data: JSON.stringify(json),
//            }).then(function (response) {
//                $scope.status = response.status;
////                $scope.ajaxDataProductos = response.data.message;
//                $scope.resultado = "Datos actualizados correctamente.";
//            }, function (response) {
//                $scope.ajaxDataProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
        }



        $scope.isActive = toolService.isActive;


    }]);