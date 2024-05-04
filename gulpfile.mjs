/* global console */
import gulp from 'gulp'
import imagemin, {mozjpeg, optipng} from 'gulp-imagemin'
import rename from 'gulp-rename'
import concat from 'gulp-concat'
import minifyCSS from 'gulp-csso'
import nodemon from 'gulp-nodemon'

const imgDir = 'images'
const cssDir = 'stylesheets'
const imgDestDir = 'public/images'
const cssDestDir = 'public/css'

const images = (cb) => {
  gulp.src([`${imgDir}/**.{jpg,jpeg,png,ico}`], { encoding: false })
    .pipe(imagemin([
      mozjpeg({quality: 75, progressive: true}),
	    optipng({optimizationLevel: 5}),
    ]))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(imgDestDir))
    cb()
}

const css = (cb) => {
  gulp.src(`${cssDir}/*.css`)
    .pipe(concat('styles.css'))
    .pipe(minifyCSS())
    .pipe(gulp.dest(cssDestDir))
  cb()
}

const watch = (cb) => {
  gulp.watch([`${cssDir}/**/*`], { events: 'change' }, gulp.series(css))
  cb()
}

const startServer = (cb) => {
  nodemon({
    script: 'server.js',
    ext: 'js css',
    env: {
      NODE_ENV: 'development'
    },
  })
    .on('restart', () => {
      console.log('Restarted')
    })
  cb()
}

const serve = gulp.parallel(startServer, watch)

export const build = gulp.parallel(images, css)

export const dev = gulp.series(build, serve)

export default build 
