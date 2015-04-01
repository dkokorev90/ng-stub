require('angular');
require('angular-animate');
require('angular-sanitize');
require('angular-ui-router');

module.exports = angular.module('app.libs', [
    'ngAnimate',
    'ngSanitize',
    'ui.router'
]).name;
