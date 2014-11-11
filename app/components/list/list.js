angular.module('components.list', [])
.directive('list', function() {
    return {
        replace: true,
        templateUrl: 'tpls/list/list.html',
        // template: '<div class="list"><div list-item ng-repeat="item in items" item="item"></div></div>',
        controller: function($scope, db) {
            $scope.items = db.getItems();
        }
    };
});
