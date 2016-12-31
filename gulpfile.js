var gulp = require('gulp'),
    concat = require('gulp-concat'),
    angularTemplatecache = require('gulp-angular-templatecache'),
    uglify = require('gulp-uglifyjs'),
    angularFilesort = require('gulp-angular-filesort'),
    less = require('gulp-less'),
    watch = require('gulp-watch'),
    include = require('gulp-include'),
    webserver = require('gulp-webserver'),
    vendorScripts = require('./vendorScripts');


var build = 'dist/';
gulp.task('vendorCSS', function () {
    gulp.src(['bower_components/angular-material/angular-material.css'])
        .pipe(concat('vendorStyles.css'))
        .pipe(gulp.dest(build + 'css'));
});
gulp.task('less', function () {
    return gulp.src('src/less/*.less')
        .pipe(less())
        .pipe(concat('styles.css'))
        .pipe(gulp.dest(build + 'css'));
});

gulp.task('webserver', function () {
    gulp.src(build)
        .pipe(webserver({
            livereload: true,
            open: true,
            fallback: 'index.html',
            host: '0.0.0.0'
        }));
});
// JSHint task
gulp.task('vendorscript', ['templatecache'], function () {
    return gulp
        .src(vendorScripts)
        .pipe(uglify('vendor.js', {
            outSourceMap: true,
            mangle: false,
            sourceRoot: '/'
        }))
        .pipe(gulp.dest(build + 'js'));


});
gulp.task('script', function () {
    return gulp
        .src([
            'src/js/*.js',
            'src/app/app/app.js',
            'src/app/**/*.js'
        ])
        .pipe(angularFilesort())
        .pipe(concat('bundle.js'))/*
         .pipe(uglify('bundle.js', {
         outSourceMap: true,
         mangle: false,
         sourceRoot: '/',
         compress:false
         }))*/
        .pipe(gulp.dest(build + 'js'));


});
gulp.task('html', function () {
    return gulp
        .src('src/html/index.html')
        .pipe(include())
        .pipe(gulp.dest('./' + build));
});
gulp.task('templatecache', function () {


    return gulp
        .src(['src/app/**/*.html', 'src/html/**/*.html'])
        .pipe(angularTemplatecache('templates.js', {
            module: 'App',
            root: '/',
            standAlone: false,
            transformUrl: function (url) {
                url = url.replace('src/app/', '');
                url = url.replace('/pages', '');
                return url;
            }
        }))
        .pipe(gulp.dest(build + 'js'));
});
gulp.task('images', function () {
    return gulp.src('src/img/**/*.*')
        .pipe(gulp.dest(build + 'img'));
});
gulp.task('fonts', function () {
    return gulp.src('src/fonts/**/*.*')
        .pipe(gulp.dest(build + 'fonts'));
});
gulp.watch = function (path, task) {
    gulp.src(path)
        .pipe(watch(path, function () {
            gulp.run(task);
        }));
};

gulp.task('watch', ['script'], function () {
    // Watch our scripts
    gulp.watch(['src/app/**/*.js', 'src/js/*.js'], ['script']);
    gulp.watch(['src/app/**/*.html', 'src/html/*.html'], ['templatecache']);
    gulp.watch(['src/less/**/*.less', 'src/app/**/*.less'], ['less']);
    gulp.watch(['src/html/*.html'], ['html']);
    gulp.watch(['src/img/**/*.*'], ['images']);


});

gulp.task('default', ['watch', 'vendorscript', 'vendorCSS', 'less', 'html', 'images', 'fonts', 'webserver']);
