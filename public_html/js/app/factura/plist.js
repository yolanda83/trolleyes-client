'use strict'

moduleFactura.controller('facturaPlistController', ['$scope', 'toolService', '$http',
    function ($scope, toolService, $http) {
        var data;
        var optionSelected;
        var arrayPaginator;
        var rpp;
        var arrayList;
        var rppArray;
        var numRegistrosRecibido;
        var registros;
        var aux;
        var aux2;

        loadTable(500, 1);

        /*
         //https://www.consolelog.io/angularjs-change-path-without-reloading/
         var original = $location.path;
         $location.path = function (path, reload) {
         if (reload === false) {
         var lastRoute = $route.current;
         var un = $rootScope.$on('$locationChangeSuccess', function () {
         $route.current = lastRoute;
         un();
         });
         }
         return original.apply($location, [path]);
         };
         */

        $scope.isActive = toolService.isActive;

        $scope.viewReg = function (id) {
            var test = [];
            $http({
                method: 'GET',
                withCredentials: true,
                url: `http://localhost:8081/trolleyes/json?ob=factura&op=get&id=${id}`
            }).then(function (response) {
                //$location.url(`/producto/plist/${id}`, false);
                test.push(response.data.message);
                console.log(data);
                $scope.datos = test;
                $scope.limitNgRepeat = 1;
                //mensajeError(response.data.message, enumMensaje.correcto);
            }, function (response) {
                console.log(response.msg);
                //mensajeError(response.data.message, enumMensaje.error);
            });
        }

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
                url: `http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=${numRegistros}&page=${page}`
            }).then(function (response) {
                data = response.data.message;
                numRegistrosRecibido = response.data.message.length;
                $scope.datos = response.data.message;
                for (var i = 0; i < $scope.datos.length; i++) {

                    var fecha = $scope.datos[i]["fecha"];
                    var diaN = "";
                    var dia = fecha.substr(-8, 2);
                    if (dia.charAt(0) == " ") {
                        diaN = dia.replace(" ", "0");
                    } else {
                        diaN = dia;
                    }
                    var anyo = fecha.substr(-4);
                    var mesN = "";
                    var mesS = fecha.substr(0, 3);
                    switch (mesS) {
                        case "ene":
                            mesN = "01";
                            break;
                        case "feb":
                            mesN = "02";
                            break;
                        case "mar":
                            mesN = "03";
                            break;
                        case "abr":
                            mesN = "04";
                            break;
                        case "may":
                            mesN = "05";
                            break;
                        case "jun":
                            mesN = "06";
                            break;
                        case "jul":
                            mesN = "07";
                            break;
                        case "ago":
                            mesN = "08";
                            break;
                        case "sep":
                            mesN = "09";
                            break;
                        case "oct":
                            mesN = "10";
                            break;
                        case "nov":
                            mesN = "11";
                            break;
                        case "dic":
                            mesN = "12";
                            break;
                        default:

                    }

                    var fechaFormat = diaN + '/' + mesN + '/' + anyo;
                    $scope.datos[i]["fecha"] = fechaFormat;
                }
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



    }
])
