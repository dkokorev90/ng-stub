function config($stateProvider) {
    $stateProvider
        .state('login', {
            url: '/login',
            template: require('./tpl'),
            controller: viewLoginCtrl,
            controllerAs: 'vm',
            data: { pageTitle: 'Login' },
        });
}

function viewLoginCtrl(User) {
    this.name = 'Dima';

    this.users = User.getUsers();
}

module.exports = angular
    .module('app.views.login', [
        require('angular-ui-router')
    ])
    .config(config)
    .name;

require('./style');
