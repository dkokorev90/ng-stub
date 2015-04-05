var app = angular.module('app', [
    require('./configs'),
    require('./components'),
    require('./views'),
    require('./utils'),
    require('./data'),
    require('libs')
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
    .config(config)
    .controller('appCtrl', appCtrl);

require('style');
