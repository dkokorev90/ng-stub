require('style');

var angular = require('angular');
var app = angular.module('app', [
    // components
    require('./components/header'),

    // views
    require('./views/main'),
    require('./views/login'),

    // libs
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-ui-router')
]);

function config($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
}

function appCtrl($scope) {
    $scope.$on('$stateChangeStart', function() {});

    $scope.$on('$stateChangeSuccess', function(e, toState) {
        var paramsData = toState.data || {};

        if (paramsData.pageTitle) {
            $scope.pageTitle = paramsData.pageTitle;
        }
    });

    $scope.$on('$stateChangeError', function() {});
}

app
    // env config
    .constant('config', require('./configs/env/' + ENV + '.js'))
    .config(config)
    .controller('appCtrl', appCtrl);
