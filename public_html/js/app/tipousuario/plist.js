'use strict'

moduleTipousuario.controller('tipousuarioPlistController', ['$scope', '$http', '$location', 'toolService', 'sessionService',
    function ($scope, $http, $location, toolService, oSessionService) {
        //$scope.ruta = $location.path();


        //Chequeo sesion
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
        }

        $http({
            method: 'GET',
            //withCredentials: true,
            url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=10&page=1'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message;
        }, function (response) {
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

//            $http({
//                method: 'GET',
//                //withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=tipousuario&op=get&id=2'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxData = response.data.message;
//            }, function (response) {
//                $scope.ajaxData = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
        $scope.isActive = toolService.isActive;



        $scope.update = function () {
            aux = 0;
            aux2 = 1;
            optionSelected = $scope.selectedItem;
            $scope.limitNgRepeat = optionSelected;
            pagination();
        }

//        function paginator(data) {
//            arrayList = [];
//            rppArray = [];
//
//            arrayPaginator = [];
//            rpp = data.length / optionSelected;
//
//            if (!Number.isInteger(rpp)) {
//                rpp = Math.floor(rpp);
//                //rpp = rpp + 1;
//            }
//            var aux1 = 0;
//            var aux2 = rpp;
//            for (var j = 0; j <= data.length; j++) {
//                if (aux1 === aux2) {
//                    rppArray.push(data[j]);
//                    arrayList.push(rppArray);
//                    rppArray = [];
//                    aux1 = 0;
//                } else {
//                    aux1 = aux1 + 1;
//                    rppArray.push(data[j]);
//                }
//            }
//            arrayList.push(rppArray);
//            $scope.datos = arrayList;
//            console.log(arrayList);
//            $scope.arrayPaginator = arrayPaginator;
//        }

        function loadTable(numRegistros, page) {
            $http({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:8081/trolleyes/json?ob=tipousuario&op=getpage&rpp=${numRegistros}&page=${page}`
            }).then(function (response) {
                data = response.data.message;
                numRegistrosRecibido = response.data.message.length;
                $scope.datos = response.data.message;
                //mensajeError(response.data.message, enumMensaje.correcto);
            }, function (response) {
                console.log(response.msg);
                //mensajeError(response.data.message, enumMensaje.error);
            });
        }

        function pagination() {
            var num = numRegistrosRecibido / optionSelected;
            arrayPaginator = [];
            if (!Number.isInteger(num)) {
                registros = num + 1;
            } else {
                registros = num;
            }
            for (var i = 1; i < registros; i++) {
                arrayPaginator.push(i);
            }
            $scope.arrayPaginator = arrayPaginator;
            console.log(arrayPaginator, registros);
        }

        $scope.loadTablePage = function (num) {
            if (aux2 < num) {
                aux += parseInt(optionSelected);
                aux2 = num;
            } else {
                aux -= parseInt(optionSelected);

            }
            $scope.startNgRepeat = aux;
            console.log(num, optionSelected, aux);
        };


// http://jsfiddle.net/2ZzZB/56/
        $scope.adelante = function () {
            aux += parseInt(optionSelected);
            $scope.startNgRepeat = aux;
        };

        $scope.atras = function () {
            aux -= parseInt(optionSelected);
            $scope.startNgRepeat = aux;
        };

        $scope.max = function (dato) {
            console.log(dato)
            if (dato !== null) {
                return true;
            } else {
                return false;
            }
        }



    }
])
