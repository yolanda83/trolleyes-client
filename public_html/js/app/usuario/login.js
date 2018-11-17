'use strict'

moduleUsuario.controller('usuarioLoginController', ['$scope', '$http', 'toolService', '$location', 'sessionService',
    function ($scope, $http, toolService, $location, oSessionService) {

        $scope.isActive = toolService.isActive;




        $scope.log = function () {
            $scope.error = false;

            var login = $scope.login;
            var pass = forge_sha256($scope.pass);

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass,
//                params: {json: JSON.stringify(json)}
            }).then(function (response) {
                $scope.status = response.data.status;
//                $scope.resultado = "Te has logueado correctamente";
                if ($scope.status == 200) {
                    $scope.logeado = true;
                    oSessionService.setUserName(response.data.message.login);
                    $scope.usuario = oSessionService.getUserName();
                    $location.path('/home');
                } else {
                    $scope.error = true;
                    $scope.logeado = false;
                    $scope.usuario = "";
                }
            }), function (response) {
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            }
        }


    }]);