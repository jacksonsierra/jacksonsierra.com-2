import gulp from 'gulp'
import imagemin from 'gulp-imagemin'
import imageminPngquant from 'imagemin-pngquant'
import imageminMozjpeg from 'imagemin-mozjpeg'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import minifyCSS from 'gulp-csso'
import nodemon from 'gulp-nodemon'

const imgDir = 'images'
const cssDir = 'stylesheets'
const imgDestDir = 'public/images'
const cssDestDir = 'public/css'

gulp.task('images', () => (
  gulp.src(`${imgDir}/*`)
    .pipe(imagemin([
      imageminPngquant({
        speed: 1,
        quality: 50,
      }),
      imageminMozjpeg({
        quality: 50,
      }),
    ]))
    .pipe(rename({suffix: '.min'}))
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
