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


    self.logeado = sessionService.isSessionActive();
    self.usuario = sessionService.getUserName();
    self.userId = sessionService.getId();
    self.isActive = toolService.isActive;
//    self.isAdmin = sessionService.isAdmin();
    self.carrito = sessionService.getCountCarrito();



    sessionService.registerObserverCallback(function () {
        self.usuario = sessionService.getUserName();
    })
//    sessionService.registerObserverCallback(function () {
//        self.isAdmin = sessionService.isAdmin();
//    })

    sessionService.registerObserverCallback(function () {
        self.carrito = sessionService.getCountCarrito();


    })
    sessionService.registerObserverCallback(function () {
        self.logeado = sessionService.isSessionActive();
    })

//   self.isActive = toolService.isActive;





//
////Chequeo sesión
//    if (sessionService.getUserName() !== "") {
//        self.usuario = sessionService.getUserName();
//        self.logeado = true;
//        self.userId = sessionService.getId();
//
//    } else {
//        self.usuario = "";
//        self.logeado = false;
//        self.userId = null;
//    }
//        self.carrito = sessionService.getCountCarrito();
//  sessionService.registerObserverCallback(function () {
//        self.carrito = sessionService.getCountCarrito();
//    });
//
//

 

//    self.isAdmin = sessionService.isAdmin();

//    self.carrito = sessionService.getCountCarrito();

}
