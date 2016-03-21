var gulp = require('gulp'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    source = require('vinyl-source-stream'),
    buffer = require('vinyl-buffer'),
    uglify = require('gulp-uglify'),
    browserSync = require('browser-sync'),
    reload = browserSync.reload,
    util = require('gulp-util'),
    gulpif = require('gulp-if'),
    fs = require('fs'),
    prompt = require('gulp-prompt'),
    needsPrompt = false,
    filename = '.vhost';

function _startBrowserSync() {
	// read vhost file here
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;

		// start a browsersync session using the data of gulp/.vhost
		browserSync({
			proxy: data
		});
	});
}

function _watchFiles() {
	gulp.watch('src/**/*.js', ['compile-js']).on('change', reload);
}

gulp.task('compile-js', function() {
	return browserify('src/index.js')
            .bundle()
            .pipe(source('toggles-switches.js'))
            .pipe(buffer())
            .pipe(babel())
            .pipe(uglify())
            .pipe(gulp.dest('dist'));
});

gulp.task('watch', function() {
	// does our vhost exist
	// check if gulp/.vhost has been created
	fs.exists(filename, function(exists) {
		if (!exists) {
			// prompt
			needsPrompt = true;
			gulp.src('gulpfile.js')
				.pipe(prompt.prompt({
					name: 'vhost',
					message: 'Please enter your vhost name'
				}, function(res) {
					fs.writeFile(filename, res.vhost);
					console.log('Virtual Host Set: ' + res.vhost);
					_startBrowserSync();
					_watchFiles();
				}));
		} else {
			_startBrowserSync();
			_watchFiles();
		}
	});
});
