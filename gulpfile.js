var gulp = require('gulp');
var mocha = require('gulp-mocha');
var jshint = require('gulp-jshint');
var istanbul = require('gulp-istanbul');
var exit = require('gulp-exit');

// Help module
require('gulp-help')(gulp);

gulp.task('test', 'Run the application tests', function () {
    // Modules used in tests must be loaded in this task
    require('must');
    gulp.src(['./examples/**/test.js'])
        .pipe(mocha({
            reporter: 'spec'
        }))
        .pipe(exit());
});

gulp.task('coverage', 'Create istanbul code coverage report form tests',
            function () {
    gulp.src(['lib/**/*.js'])
        .pipe(istanbul())
        .on('finish', function () {
            require('must');
            gulp.src(['./examples/**/test.js'])
                .pipe(mocha())
                .pipe(istanbul.writeReports())
                .pipe(exit());
        });
});

gulp.task('lint', 'Execute JSHint checks on the code', function () {
    gulp.src(['lib/**/*.js', 'examples/**/*.js'])
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'));
});
