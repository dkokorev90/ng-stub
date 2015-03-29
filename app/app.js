var angular = require('angular');
var app = angular.module('app', [
    require('angular-animate'),
    require('angular-sanitize'),
    require('angular-ui-router')
]);

require('./views/main')(app);

app
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

     $stateProvider
        .state('main', {
            url: '/',
            template: require('./views/main/main.html'),
            controller: 'viewMainCtrl',
            data: { pageTitle: 'Main' }
        });
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
