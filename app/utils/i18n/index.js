// For more info: http://angular-translate.github.io/

require('angular-translate');
require('angular-translate-loader-static-files');
require('ngstorage');

var appModule = angular.module('app.utils.i18n', [
    'pascalprecht.translate',
    'ngStorage'
]);

function config($translateProvider) {
    $translateProvider
        .useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json?'
        })
        .registerAvailableLanguageKeys(['en', 'ru'], {
            'ru_RU': 'ru',
            'ru-RU': 'ru',
            'ru_UA': 'ru',
            'ru-UA': 'ru',
            'ua':    'ru',
            'ru-MD': 'ru',
            'ru_MD': 'ru',
            'be-BY': 'ru',
            'be_BY': 'ru',
            'be':    'ru',
            'kk':    'ru',
            'ka-GE': 'ru',
            'ka':    'ru',
            'kk-KZ': 'ru',
            'et':    'ru',
            'et-EE': 'ru',
            'lv':    'ru',
            'lv-LV': 'ru',
            'lt':    'ru',
            'lt-LT': 'ru',
            'az':    'ru',
            'az-AZ-Cyrl': 'ru',
            'az-AZ': 'ru',
            'hy':    'ru',
            'hy-AM': 'ru',
            'uz':    'ru',
            'uz-UZ-Cyrl': 'ru',
            'uz-UZ': 'ru',
            'ky':    'ru',
            'ky-KG': 'ru'
        })
        .determinePreferredLanguage()
        .fallbackLanguage('en')
        .useSanitizeValueStrategy('escaped')
        .useStorage('myLocalStorage')
        .storageKey('lang');
}

function myLocalStorage($localStorage) {
    var langKey;

    function setter(name, value) {
        langKey = value;

        $localStorage[name] = value;
    }

    function getter(name) {
        if (!langKey) {
            langKey = $localStorage[name];
        }

        return langKey;
    }

    return {
        get: getter,
        put: setter,
        set: setter
    };
}

require('i18n/ru.json');
require('i18n/en.json');

appModule
    .config(config)
    .factory('myLocalStorage', myLocalStorage);

module.exports = appModule.name;
