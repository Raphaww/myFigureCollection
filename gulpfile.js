var gulp = require('gulp'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    bower = require('gulp-bower');

var config = {
    sassPath: './resources/sass',
    bowerDir: './bower_components'
};

gulp.task('bower', function() {
    return bower()
        .pipe(gulp.dest(config.bowerDir));
});

//copia las carpetas de iconos al directorio público
gulp.task('icons', function() {
    return gulp.src(config.bowerDir + '/bootstrap-sass-official/assets/fonts/*/**.*')
        .pipe(gulp.dest('./public/fonts'));
});


gulp.task('css', function() {
	return sass(config.sassPath + '/',
		{
			style:'compressed',
			loadPath:['./resources/sass', config.bowerDir + '/bootstrap-sass-official/assets/stylesheets']
		})
	.on('error', notify.onError(function(error){return 'Error: ' + error.message}))
	.pipe(gulp.dest('./public/stylesheets'));
});

gulp.task('ng-file-upload', function(){
	return gulp.src(config.bowerDir + '/ng-file-upload/ng-file-upload.js')
		.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('ng-core', function(){
	return gulp.src(config.bowerDir + '/angular/angular*.js')
		.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('customjs', function(){
	return gulp.src('./resources/scripts/**.*')
		.pipe(gulp.dest('./public/javascripts'))
});

// Rerun the task when a file changes
gulp.task('watch', function() {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
});

gulp.task('angular', ['ng-core', 'ng-file-upload']);

gulp.task('javascript',['angular', 'customjs']);

gulp.task('default', ['bower', 'css', 'icons', 'javascript']);