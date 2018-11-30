'use strict'

moduleCarrito.controller('carritoPlistController', ['$scope', '$http', '$location', 'toolService',
    'sessionService', '$routeParams',
    function ($scope, $http, $location, toolService, oSessionService, $routeParams) {

        $scope.ruta = $location.path();
        $scope.ob = "linea";
        $scope.op = "plist";
        $scope.totalPages = 1;
//        $scope.user = $routeParams.user;
        $scope.user = $routeParams.userid;
        $scope.id = $routeParams.id;


        //Chequeo sesión
        if (oSessionService.getUserName() !== "") {
            $scope.usuario = oSessionService.getUserName();
            $scope.logeado = true;
            $scope.userId = oSessionService.getId();
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
            url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=get&id=' + $scope.user
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuario = response.data.message;
        }, function (response) {
            $scope.ajaxDataLinea = response.data.message || 'Request failed';
            $scope.status = response.status;
        });

        //Getpage trae todos los registros de linea de la BBDD con ID de la factura relleno
//        if ($scope.id != null) {
            $http({
                method: 'GET',
                //withCredentials: true,
                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + '&id=' + $scope.id + $scope.orderURLServidor
            }).then(function (response) {
                $scope.status = response.status;
                $scope.ajaxDataLinea = response.data.message;
                $scope.ajaxDataUsuarioId = $scope.ajaxDataLinea[0].obj_factura.obj_usuario.id;
            }, function (response) {
                $scope.ajaxDataLinea = response.data.message || 'Request failed';
                $scope.status = response.status;
            });
//        } else {
//            //Getpage trae todos los registros de linea de la BBDD sin ID de la factura relleno
//            $http({
//                method: 'GET',
//                //withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataLinea = response.data.message;
//                $scope.ajaxDataUsuarioId = $scope.ajaxDataLinea[0].obj_factura.obj_usuario.id;
//            }, function (response) {
//                $scope.ajaxDataLinea = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
////        }
//        }


    $scope.borrar = function () {

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=empty',
//                params: {json: JSON.stringify(json)}
            }).then(function (data, response) {
                console.log(data, response);
            }), function (response) {
                console.log(response);
            }
        }
        

        $scope.resetOrder = function () {
            if ($scope.id == null) {
                $location.url('linea/plist/' + $scope.rpp + '/' + $scope.page);
            } else {
                $location.url('linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.id + '/' + $scope.user);
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
                $location.url('linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
            } else {
                $location.url('linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.id + '/' + $scope.user + '/' + $scope.orderURLCliente);
            }
        }


        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataLineaNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataLineaNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataLineaNumber = response.data.message || 'Request failed';
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
            $location.url('linea/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        }


        $scope.isActive = toolService.isActive;

//---------------------------------------------------------------------------
//
//        $scope.ruta = $location.path();
//        $scope.id = $routeParams.id;
//        $scope.user = $routeParams.user;


//        $scope.lineaLimpiar = function () {
//            $scope.ajaxDataLinea = "";
//        }

//        $scope.crearLinea = function () {
//            $http({
//                method: 'GET',
//                withCredentials: true,
//                url: 'http://localhost:8081/trolleyes/json?ob=linea&op=create'
//            }).then(function (response) {
//                $scope.status = response.status;
//                $scope.ajaxDataProductos = response.data.message;
//            }, function (response) {
//                $scope.ajaxDataProductos = response.data.message || 'Request failed';
//                $scope.status = response.status;
//            });
//        }

//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=linea&op=getcount'
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDataFacturaNumber = response.data.message;
//        }, function (response) {
//            $scope.ajaxDataFacturaNumber = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });





    }
]);
