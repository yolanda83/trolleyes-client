moduleComponent.component('headerComponent', {
    //restrict: 'A',
    templateUrl: 'js/system/component/header/header.html',
    bindings: {
        // data: '=',
        // tabla: '<'
        eventlistener: '&'
    },
    controllerAs: 'c',
    controller: js
});

function js(toolService, sessionService, $http) {
    var self = this;

//Chequeo sesión
    if (sessionService.getUserName() !== "") {
        self.usuario = sessionService.getUserName();
        self.logeado = true;
        self.userId = sessionService.getId();
    } else {
        self.usuario = "";
        self.logeado = false;
        self.userId = null;
    }


    $http({
        method: 'GET',
        //withCredentials: true,
        url: 'http://localhost:8081/trolleyes/json?ob=carrito&op=show'
    }).then(function (response) {
        self.status = response.status;
        self.ajaxDataCarrito = response.data.message;
        if (self.ajaxDataCarrito !== null) {
            self.cantidad = self.ajaxDataCarrito.length;
        } else {
            self.cantidad = 0;
        }
    }, function (response) {
        self.ajaxDataCarrito = response.data.message || 'Request failed';
        self.status = response.status;
    });


    self.isActive = toolService.isActive;

//    self.isAdmin = sessionService.isAdmin();

//    self.carrito = sessionService.getCountCarrito();

}
