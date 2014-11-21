'use strict';

var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var wiredep = require('wiredep');
var paths = require('./paths.js');
var browserSync = require('browser-sync');
var rewriteModule = require('http-rewrite-middleware');
var nib = require('nib');
var isServe = $.util.env.s || $.util.env.serve;
var ENV = 'development';
var isProd;

$.del = require('del');
$.map = require('map-stream');
$.es = require('event-stream');
$.wiredep = wiredep.stream;

// Info to screen
function info() {
    var glog = $.util.log;
    var colors = $.util.colors;

    glog(colors.green('--------------------------------'));
    glog(colors.green('========> ENV:', colors.yellow(ENV)));
    glog(colors.green('--------------------------------'));
}

// Set ENV variable and execute info function
function init(env) {
    isProd = env === 'prod';
    ENV = isProd ? 'production' : 'development';
    info();
}

function startSever(baseDir, files) {
    browserSync({
        files: files,
        server: {
            baseDir: baseDir,
            middleware: [
                rewriteModule.getMiddleware([
                    { from: '^.*(?=fonts|images)(fonts|images)/(.*)', to: '/$1/$2' }
                ])
            ]
        },
        open: false
    });
}

// Clean 'dist' and '.tmp' directories before start
gulp.task('clean', function(cb) {
    $.del([paths.tmp, paths.dist], cb);
});

gulp.task('styles:app', function() {
    var dist = isProd ? paths.dist : paths.tmp + 'styles',
        cwdApp = process.cwd() + '/' + paths.app;

    return gulp.src(paths.appFiles.styl)
        .pipe($.changed(dist, { extension: '.css' }))
        .pipe($.header('@import "nib"\n'))
        .pipe($.plumber())
        .pipe($.stylus({
            use: nib(),
            import: [
                cwdApp + 'styl/config',
                cwdApp + 'styl/vars'
            ]
        }))
        .pipe($.if (isProd, $.concat('app.css')))
        .pipe($.if (isProd, $.minifyCss()))
        .pipe($.if (isProd, $.rev()))
        .pipe(gulp.dest(dist))
        .pipe($.size({ title: 'styles:app' }));
});

gulp.task('styles:libs', ['styles:app'], function() {
    return gulp.src(wiredep().css)
        .pipe($.minifyCss())
        .pipe($.concat('libs.css'))
        .pipe($.rev())
        .pipe(gulp.dest(paths.dist))
        .pipe($.size({ title: 'styles:libs' }));
});

// Concat, minify all js files (templates file also) and append content hash to filename
gulp.task('js', function() {
    return $.es.merge(
        gulp.src(wiredep().js)
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('libs.js'))
            .pipe($.rev())
            .pipe(gulp.dest(paths.dist))
            .pipe($.size({ title: 'js:libs' })),
        gulp.src(paths.appFiles.js)
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('app.js'))
            .pipe($.rev())
            .pipe(gulp.dest(paths.dist))
            .pipe($.size({ title: 'js:app' }))
        );
});

// Preload HTML templates from 'dist/tpl' to the $templateCache
gulp.task('tpls', function() {
    return gulp.src(paths.appFiles.html)
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true
        }))
        .pipe(gulp.dest(paths.dist + 'tpls'))
        .pipe($.angularTemplatecache('tpls.js', { module: 'app', root: 'tpls/' }))
        .pipe($.uglify())
        .pipe($.rev())
        .pipe(gulp.dest(paths.dist))
        .pipe($.size({ title: 'tpls' }));
});

gulp.task('tpls:dev', function() {
    var tplsDir = paths.tmp + 'tpls';

    return gulp.src(paths.appFiles.html)
        .pipe($.changed(tplsDir))
        .pipe(gulp.dest(tplsDir))
        .pipe($.size({ title: 'tpls:dev' }));
});

// Transfer images to 'dist/images' folder
gulp.task('images', function() {
    return gulp.src(paths.appFiles.images)
        .pipe(gulp.dest(paths.dist + '/images'))
        .pipe($.size({ title: 'images' }));
});

// Transfer fonts to 'dist/fonts' folder
gulp.task('fonts', function() {
    return gulp.src(paths.appFiles.fonts)
        .pipe(gulp.dest(paths.dist + '/fonts'))
        .pipe($.size({ title: 'fonts' }));
});

gulp.task('build:dev', ['styles:app', 'tpls:dev'], function() {
    return gulp.src(paths.app + 'index.html')
        .pipe($.inject(
            gulp.src(paths.appFiles.js.concat(paths.appFiles.css), { read: false }),
            {
                starttag: '<!-- app:{{ext}} -->',
                addRootSlash: false,
                ignorePath: [paths.app, paths.tmp]
            }
        ))
        .pipe($.wiredep())
        .pipe(gulp.dest(paths.dist));
});

gulp.task('build:prod', ['styles:libs', 'js', 'fonts', 'images', 'tpls'], function() {
    return gulp.src(paths.app + 'index.html')
        .pipe($.inject(
            gulp.src([paths.dist + 'app-*.{js,css}', paths.dist + 'tpls-*.js'], { read: false }),
            {
                addRootSlash: false,
                starttag: '<!-- app:{{ext}} -->',
                ignorePath: paths.dist
            }
        ))
        .pipe($.inject(
            gulp.src(paths.dist + 'libs-*.{js,css}', { read: false }),
            {
                addRootSlash: false,
                starttag: '<!-- bower:{{ext}} -->',
                endtag: '<!-- endbower -->',
                ignorePath: paths.dist
            }
        ))
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        }))
        .pipe(gulp.dest(paths.dist));
});

// Custom jshint error reporter
function jshintErrorReporter() {
    return $.map(function(file, cb) {
        file.jshint.success || process.exit(1);
        cb(null, file);
    });
}

// Lint your js files
gulp.task('lint', function() {
    return gulp.src(paths.appFiles.js)
        .pipe($.jshint())
        .pipe($.jshint.reporter('jshint-stylish'))
        .pipe(jshintErrorReporter())
        .pipe($.jscs());
});

gulp.task('default', function() {
    isServe = true;
    gulp.start('dev');
});

gulp.task('dev', ['clean'], function() {
    init('dev');
    isServe ? gulp.start('serve:dev') : gulp.start('build:dev');
});

gulp.task('serve:dev', ['watch', 'build:dev'], function() {
    var appPaths = paths.appFiles;

    startSever(
        [paths.dist, paths.app, paths.tmp],
        [appPaths.html, appPaths.css, appPaths.js, appPaths.images]
    );
});

gulp.task('prod', ['clean'], function() {
    init('prod');
    isServe ? gulp.start('serve:prod') : gulp.start('build:prod');
});

gulp.task('serve:prod', ['build:prod'], function() {
    startSever([paths.dist]);
});

gulp.task('watch', function() {
    gulp.watch(paths.appFiles.html, ['tpls:dev']);
    gulp.watch(paths.appFiles.styl, ['styles:app']);
});
