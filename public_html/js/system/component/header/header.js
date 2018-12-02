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

function js(toolService, sessionService) {
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


    self.isActive = toolService.isActive;

//    self.isAdmin = sessionService.isAdmin();

//    self.carrito = sessionService.getCountCarrito();

}
