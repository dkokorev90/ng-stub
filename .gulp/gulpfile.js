var gulp = require('gulp');
var $ = require('gulp-load-plugins')();
var browserSync = require('browser-sync');
var es = require('event-stream');
var map = require('map-stream');
var paths = require('./paths.js');


// Clean 'dist' and '.tmp' directories before start
gulp.task('clean', function() {
    return gulp.src([paths.dist, paths.tmp], { read: false })
        .pipe($.rimraf({ force: true }));
});

// Concat, minimize libs and app css files and append content hash to filename
gulp.task('css', function() {
    return gulp.src(paths.libsFiles.css)
        .pipe($.minifyCss())
        .pipe($.concat('libs.css'))
        .pipe($.rev())
        .pipe(gulp.dest(paths.dist))
        .pipe(gulp.src(paths.appFiles.css))
        .pipe($.minifyCss())
        .pipe($.concat('app.css'))
        .pipe($.rev())
        .pipe(gulp.dest(paths.dist));
});

// Concat, minify all js files (templates file also) and append content hash to filename
gulp.task('js', ['config', 'tpl'], function() {
    return es.merge(
        gulp.src(paths.libsFiles.js)
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('libs.js'))
            .pipe($.rev())
            .pipe(gulp.dest(paths.dist)),
        gulp.src(paths.appFiles.js.concat(paths.appFiles.excludedJs, paths.tmp + '/*.js'))
            .pipe($.ngAnnotate())
            .pipe($.uglify())
            .pipe($.concat('app.js'))
            .pipe($.rev())
            .pipe(gulp.dest(paths.dist))
    );
});

