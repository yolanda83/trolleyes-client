'use strict'

moduleFactura.controller('facturaPlistController', ['$scope', 'toolService', '$http', 'sessionService',
    '$routeParams', '$location',
    function ($scope, toolService, $http, oSessionService, $routeParams, $location) {


        $scope.ob = "factura";
        $scope.op = "plist";
        $scope.id = $routeParams.id;
        $scope.user = $routeParams.user;
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

        if ($scope.id == null && $scope.user == null) {

            //Getpage trae todos los registros de factura de la BBDD
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataFactura = response.data.message;
                $scope.hayId = false;

                for (var i = 0; i < $scope.ajaxDataFactura.length; i++) {

                    var fecha = $scope.ajaxDataFactura[i]["fecha"];
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
                    $scope.ajaxDataFactura[i]["fecha"] = fechaFormat;

                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataFactura = response.data.message || 'Request failed';
            });

            //Si el usuario y el id vienen rellenos
        } else {

            //Getpage trae todos los registros de factura de la BBDD
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + '&id=' +
                        $scope.id + $scope.orderURLServidor
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataFactura = response.data.message;
                $scope.hayId = true;
                
                for (var i = 0; i < $scope.ajaxDataFactura.length; i++) {

                    var fecha = $scope.ajaxDataFactura[i]["fecha"];
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
                    $scope.ajaxDataFactura[i]["fecha"] = fechaFormat;

                }
            }, function (response) {
                $scope.status = response.status;
                $scope.ajaxDataFactura = response.data.message || 'Request failed';
            });
        }

        $scope.resetOrder = function () {

            if ($scope.id == null) {
                $location.url('factura/plist/' + $scope.rpp + '/' + $scope.page);
            } else {
                $location.url('factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.id + '/' + $scope.user);
            }
        }


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor == "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            if ($scope.id == null) {
                $location.url('factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
            } else {
                $location.url('factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.id + '/' + $scope.user + '/' + $scope.orderURLCliente);
            }
        }


        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=factura&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataFacturaNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataFacturaNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataFacturaNumber = response.data.message || 'Request failed';
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
            $location.url('factura/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        }


        $scope.isActive = toolService.isActive;
//        function loadTable(numRegistros, page) {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: `http://localhost:8081/trolleyes/json?ob=factura&op=getpage&rpp=${numRegistros}&page=${page}`
//            }).then(function (response) {
//                data = response.data.message;
//                numRegistrosRecibido = response.data.message.length;
//                $scope.datos = response.data.message;
//                for (var i = 0; i < $scope.datos.length; i++) {
//
//                    var fecha = $scope.datos[i]["fecha"];
//                    var diaN = "";
//                    var dia = fecha.substr(-8, 2);
//                    if (dia.charAt(0) == " ") {
//                        diaN = dia.replace(" ", "0");
//                    } else {
//                        diaN = dia;
//                    }
//                    var anyo = fecha.substr(-4);
//                    var mesN = "";
//                    var mesS = fecha.substr(0, 3);
//                    switch (mesS) {
//                        case "ene":
//                            mesN = "01";
//                            break;
//                        case "feb":
//                            mesN = "02";
//                            break;
//                        case "mar":
//                            mesN = "03";
//                            break;
//                        case "abr":
//                            mesN = "04";
//                            break;
//                        case "may":
//                            mesN = "05";
//                            break;
//                        case "jun":
//                            mesN = "06";
//                            break;
//                        case "jul":
//                            mesN = "07";
//                            break;
//                        case "ago":
//                            mesN = "08";
//                            break;
//                        case "sep":
//                            mesN = "09";
//                            break;
//                        case "oct":
//                            mesN = "10";
//                            break;
//                        case "nov":
//                            mesN = "11";
//                            break;
//                        case "dic":
//                            mesN = "12";
//                            break;
//                        default:
//
//                    }
//
//                    var fechaFormat = diaN + '/' + mesN + '/' + anyo;
//                    $scope.datos[i]["fecha"] = fechaFormat;
//                }
//                //mensajeError(response.data.message, enumMensaje.correcto);
//            }, function (response) {
//                console.log(response.msg);
//                //mensajeError(response.data.message, enumMensaje.error);
//            });
//        }

    }
])
