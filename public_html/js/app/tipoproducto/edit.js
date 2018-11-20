'use strict'

moduleTipoproducto.controller('tipoproductoEditController', ['$scope', '$http', 'toolService', '$routeParams', 
    'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {

        $scope.id = $routeParams.id;
        $scope.ruta = $location.path();


        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }


        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.id
//            url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.desc = response.data.message.desc;
        }), function (response) {
            console.log(response);
        };



        $scope.guardar = function () {
            var json = {
                id: $scope.id,
                desc: $scope.desc
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
                $scope.edit = true;
            }), function (response) {
                console.log(response);
            }
        }


        $scope.isActive = toolService.isActive;

//        $scope.id = $routeParams.id;
////        $scope.mostrar = false;
////        $scope.activar = true;
////        $scope.ajaxData = "";
////        $scope.toggle = function () {
////            $scope.mostrar = !$scope.mostrar;
////        }
////        $scope.enable = function () {
////            $scope.activar = !$scope.activar;
////        }
//
//        //Chequeo sesion
//        if (oSessionService.getUserName() !== "") {
//            $scope.usuario = oSessionService.getUserName();
//            $scope.logeado = true;
//        }
//
//        $scope.guardar = function () {
//            $http({
//
////               json = {
////                    id: $scope.ajaxData.id,
////                    codigo: $scope.ajaxData.codigo,
////                    desc: $scope.ajaxData.desc,
////                    existencias: $scope.ajaxData.existencias,
////                    precio: $scope.ajaxData.precio,
////                    id_tipoProducto: $scope.ajaxData.id_tipoProducto
////                },
//
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=update',
////                data: JSON.stringify(json),
//            }).then(function (response) {
//                $scope.status = response.status;
////                $scope.ajaxDataProductos = response.data.message;
//                $scope.resultado = "Datos actualizados correctamente.";
//            }, function (response) {
//                $scope.ajaxDataTipoProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }
//
//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=tipoproducto&op=get&id=' + $scope.id
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//        }, function (response) {
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });
//        $scope.isActive = toolService.isActive;
    }]);