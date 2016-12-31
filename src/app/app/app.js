window.App = window.App || {};

Array.prototype.first = function (e) {
    for (var n = 0; n < this.length; n++)if (e(this[n]))return this[n]
};
Array.prototype.each = function (e) {
    for (var n = 0; n < this.length; n++)e(this[n])
};
Array.prototype.where = function (e) {
    var retarr = [];
    for (var n = 0; n < this.length; n++)if (e(this[n])) retarr.push(this[n]);
    return retarr;
};
App = angular.module("App", ['ngAnimate', 'ngSanitize', 'spotify', 'ngMaterial', 'ngRoute', 'rx']);
App.config(function($routeProvider, $sceProvider) {
    $sceProvider.enabled(false);
    $routeProvider
        .when("/", {
            templateUrl: "/songs/core/Layout.html",
            controller: 'SongsController'
        })
        .when("/list/:id", {
            templateUrl: "/songs/core/Layout.html",
            controller: 'SongsController'
        })
        .otherwise({
           redirect: '/'
        });

});
App.run(['$rootScope', '$injector', function ($rootScope, $injector) {
    window.Promise.setScheduler(function (cb) {
        $rootScope.$evalAsync(cb);
    });
    window.$inject = function (definition){
        return $injector.invoke(definition);
    }
}]);