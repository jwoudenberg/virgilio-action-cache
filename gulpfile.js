var gulp = require('gulp');
var mocha = require('gulp-mocha');
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
