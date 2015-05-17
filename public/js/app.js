/**
 * Created by apple on 03/05/15.
 */
angular.module('app', [
        'btford.socket-io',
        'swipe'
    ]).
    constant('SOCKET_ADDRESS', location.origin.replace(/^http/, 'ws')).
    factory('mySocket', ['socketFactory', 'SOCKET_ADDRESS', function (socketFactory, SOCKET_ADDRESS) {

        return socketFactory({
            ioSocket: io.connect(SOCKET_ADDRESS)
        });

    }]).controller('AppController', ['$scope', 'mySocket', function ($scope, mySocket) {

        console.log('Hello');
}]);
