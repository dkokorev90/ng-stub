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
        // default config + env config
        require('./configs/app'),
        require('./components'),
        require('./views'),
        require('./utils'),
        require('./data'),
        require('libs')
    ])
    .config(config)
    .controller('appCtrl', appCtrl);

require('style');
