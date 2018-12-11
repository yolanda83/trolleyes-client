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

function js(toolService, sessionService, $scope, $http, $location) {
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



   $scope.log = function () {
            $scope.error = false;

            var login = $scope.login;
            var pass = forge_sha256($scope.pass);

            $http({
                method: 'GET',
                header: {
                    'Content-Type': 'application/json;charset=utf-8'
                },
                url: 'http://localhost:8081/trolleyes/json?ob=usuario&op=login&user=' + login + '&pass=' + pass,
            }).then(function (response) {
                $scope.status = response.data.status;
                if ($scope.status == 200) {
                    $scope.logeado = true;
                    sessionService.setUserName(response.data.message.login);
                    sessionService.setId(response.data.message.id);
                    $scope.usuario = sessionService.getUserName();
                    $scope.userId = sessionService.getId();
                    sessionService.setSessionActive();
                    $location.path('/home');
                } else {
                    $scope.error = true;
                    $scope.logeado = false;
                    $scope.usuario = "";
                }
            }), function (response) {
                $scope.ajaxDataUsuario = response.data.message || 'Request failed';
                $scope.status = response.status;
            }
        }
        
        

}
