var app = 'app';
var libs = 'libs';
var dist = 'dist';

module.exports = {
    app: app,
    dist: dist,
    distTpl: dist + '/tpl',
    tmp: '.tmp',

    // App files
    appFiles: {
        js: [
            app + '/*.js',
            app + '/components/*.js',
            app + '/services/*.js',
            app + '/views/*.js'
        ],

        styl: [
            app + '/*.styl',
            app + '/components/*.styl',
            app + '/services/*.styl',
            app + '/views/*.styl'
        ],

        css: [
            app + '/*.css',
            app + '/components/*.css',
            app + '/services/*.css',
            app + '/views/*.css'
        ],

        images: app + '/images',

        fonts: app + '/fonts'
    },

    // Vendor files
    libsFiles: {
        js: [
            libs + '/angular/angular.js',
            libs + '/angular-ui-router/release/angular-ui-router.js',
            libs + '/lodash/dist/lodash.js'
        ],

        css: [
            libs + '/normalize-css/normalize.css'
        ]
    }
};
