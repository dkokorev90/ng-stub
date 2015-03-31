var appModule = angular.module('app.components.header', []);

function myHeaderCtrl() {
    var vm = this;

    vm.testFunc = testFunc;

    vm.logoText = 'my logo';
    vm.navItems = ['one', 'two', 'three'];

    function testFunc() {
        // do something
    }
}

function headerDir() {
    return {
        replace: true,
        scope: {},
        template: require('./tpl'),
        controller: 'myHeaderCtrl as header'
    };
}

appModule
    .directive('myHeader', headerDir)
    .controller('myHeaderCtrl', myHeaderCtrl);

require('./style');

module.exports = appModule.name;
