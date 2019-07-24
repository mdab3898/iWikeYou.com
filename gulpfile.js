var gulp = require('gulp'),
    sass = require('gulp-sass'),
    less = require('gulp-less'),
    rename = require('gulp-rename'),
    autoprefixer = require('gulp-autoprefixer'),
    rtlcss = require('gulp-rtlcss'),
    pckg = require('./package.json');

gulp.task('styles-admin', function () {
    return gulp.src('application/modules/admin/static/less/admin.less', { base: '.' })
        .pipe(less({
            precision: 8,
            outputStyle: 'expanded'
        }).on('error', onError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename('admin.min.css'))
        .pipe(gulp.dest('application/modules/admin/static/css'))
});

gulp.task('styles-theme', function () {
    return gulp.src('content/themes/youdate/static/scss/app.scss', { base: '.' })
        .pipe(sass({
            precision: 8,
            outputStyle: 'expanded',
            includePaths: [
                'node_modules/bootstrap/scss/',
                'node_modules/tabler-ui/src/assets/scss'
            ]
        }).on('error', onError))
        .pipe(autoprefixer({
            browsers: pckg.browserslist,
            cascade: false
        }))
        .pipe(rename('app.min.css'))
        .pipe(gulp.dest('content/themes/youdate/static/css'))
});

gulp.task('watch', ['styles-admin', 'styles-theme'], function() {
    gulp.watch('application/modules/admin/static/less/**/*.less', ['styles-admin']);
    gulp.watch('content/themes/youdate/static/scss/**/*.scss', ['styles-theme']);
});

gulp.task('build', ['styles-admin', 'styles-theme']);

gulp.task('default', ['build']);

var onError = function (err) {
    console.log(err);
};
