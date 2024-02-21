import gulp from 'gulp'
import * as dotenv from 'dotenv'
import cleanCSS from 'gulp-clean-css';
import Uglify from 'gulp-uglify-es'
const uglify = Uglify.default
console.log('uglify', uglify)
dotenv.config()

gulp.task('minify-mjs', function() {
    return gulp.src("component/**/*.mjs")
        .pipe(uglify())
        .pipe(gulp.dest("../build/component"));
});

gulp.task('minify-css', () => {
    return gulp.src('component/**/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('../build/component'));
});

gulp.task('minify-css_this', () => {
    return gulp.src('this/**/*.css')
        .pipe(cleanCSS({debug: true}, (details) => {
            console.log(`${details.name}: ${details.stats.originalSize}`);
            console.log(`${details.name}: ${details.stats.minifiedSize}`);
        }))
        .pipe(gulp.dest('../build/this'));
});

gulp.task('copy-html', function() {
    return gulp.src('./src/index.html')
        .pipe(gulp.dest('./dist/', {overwrite:true}));
});

gulp.task('copy-docs', function() {
    return gulp.src('./src/docs/**')
        .pipe(gulp.dest('./dist', {overwrite:true}));
});

gulp.task('watch',  () => {
    gulp.watch([
        './src/index.template',
        `./src/docs/**`], gulp.series('copy-docs' ))
});

gulp.task('run', gulp.series('copy-docs', 'watch'))