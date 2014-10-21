angular.module('components.list-item', [])
.directive('listItem', function() {
    return {
        replace: true,
        templateUrl: 'tpl/list-item.html',
        scope: {
            item: '='
        },
        controller: function($scope) {

        }
    };
});
