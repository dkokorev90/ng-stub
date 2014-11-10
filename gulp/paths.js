var app = 'app/';
var dist = 'dist/';
var tmp = '.tmp/';

module.exports = {
    app: app,
    dist: dist,
    distTpl: dist + '/tpl/',
    tmp: '.tmp/',

    // App files
    appFiles: {
        js: [
            app + '*.js',
            app + 'components/**/*.js',
            app + 'services/**/*.js',
            app + 'views/**/*.js'
        ],

        styl: [
            app + '*.styl',
            app + 'components/**/*.styl',
            app + 'services/**/*.styl',
            app + 'views/**/*.styl'
        ],

        css: tmp + '**/*.css',

        html: [
            app + 'components/**/*.html',
            app + 'services/**/*.html',
            app + 'views/**/*.html'
        ],

        images: app + 'images/**',

        fonts: app + 'fonts/**'
    }
};
