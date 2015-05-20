var gulp = require('gulp'),
    watch = require('gulp-watch'),
    sass = require('gulp-ruby-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    livereload = require('gulp-livereload'),
    lr = require('tiny-lr'),
    notify = require('gulp-notify'),
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    crypto = require('crypto');

// sass compilation (gulp-ruby-sass 1.0.1 and gulp-sourcemaps 1.5.1)
gulp.task('sass', function() {
    //store if we're requesting maps
    var useMaps = util.env.maps ? true : false
    // uncomment compressed style for production
    // easier in development to leave uncompressed
    return sass('scss/main.scss', {
        //style: 'compressed',
        sourcemap: useMaps,
        // Use the md5 of the current directory as
        // the container name so we never collide with
        // another environment on the same vps
        container: crypto.createHash('md5').update(__dirname).digest('hex')
    }).on('error', notify.onError({
        title: "You dun goofed.",
        message: "<%= error.message %> and the consequences, will never be the same!"
    }))
    .pipe(gulpif(useMaps, sourcemaps.write('maps', {
      includeContent: false,
      sourceRoot: 'scss'
    })))
    .pipe(gulp.dest('css'));
});

// default task does all the things
gulp.task('default', ['sass']);

// watch for sass/js changes and run appropriate tasks
gulp.task('watch', function () {
    livereload.listen();
    gulp.watch('scss/**/*.scss', ['sass']);

    gulp.watch(['css/*.css']).on('change', function(file){
       livereload.changed(file.path);
    });
});
