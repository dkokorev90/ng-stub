function config($stateProvider) {
    $stateProvider
        .state('main', {
            url: '/',
            template: require('./tpl'),
            controller: viewMainCtrl,
            controllerAs: 'vm',
            data: { pageTitle: 'Main' }
        });
}

function viewMainCtrl() {
    var vm = this;

    vm.items = [
        { text: 'something interesting' },
        { text: 'another thing' },
        { text: 'something great!' }
    ];
}

module.exports = angular
    .module('app.views.main', [
        require('angular-ui-router')
    ])
    .config(config)
    .name;

require('./style');
