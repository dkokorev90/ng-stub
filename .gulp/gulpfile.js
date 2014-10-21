var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var es = require('event-stream');
var map = require('map-stream');
var paths = require('./paths.js');
var isProd, ENV;

// Set ENV variable and execute info function
function init(env) {
    isProd = env === 'prod';
    ENV = isProd ? 'production' : 'development';
    info();
}

// Info to screen
function info() {
    var glog = $.util.log;
    var colors = $.util.colors;

    glog(colors.green('--------------------------------'));
    glog(colors.green('========> ENV:', colors.yellow(ENV)));
    glog(colors.green('--------------------------------'));
}

// Clean 'dist' and '.tmp' directories before start
gulp.task('clean', function() {
    return gulp.src([paths.dist, paths.tmp], { read: false })
        .pipe($.rimraf({ force: true }));
});

// Concat, minimize libs and app css files and append content hash to filename
gulp.task('styles', function() {
    return es.merge(
        gulp.src(paths.libsFiles.css)
            .pipe($.if (isProd, $.minifyCss()))
            .pipe($.concat('libs.css'))
            .pipe($.if (isProd, $.rev()))
            .pipe(gulp.dest(paths.dist)),
        gulp.src(gulp.src(paths.appFiles.styl))
            .pipe(stylus())
            .pipe($.if (isProd, $.minifyCss()))
            .pipe($.minifyCss())
            .pipe($.concat('app.css'))
            .pipe($.if (isProd, $.rev()))
            .pipe(gulp.dest(paths.dist))
    );
});

// Concat, minify all js files (templates file also) and append content hash to filename
gulp.task('js', ['tpl'], function() {
    return es.merge(
        gulp.src(paths.libsFiles.js)
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('libs.js'))
            .pipe($.if (isProd, $.rev()))
            .pipe(gulp.dest(paths.dist)),
        gulp.src(paths.appFiles.js.concat(paths.tmp + '/*.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('app.js'))
            .pipe($.if (isProd, $.rev()))
            .pipe(gulp.dest(paths.dist))
    );
});

// Preload HTML templates from 'dist/tpl' to the $templateCache
gulp.task('tpl', ['tpl:html'], function() {
    return gulp.src(paths.distTpl + '/*.html')
        .pipe($.angularTemplatecache('tpl.js', { module: 'app.tpl', root: paths.dist + '/tpl/', standalone: true }))
        .pipe(gulp.dest(paths.tmp));
});

// Minify HTML templates and transfer to the 'dist/tpl'
gulp.task('tpl:html', function() {
    return gulp.src(paths.app + '/**/*.html')
        .pipe($.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            comments: true
        }))
        .pipe($.flatten())
        .pipe(gulp.dest(paths.distTpl));
});

// Transfer images to 'dist/images' folder
gulp.task('images', function() {
    return gulp.src(paths.appFiles.images)
        .pipe(gulp.dest(paths.dist));
});

// Transfer fonts to 'dist/font' folder
gulp.task('fonts', function() {
    return gulp.src(paths.appFiles.fonts)
        .pipe(gulp.dest(paths.dist));
});

// Task for production mode. Inject all js and css files to index.html
gulp.task('build', ['js', 'styl', 'images', 'fonts'], function() {
    return gulp.src(paths.app + '/index.html')
        .pipe($.inject(gulp.src([paths.dist + '/libs*.{js,css}', paths.dist + '/app*.{js,css}'], { read: false }), {
            starttag: '<!--inject:{{ext}}-->',
            endtag: '<!--endinject-->',
            addRootSlash: false,
            ignorePath: paths.dist
        }))
        .pipe($.if (isProd, $.minifyHtml({
            empty: true,
            spare: true,
            quotes: true,
            conditionals: true
        })))
        .pipe(gulp.dest(paths.dist));
});

// Default task
gulp.task('default', ['watch'], function() {
    gulp.start('dev');
});

// Development rebuild
gulp.task('dev', ['clean'], function() {
    init('dev');
    gulp.start('build');
});

// Production rebuild
gulp.task('prod', ['clean'], function() {
    init('prod');
    gulp.start('build');
});

// Start browser-sync
gulp.task('bs:start', function() {
    browserSync({
        server: {
            baseDir: paths.dist
        },
        open: false
    });
});

// Watch task
gulp.task('watch', ['bs:start'], function() {
    gulp.watch(paths.app + '/**/*.{js,styl,html}', ['build', browserSync.reload]);
});
