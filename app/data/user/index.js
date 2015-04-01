var appModule = angular.module('app.data.user', []);

function userService() {
    var users = ['John', 'Kenny'];

    function getUser() {
        // something
    }

    function getUsers() {
        return users;
    }

    return {
        getUser: getUser,
        getUsers: getUsers
    };
}

appModule
    .factory('User', userService);

module.exports = appModule.name;

