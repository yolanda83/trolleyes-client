'use strict'

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService',
    'sessionService', '$routeParams',
    function ($scope, $http, $location, toolService, oSessionService, $routeParams) {
        //$scope.ruta = $location.path();

        $scope.ob = "tipousuario";
        $scope.op = "plist";

        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }


        if (!$routeParams.order) {
            $scope.orderURLServidor = "";
            $scope.orderURLCliente = "";
        } else {
            $scope.orderURLServidor = "&order=" + $routeParams.order;
            $scope.orderURLCliente = $routeParams.order;
        }

        if (!$routeParams.rpp) {
            $scope.rpp = 10;
        } else {
            $scope.rpp = $routeParams.rpp;
        }

        if (!$routeParams.page) {
            $scope.page = 1;
        } else {
            if ($routeParams.page >= 1) {
                $scope.page = $routeParams.page;
            } else {
                $scope.page = 1;
            }
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor

        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoUsuarios = response.data.message;
        }, function (response) {
            $scope.ajaxDataTipoUsuarios = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataTipoUsuariosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataTipoUsuariosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataTipoUsuariosNumber = response.data.message || 'Request failed';
            $scope.status = response.status;
        });


        //paginacion neighbourhood
        function pagination2() {
            $scope.list2 = [];
            $scope.neighborhood = 3;
            for (var i = 1; i <= $scope.totalPages; i++) {
                if (i === $scope.page) {
                    $scope.list2.push(i);
                } else if (i <= $scope.page && i >= ($scope.page - $scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i >= $scope.page && i <= ($scope.page - -$scope.neighborhood)) {
                    $scope.list2.push(i);
                } else if (i === ($scope.page - $scope.neighborhood) - 1) {
                    $scope.list2.push("...");
                } else if (i === ($scope.page - -$scope.neighborhood) + 1) {
                    $scope.list2.push("...");
                }
            }
        }

        $scope.update = function () {
            $location.url(`tipousuario/plist/` + $scope.rpp + `/` + $scope.page + '/' + $scope.orderURLCliente);
        }


        $scope.isActive = toolService.isActive;

    }
])
