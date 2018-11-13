'use strict'

moduleUsuario.controller('usuarioEditController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {

        $scope.id = $routeParams.id;


//        $scope.guardar = function () {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=update',
//                params: {json: JSON.stringify(json)}
////                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=update&json=' + json,
////                data: JSON.stringify(json),
//            }).then(function (response) {
//                $scope.status = response.status;
////                $scope.ajaxDataProductos = response.data.message;
//                $scope.resultado = "Datos actualizados correctamente.";
//            }, function (response) {
//                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }


        $scope.guardar = function () {
            var json = {
                id: $scope.id,
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: $scope.pass,
                id_tipoUsuario: $scope.obj_tipoUsuario_id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
            }), function (response) {
                console.log(response);
            }
        }

//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.id
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//        }, function (response) {
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });


        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=${$routeParams.id}`
        }).then(function (response) {
            console.log(response);
            $scope.id = response.data.message.id;
            $scope.dni = response.data.message.dni;
            $scope.nombre = response.data.message.nombre;
            $scope.ape1 = response.data.message.ape1;
            $scope.ape2 = response.data.message.ape2;
            $scope.login = response.data.message.login;
            $scope.pass = response.data.message.pass;
            $scope.obj_tipoUsuario_desc = response.data.message.obj_tipoUsuario.desc;
            $scope.obj_tipoUsuario_id = response.data.message.obj_tipoUsuario.id;
        }), function (response) {
            console.log(response);
        };




        $scope.isActive = toolService.isActive;
    }]);