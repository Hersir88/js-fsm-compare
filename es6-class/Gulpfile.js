var gulp = require('gulp');
var babel = require('gulp-babel');
var concat = require('gulp-concat');

gulp.task('default', function() {
  gulp.src(['src/FSMState.js', 'src/FSM.js'])
    .pipe(babel({
      presets: ['es2015']
    }))
    .pipe(concat('fsm.js'))
    .pipe(gulp.dest('dist'));
});
