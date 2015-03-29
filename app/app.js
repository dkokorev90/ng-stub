require('app.styl');

var angular = require('angular');
var app = angular.module('app', [
    // views
    require('./views/main'),
    require('./views/login'),

    // libs
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-ui-router')
]);

app
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
})
.controller('appCtrl', function($scope) {
    $scope.$on('$stateChangeStart', function() {});

    $scope.$on('$stateChangeSuccess', function(e, toState) {
        var paramsData = toState.data || {};

        if (paramsData.pageTitle) {
            $scope.pageTitle = paramsData.pageTitle;
        }
    });

    $scope.$on('$stateChangeError', function() {});
});
