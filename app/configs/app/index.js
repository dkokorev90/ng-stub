var appModule = angular.module('app.config', []);

appModule
    .constant('config', angular.extend(require('./default'), require('./' + ENV)))
    .constant('version', VERSION);

module.exports = appModule.name;
