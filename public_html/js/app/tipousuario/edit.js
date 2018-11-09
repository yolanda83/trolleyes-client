'use strict'

moduleTipousuario.controller('tipousuarioEditController', ['$scope', '$http', '$location', 'toolService', '$routeParams',
    function ($scope, $http, $location, toolService, $routeParams) {
        $scope.id = $routeParams.id;
        $scope.ruta = $location.path();


        $http({
            method: "GET",
            url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=${$routeParams.id}`
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
                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=update',
                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
            }), function (response) {
                console.log(response);
            }
        }

//        $scope.usuarios = function () {
//            $http({
//                method: 'GET',
//                //withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=10&page=1'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataUsuarios = response.data.message;
//            }, function (response) {
//                $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }
//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=2'
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxData = response.data.message;
//        }, function (response) {
//            $scope.ajaxData = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });
//        $scope.isActive = toolService.isActive;

    }]);