angular.module('services.db', [])
.factory('db', function() {
    var f = {};
    var items = [
        { title: 'List-item 1' },
        { title: 'List-item 2' },
        { title: 'List-item 3' },
        { title: 'List-item 4' },
        { title: 'List-item 5' }
    ];

    f.getItems = function() {
        return items;
    };

    return f;
});

