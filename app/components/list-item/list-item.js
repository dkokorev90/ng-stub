angular.module('components.list-item', [])
.directive('listItem', function() {
    return {
        replace: true,
        templateUrl: 'tpls/list-item/list-item.html',
        scope: {
            item: '='
        },
        controller: function() {

        }
    };
});
