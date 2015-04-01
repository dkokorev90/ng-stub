function headerDir() {
    return {
        replace: true,
        scope: {},
        template: require('./tpl'),
        controller: 'myHeaderCtrl as header'
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

module.exports = angular
    .module('app.components.header', [])
    .directive('myHeader', headerDir)
    .controller('myHeaderCtrl', myHeaderCtrl)
    .name;

require('./style');
