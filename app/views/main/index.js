require('./main.styl');

var appModule = angular.module('app.views.main', [
    require('angular-ui-router')
]);

appModule
.config(function($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: require('./main.html'),
            controller: 'viewMainCtrl',
            data: { pageTitle: 'Main' }
        });
})
.controller('viewMainCtrl', function($scope) {
    $scope.items = [
        { text: 'something interesting' },
        { text: 'another thing' },
        { text: 'something great!' }
    ];
});

module.exports = appModule.name;
