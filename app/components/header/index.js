var appModule = angular.module('app.components.header', []);

function headerDir() {
    return {
        replace: true,
        scope: {},
        template: require('./tpl'),
        controller: myHeaderCtrl,
        controllerAs: 'header'
    };
}

function myHeaderCtrl() {
    var vm = this;

    vm.testFunc = testFunc;

    vm.logoText = 'my logo';
    vm.navItems = ['one', 'two', 'three'];

    function testFunc() {
        // do something
    }
}

appModule
    .directive('myHeader', headerDir);

require('./style');

module.exports = appModule.name;
