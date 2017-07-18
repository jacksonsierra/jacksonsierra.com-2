import express from 'express'
import path from 'path'
import favicon from 'serve-favicon'
import logger from 'morgan'

import about from './routes/about'
import apps from './routes/apps'
import home from './routes/home'

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'pug')

app.use(favicon(path.join(__dirname, 'public', 'images', 'favicon.ico')))
app.use(express.static(path.join(__dirname, 'public')))
app.locals.basedir = path.join(__dirname, 'views')

if (app.get('env') === 'production') {
  app.use(logger('combined'))
} else {
  app.use(logger('dev'))
}

app.use('/', home)
app.use('/about', about)
app.use('/apps', apps)

app.use((req, res, next) => {
  const err = new Error('Not Found')
  err.status = 404
  next(err)
})

app.use((err, req, res, next) => {
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  res.status(err.status || 500)
  res.render('error')
})

export default app
