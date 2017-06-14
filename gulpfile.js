'use strict';

const gulp = require('gulp');
const babel = require('gulp-babel');
const plumber = require('gulp-plumber');
const sourcemaps = require('gulp-sourcemaps');
const concat = require('gulp-concat');
const livereload = require('gulp-livereload');
const runSeq = require('run-sequence');
const uglify = require('gulp-uglify');
const notify = require('gulp-notify');
const eslint = require('gulp-eslint');
const less = require('gulp-less');
const rename = require('gulp-rename');
const minifyCSS = require('gulp-minify-css');


// Development Tasks
// -------------------------------------------------------------
gulp.task('reload', function() {
    livereload.reload();
});

gulp.task('reloadCSS', function() {
    return gulp.src('./src/public/style.css').pipe(livereload());
});

gulp.task('lintJS', function() {
    return gulp.src('./src/browser/app/**/*.js')
        .pipe(plumber({
            errorHandler: notify.onError('Linting Failed! Check your gulp process.')
        }))
        .pipe(eslint())
        .pipe(eslint.format())
        .pipe(eslint.failOnError());
});

gulp.task('buildJS', ['lintJS'], function() {
    return gulp.src('./src/browser/app/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['angularjs-annotate']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/public'));
});

gulp.task('buildCSS', function() {
    const lessCompilation = less();
    lessCompilation.on('error', console.error.bind(console));
    return gulp.src('./src/browser/less/main.less')
        .pipe(plumber({
            errorHandler: notify.onError('LESS processing failed! Check your gulp process.')
        }))
        .pipe(sourcemaps.init())
        .pipe(lessCompilation)
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('./src/public'));
});

// Testing Tasks
// -------------------------------------------------------------

/**
 * TODO: Create Testing Tasks!
 */

// Production Tasks
// -------------------------------------------------------------
gulp.task('buildJSProduction', function() {
    return gulp.src('./src/browser/app/**/*.js')
        .pipe(babel({
            presets: ['es2015'],
            plugins: ['angularjs-annotate']
        }))
        .pipe(concat('main.js'))
        .pipe(uglify())
        .pipe(gulp.dest('./src/public'));
});

gulp.task('buildCSSProduction', function() {
    return gulp.src('./src/browser/less/main.less')
        .pipe(less())
        .pipe(rename('style.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('./src/public'));
});

// Composed Tasks
// -------------------------------------------------------------
gulp.task('build', function() {
    if (process.env.NODE_ENV === 'production') {
        runSeq(['buildJSProduction', 'buildCSSProduction']);
    } else {
        runSeq(['buildJS', 'buildCSS']);
    }
});

// Gulp's executable task
gulp.task('default', function() {

    gulp.start('build');

    // Watch and LiveReload in dev
    if (process.env.NODE_ENV !== 'production') {

        // Run when anything inside src/browser/app changes
        gulp.watch('src/browser/app/**', function() {
            runSeq('buildJS', 'reload');
        });

        // Run when anything inside src/browser/less
        gulp.watch('src/browser/less/**', function() {
            runSeq('buildCSS', 'reloadCSS');
        });

        livereload.listen();
    }
});
