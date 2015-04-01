require('angular-translate');
require('angular-translate-loader-static-files');
require('ngstorage');

function config($translateProvider) {
    var availableLangs = ['ru', 'en'];
    var sngLangs = ['ru', 'uk', 'be', 'kk'];
    var langsAll = {};

    function fillLangs(langs, lang) {
        langs.forEach(function() {
            langsAll[lang] = lang;
            langsAll[lang + '-*'] = lang;
            langsAll[lang + '_*'] = lang;
        });
    }

    fillLangs(sngLangs, 'ru');

    $translateProvider
        .useStaticFilesLoader({
            prefix: '/i18n/',
            suffix: '.json?' + Date.now()
        })
        .registerAvailableLanguageKeys(availableLangs, langsAll)
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

module.exports = angular
    .module('app.utils.i18n', [
        'pascalprecht.translate',
        'ngStorage'
    ])
    .config(config)
    .factory('myLocalStorage', myLocalStorage)
    .name;
