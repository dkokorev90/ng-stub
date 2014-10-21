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
            app + '/components/**/*.js',
            app + '/services/**/*.js',
            app + '/views/**/*.js'
        ],

        styl: [
            app + '/*.styl',
            app + '/components/**/*.styl',
            app + '/services/**/*.styl',
            app + '/views/**/*.styl'
        ],

        html: [
            app + '/components/**/*.html',
            app + '/services/**/*.html',
            app + '/views/**/*.html'
        ],

        images: app + '/images/**',

        fonts: app + '/fonts/**'
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
    },

    productionFiles: [
        dist + '/libs-*.{js,css}',
        dist + '/app-*.{js,css}'
    ],

    developmentFiles: [
        dist + '/libs.{js,css}',
        dist + '/app.{js,css}'
    ],
};
