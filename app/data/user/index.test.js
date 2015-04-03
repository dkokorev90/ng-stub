var appModule = require('./index.js');

describe(appModule, function() {
    var User;

    beforeEach(window.module(appModule));

    describe('service', function() {
        beforeEach(inject(function(_User_) {
            User = _User_;
        }));

        it('should return 2 users', function() {
            assert.lengthOf(User.getUsers(), 2);
        });
    });
});
