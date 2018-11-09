'use strict'

moduleTipousuario.controller('tipousuarioRemoveController', ['$scope', '$http', 'toolService', '$routeParams',
    function ($scope, $http, toolService, $routeParams) {
        $scope.id = $routeParams.id;

        $scope.deleted = true;

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=' + $scope.id
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxData = response.data.message;
        }, function (response) {
            $scope.ajaxData = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        $scope.eliminar = function () {
            $http({
                method: "GET",
                url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=remove&id=${$routeParams.id}`
            }).then(function (response) {
                $scope.deleted = false;
            })
        }



        $scope.isActive = toolService.isActive;

    }
]);