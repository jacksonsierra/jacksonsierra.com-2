import gulp from 'gulp'
import newer from 'gulp-newer'
import imagemin from 'gulp-imagemin'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import minifyCSS from 'gulp-csso'
import nodemon from 'gulp-nodemon'

const imgDestDir = 'public/images'
const cssDestDir = 'public/css'
const cssDir = 'stylesheets'

gulp.task('images', () => (
  gulp.src(`${imgDestDir}/*'`)
    .pipe(newer(imgDestDir))
    .pipe(imagemin({optimizationLevel: 5}))
    .pipe(rename((path) => {
      path.basename += '.min'
    }))
    .pipe(gulp.dest(imgDestDir))
))

gulp.task('css', () => (
  gulp.src(`${cssDir}/*.css`)
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDestDir))
))

gulp.task('run', ['css'])

gulp.task('watch', () => {
  gulp.watch(`${cssDir}/**/*`, ['css'])
})

gulp.task('serve', ['watch'], () => (
  nodemon({
    script: 'bin/www',
    exec: './node_modules/.bin/babel-node --presets es2015,stage-0',
  })
    .on('restart', () => {
      console.log('Restarted')
    })
))

gulp.task('default', ['run'])

gulp.task('dev', ['run', 'serve'])
