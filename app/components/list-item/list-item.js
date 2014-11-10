angular.module('components.list-item', [])
.directive('listItem', function() {
    return {
        replace: true,
        templateUrl: 'components/list-item/list-item.html',
        scope: {
            item: '='
        },
        controller: function() {

        }
    };
});
