var gulp = require("gulp");
var uglify = require("gulp-uglify");
var typescript = require("gulp-typescript");
var sourcemaps = require("gulp-sourcemaps");
var merge2 = require("merge2");
var concat = require("gulp-concat");
var rename = require("gulp-rename");
var cleants = require('gulp-clean-ts-extends');
var changed = require('gulp-changed');
var runSequence = require('run-sequence');
var replace = require("gulp-replace");
var config = require("./config.json");
var extendsSearchRegex = /var\s__extends[\s\S]+?\};/g;
var addModuleExports = require("./gulp-addModuleExports");
/*
Compiles all typescript files and creating a declaration file.
*/
gulp.task('default', ['typescript-compile'], function () {
    return merge2(
        gulp.src(config.core.files)
        )
        .pipe(concat(config.build.filename))
        .pipe(cleants())
        .pipe(replace(extendsSearchRegex, ""))
        .pipe(addModuleExports("Kurve"))
        .pipe(gulp.dest(config.build.outputDirectory))
        .pipe(rename(config.build.minFilename))
        .pipe(uglify())
        .pipe(gulp.dest(config.build.outputDirectory));

});


gulp.task('typescript-sourcemaps', ['move-html'], function () {
    var tsResult = gulp.src(config.core.typescript)
        .pipe(sourcemaps.init()) // sourcemaps init. currently redundant directory def, waiting for this - https://github.com/floridoo/gulp-sourcemaps/issues/111 
        .pipe(typescript({
            noExternalResolve: true,
            target: 'ES5',
            declarationFiles: true,
            typescript: require('typescript')
        }));
    return tsResult.js
        .pipe(sourcemaps.write("./")) // sourcemaps are written. 
        .pipe(gulp.dest(config.build.srcOutputDirectory));

});

gulp.task('typescript-compile', ["typescript-sourcemaps"], function () {
    var tsResult = gulp.src(config.core.typescript)
        .pipe(typescript({
            noExternalResolve: true,
            target: 'ES5',
            declarationFiles: true,
            typescript: require('typescript')
        }));
    return merge2([
        tsResult.dts
            .pipe(concat(config.build.declarationFilename))
            .pipe(gulp.dest(config.build.outputDirectory)),
        tsResult.js
            .pipe(gulp.dest(config.build.srcOutputDirectory))
    ]);
});

gulp.task('app-compile', ["typescript-compile"], function () {
    return gulp
        .src(['app.ts', 'dist/kurve.d.ts'], { base: '.' })
        .pipe(typescript({
            noExternalResolve: true,
            target: 'ES5',
            out: 'app.js',
            typescript: require('typescript')
        }))
        .pipe(gulp.dest('./'));
});

/**
 * Watch task, will call the default task if a js file is updated.
 */
gulp.task('watch', function () {
    gulp.watch(config.core.typescript, ['default']);
});

gulp.task('move-html', function () {
    var result = gulp.src(['login.html'])
        .pipe(gulp.dest('./dist'));
    return result;
});


