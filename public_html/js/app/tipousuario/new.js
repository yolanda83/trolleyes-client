'use strict'

moduleTipousuario.controller('tipousuarioNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
    function ($scope, $http, toolService, $routeParams, oSessionService) {

        $scope.numRegistros = 0;

        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }

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
                pass: forge_sha256($scope.pass),
                id_tipoUsuario: $scope.obj_tipoUsuario.id
            }
            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
                $scope.resultado = "Tipo Usuario creado correctamente.";
                $scope.new = true;
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
                $scope.resultado = "No se ha podido crear el Tipo Usuario.";
            }
        }


        $scope.isActive = toolService.isActive;


    }]);