import gulp from 'gulp'
import * as dotenv from 'dotenv'
import cleanCSS from 'gulp-clean-css';
import Uglify from 'gulp-uglify-es'
// import {series} from 'async';
import {exec} from "child_process";

const uglify = Uglify.default
console.log('uglify', uglify)
dotenv.config()

function delay(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

gulp.task('minify-mjs', function() {
    return gulp.src("src/addons/services/**/*.mjs")
        .pipe(uglify())
        .pipe(gulp.dest("./build/component"));
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

gulp.task('copy-docs', async function() {
    return gulp.src('./src/addons/**')
        .pipe(gulp.dest('./dist', {overwrite:true}));
});

gulp.task('npm:build', function () {
    return new Promise(async function(resolve, reject) {
        await exec('npm run build', (error, stdout, stderr) => {
            if (error) {
                console.error(`exec error: ${error}`);
                return;
            }
            console.log(`stdout: ${stdout}`);
            resolve()
        })
    });
})

gulp.task('watch',  () => {
    gulp.watch([`./src/addons/**/**`], gulp.series('copy-docs' ))
});

gulp.task('watch-index',  () => {
    gulp.watch(['./src/index.template'], gulp.series('npm:build' ))
});

gulp.task('run', gulp.parallel('copy-docs', 'watch', 'watch-index'))
