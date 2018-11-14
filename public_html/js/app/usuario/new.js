'use strict'

moduleUsuario.controller('usuarioNewController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {

        $scope.numRegistros = 0;

        //Getpage trae todos los tipos de usuarios existentes en la BBDD
        $http({
            method: "GET",
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=100&page=1'
        }).then(function (response) {
            console.log(response);
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
            $scope.numRegistros = $scope.ajaxData.length;
            $scope.arrayTipos = [];
            var desc = "";
            for (var i = 0; i < $scope.numRegistros; i++) {
                desc = $scope.ajaxData[i]["desc"];
                $scope.arrayTipos.push(desc);
            }
        }), function (response) {
            console.log(response);
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        };

        $scope.isActive = toolService.isActive;


        $scope.guardar = function () {

            var descTipoUsuario = $scope.selectedId;
            for (var i = 0; i < $scope.numRegistros; i++) {
                var descrip = $scope.ajaxData[i]["desc"];
                if (descTipoUsuario == descrip) {
                    var idTU = $scope.ajaxData[i]["id"];
                }
            }
            var json = {
                dni: $scope.dni,
                nombre: $scope.nombre,
                ape1: $scope.ape1,
                ape2: $scope.ape2,
                login: $scope.login,
                pass: $scope.pass,
                id_tipoUsuario: idTU
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
                $scope.resultado = "Datos actualizados correctamente.";
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            }
        }

        //Chequeo Sesión
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=check'
        }).then(function (response) {
            $scope.estado = response.data.status;
            $scope.nombre = response.data.message["login"];

        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.estado = response.status;
        });


    }]);