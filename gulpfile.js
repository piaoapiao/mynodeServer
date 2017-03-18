var gulp = require('gulp');
gulp.task('default',function() {
	// body...
})


// var uglify = require('gulp-uglify')

// gulp.task('uglifyjs', function () {
//     gulp.src('routes/*.js')
//         .pipe(uglify())
//         .pipe(gulp.dest('public'))
// })

// gulp.task('watch',function(){
// 	gulp.watch("routes/*.js",['uglifyjs']);
// });

// var browserSync = require('browser-sync');



var gulp = require('gulp');
var nodemon = require('gulp-nodemon');

gulp.task('gulpSynModify', function() {
    nodemon({
        script: 'bin/www ',
    })
    console.log("nodemon");
});


gulp.task('watch',['gulpSynModify'],function(){
	gulp.watch("routes/*.js",['gulpSynModify']);
});


