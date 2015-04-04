var appModule = require('./index.js');

describe(appModule, function() {
    var ctrl, scope, elem;

    beforeEach(window.module(appModule));

    describe('controller', function() {
        beforeEach(inject(function($rootScope, $controller) {
            scope = $rootScope.$new();
            ctrl = $controller('myHeaderCtrl', { $scope: scope });
        }));

        it('should have logoText = "my logo"', function() {
            assert.equal(ctrl.logoText, 'my logo');
        });
    });

    describe('directive', function() {
        beforeEach(inject(function($rootScope, $compile) {
            scope = $rootScope.$new();
            elem = $compile('<header my-header></header>')(scope);

            scope.$digest();
        }));

        it('should have element logo with text "my logo"', function() {
            assert.equal(elem[0].querySelector('.header__logo').innerHTML, 'my logo');
        });

        it('should have nav with 3 items', function() {
            assert.lengthOf(elem[0].querySelectorAll('.header__nav-item'), 3);
        });
    });
});
