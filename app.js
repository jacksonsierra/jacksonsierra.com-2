/* global  */
import express from 'express'
import path from 'path'
import { fileURLToPath } from 'url'
import favicon from 'serve-favicon'
import logger from 'morgan'
import rfs from 'rotating-file-stream'
import compression from 'compression'
import helmet from 'helmet'
import rateLimit from 'express-rate-limit'
import about from './routes/about.js'
import apps from './routes/apps.js'
import home from './routes/home.js'
import {dailyFilenameGenerator} from './utils/logger.js'

const app = express()
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(compression())
app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.min.ico')))
app.use(express.static(path.join(__dirname, 'public')))

app.locals.basedir = path.join(__dirname, 'views')

if (app.get('env') === 'production') {
  const stream = rfs.createStream(dailyFilenameGenerator, {
    interval: '1d',
    path: path.join(__dirname, 'log'),
  })
  app.use(logger('combined', {stream}))

  const rateLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 20,
  })
  app.use(rateLimiter)
} else {
  app.use(logger('dev'))
}

app.use(helmet.contentSecurityPolicy({
  directives: {
    'script-src': [
      '\'self\'',
      'maxcdn.bootstrapcdn.com',
      'fonts.googleapis.com',
      'ajax.googleapis.com',
      'googletagmanager.com',
    ],
  },
}))

app.use('/', home)
app.use('/about', about)
app.use('/apps', apps)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

export default app
