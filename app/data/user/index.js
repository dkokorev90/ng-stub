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

module.exports = angular
    .module('app.data.user', [])
    .factory('User', userService)
    .name;
