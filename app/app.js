angular.module('app', [
    // views
    'views.list',

    // components
    'components.list',
    'components.list-item',

    // services
    'services.db',

    // libs
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

     $stateProvider
        .state('list', {
            url: '/',
            template: '<div list></div>',
            // templateUrl: 'tpl/list.html',
            controller: 'viewListCtrl',
            data: { pageTitle: 'List' }
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
