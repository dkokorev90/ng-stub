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

angular
    .module('app', [
        require('./components'),
        require('./views'),
        require('./utils'),
        require('libs')
    ])
    // env config
    .constant('config', require('./configs/env/' + ENV + '.js'))
    // .constant('version', require('../package.json').version)
    .config(config)
    .controller('appCtrl', appCtrl);

require('style');
