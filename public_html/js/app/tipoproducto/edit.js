'use strict'

moduleTipoproducto.controller('tipoproductoEditController', ['$scope', '$http', 'toolService', '$routeParams', 
    'sessionService', '$location',
    function ($scope, $http, toolService, $routeParams, oSessionService, $location) {

        $scope.id = $routeParams.id;
        $scope.ruta = $location.path();


        //Chequeo sesión
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

    }]);