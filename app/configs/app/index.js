var appModule = angular.module('app.configs.app', []);

appModule
    .constant('config', angular.extend(require('./default'), require('./' + ENV)))
    .constant('version', VERSION);

module.exports = appModule.name;
