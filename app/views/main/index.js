module.exports = function(app) {
    app.controller('viewMainCtrl', function($scope) {
        $scope.items = [
            { text: 'something interesting' },
            { text: 'another thing' },
            { text: 'something great!' }
        ];
    });
};
