angular.module('components.list', [])
.directive('list', function() {
    return {
        replace: true,
        template: '<div class="list"><div list-item ng-repeat="item in items" item="item"></div></div>',
        controller: function($scope, db) {
            $scope.items = db.getItems();
        }
    };
});
