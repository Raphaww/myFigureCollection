var gulp = require('gulp'),
    gutil = require('gulp-util'),
    sass = require('gulp-ruby-sass'),
    notify = require("gulp-notify"),
    rename = require("gulp-rename"),
    bower = require('gulp-bower'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    //reactify = require('reactify'),
    babelify = require('babelify'),
    watchify = require('watchify'),
    glob = require('glob'),
    es = require('event-stream');

var config = {
    sassPath: './resources/sass',
    reactPath: './resources/scripts/react',
    bowerDir: './bower_components'
};

function buildReactScripts(watch, done){
   var options = {
      debug: true,
      transform: [babelify]//reactify
   };

   var createBundle = function(bundler, file){
      return bundler.bundle()
         .on('error', swallowError)
         .pipe(source(file))
         .pipe(rename({ extname: '.bundle.js', dirname: ''}))
         .pipe(gulp.dest('./public/javascripts'));
   };

   var build = function(){
      glob('./resources/scripts/react/main-**.js', function(err, files){
         if(err) done(err);
         var tasks = files.map(function(file){
            options.entries = [file];
            var bundler = (watch ? watchify(browserify(options)): browserify(options));
            (function(bundler, file){
               bundler.on('update', function() {
                  createBundle(bundler, file);
                  gutil.log('Rebundle...');
               });
            })(bundler, file);
            return createBundle(bundler, file);
         });
         es.merge(tasks).on('end', done);
      });
   };
   // listen for an update and run rebundle

   return build();
}

function swallowError (error) {
   var args = Array.prototype.slice.call(arguments);
   notify.onError({
     title: 'Compile Error',
     message: '<%= error.message %>'
   }).apply(this, args);
   this.emit('end'); // Keep gulp from hanging on this task
}

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
//angular
gulp.task('ng-core', function(){
	return gulp.src(config.bowerDir + '/angular/angular*.js')
		.pipe(gulp.dest('./public/javascripts'));
});

gulp.task('customjs', function(){
	return gulp.src('./resources/scripts/**.*')
		.pipe(gulp.dest('./public/javascripts'));
});
//react
gulp.task('react-core', function(){
	return gulp.src(config.bowerDir + '/react/react*.js')
		.pipe(gulp.dest('./public/javascripts'));
});
gulp.task('react-customs', function(done){
   buildReactScripts(false, done);
});
// Rerun the task when a file changes
gulp.task('watch', function(done) {
    gulp.watch(config.sassPath + '/**/*.scss', ['css']);
    buildReactScripts(true, done);
});

gulp.task('angular', ['ng-core', 'ng-file-upload']);

gulp.task('react', ['react-core','react-customs']);

gulp.task('javascript',['react']);

gulp.task('default', ['bower', 'css', 'icons', 'javascript', 'watch']);
