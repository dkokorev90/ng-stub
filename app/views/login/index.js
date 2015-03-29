require('./login.styl');

var appModule = angular.module('app.views.login', [
    require('angular-ui-router')
]);

appModule
.config(function($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: require('./login.html'),
            controller: 'viewLoginCtrl',
            data: { pageTitle: 'Login' },
        });
})
.controller('viewLoginCtrl', function($scope) {
    $scope.name = 'Dima';
});

module.exports = appModule.name;
