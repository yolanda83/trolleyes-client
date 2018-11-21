'use strict'

moduleUsuario.controller('usuarioNewController', ['$scope', '$http', 'toolService', '$routeParams', 'sessionService',
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
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=create',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
                $scope.resultado = "Usuario creado correctamente.";
                $scope.new = true;
            }), function (response) {
                console.log(response);
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
                $scope.resultado = "No se ha podido crear el usuario.";
            }
        }


    }]);