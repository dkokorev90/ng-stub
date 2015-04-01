module.exports = angular
    .module('app.config', [])
    .constant('config', angular.extend(require('./default'), require('./' + ENV)))
    .constant('version', VERSION)
    .name;
