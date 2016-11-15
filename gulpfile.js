var gulp=require('gulp');
var browserSync = require('browser-sync').create();


gulp.task('styles',function() {
    return gulp.src(
        [
            'node_modules/materialize-css/dist/css/materialize.css',
        ])
    .pipe(gulp.dest("app/dist/css"))
    .pipe(browserSync.stream());
    }
)


gulp.task('scripts',function() {
    return gulp.src(
        [
            'node_modules/jquery/dist/jquery.js',
            'app/script.js',
            'node_modules/materialize-css/dist/js/materialize.js'

        ])
    .pipe(gulp.dest("app/dist/js"))
    .pipe(browserSync.stream());
    }
)

gulp.task('serve',['styles','scripts'],function(){
    browserSync.init({
        server:{
            baseDir:"./app/"
        }
    });

    gulp.watch("app/*.html").on('change', browserSync.reload);
});


gulp.task('default', ['serve']);
