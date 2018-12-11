'use strict'

moduleProducto.controller('productoPlistUsuarioController', ['$scope', '$http', '$location', 'toolService',
    'sessionService', '$routeParams', "$mdDialog", "countcarritoService",
    function ($scope, $http, $location, toolService, oSessionService, $routeParams, $mdDialog, countcarritoService) {

        $scope.ruta = $location.path();
        $scope.ob = "producto";
        $scope.op = "plistUsuario";
        $scope.totalPages = 1;


//        //Chequeo sesión
//        if (oSessionService.getUserName() !== "") {
//            $scope.usuario = oSessionService.getUserName();
//            $scope.logeado = true;
//            $scope.userId = oSessionService.getId();
//        }

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

        //Getpage trae todos los registros de productos de la BBDD
//        $http({
//            method: 'GET',
//            //withCredentials: true,
//            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getpage&rpp=' + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
//        }).then(function (response) {
//            $scope.status = response.status;
//            $scope.ajaxDataProductos = response.data.message;
//        }, function (response) {
//            $scope.ajaxDataProductos = response.data.message || 'Request failed';
//            $scope.status = response.status;
//        });
        
        $http({
            method: 'GET',
            url: `http://localhost:8081/trolleyes/json?ob=${toolService.objects.producto}&op=getpage&rpp=` + $scope.rpp + '&page=' + $scope.page + $scope.orderURLServidor
        }).then(function (response) {
            $scope.status = response.status;
            var productos = [];
            response.data.message.forEach(element => {
                var producto = {
                    producto: element,
                    cantidad: 0
                }
                productos.push(producto);
            });
            $scope.productos = productos;
        }, function (response) {
            $scope.status = response.status;
            $scope.ajaxDataUsuarios = response.data.message || 'Request failed';
        });

        $scope.advancedSearch = function () {
            if ($scope.advanced == false) {
                $scope.advanced = true;
            } else {
                $scope.advanced = false;
            }
        }


        $scope.save = function (producto) {
                $http({
                    method: 'GET',
                    url: `http://localhost:8081/trolleyes/json?ob=carrito&op=add&id=${producto.producto.id}&cant=1`
                }).then(function (response) {
                    countcarritoService.updateCarrito();
                }, function (response) {
                    $scope.showAlert('Error', response.data.message);
                });
//            }
        }
        
        
                $scope.add = function (producto) {
            if (producto.cantidad >= producto.producto.existencias) {
                $scope.showAlert('Error añadiendo productos', `Lo sentimos. Solo disponemos de ${producto.producto.existencias} unidades de ${producto.producto.desc}`);
            } else {
                producto.cantidad++;
            }
        }

        $scope.reduce = function (producto) {
            if (producto.cantidad <= 0) {
                $scope.showAlert('Error eliminando productos', 'No se puede eliminar mas productos');
            } else {
                producto.cantidad--;
            }
        }
        
        
        
                
          //Este mensaje se puede mejorar, buscar info en la api oficial de angular material
        //https://material.angularjs.org/latest/api/service/$mdDialog
        //https://ajax.googleapis.com/ajax/libs/angular_material/1.1.8/angular-material.css
        $scope.showAlert = function (titulo, description) {
            $mdDialog.show(
                    $mdDialog.alert()
                    .clickOutsideToClose(false)
                    .title(titulo)
                    .textContent(description)
                    .ariaLabel('Alert Dialog Demo')
                    .ok('OK!')
                    );
        };
        
        

       //AÑADIR 1 PRODUCTO AL CARRITO
        $scope.carrito = function (producto, cantidad) {

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: `http://localhost:8081/trolleyes/json?ob=carrito&op=add&producto=` + producto + `&cantidad=` + cantidad
            }).then(function (response) {
                console.log(response);
                location.reload();
            }), function (response) {
                console.log(response);
            }
        }



        $scope.resetOrder = function () {
            $location.url('producto/plist/' + $scope.rpp + '/' + $scope.page);
        }


        $scope.ordena = function (order, align) {
            if ($scope.orderURLServidor == "") {
                $scope.orderURLServidor = "&order=" + order + "," + align;
                $scope.orderURLCliente = order + "," + align;
            } else {
                $scope.orderURLServidor = $scope.orderURLServidor + "-" + order + "," + align;
                $scope.orderURLCliente = $scope.orderURLCliente + "-" + order + "," + align;
            }
            $location.url('producto/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        }


        //getcount
        $http({
            method: 'GET',
            url: 'http://localhost:8081/trolleyes/json?ob=producto&op=getcount'
        }).then(function (response) {
            $scope.status = response.status;
            $scope.ajaxDataProductosNumber = response.data.message;
            $scope.totalPages = Math.ceil($scope.ajaxDataProductosNumber / $scope.rpp);
            if ($scope.page > $scope.totalPages) {
                $scope.page = $scope.totalPages;
                $scope.update();
            }
            pagination2();
        }, function (response) {
            $scope.ajaxDataProductosNumber = response.data.message || 'Request failed';
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
            $location.url('producto/plist/' + $scope.rpp + '/' + $scope.page + '/' + $scope.orderURLCliente);
        }


        $scope.isActive = toolService.isActive;

    }
]);
