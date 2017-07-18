import debug from 'debug'
import http from 'http'
import app from './app'

const port = normalizePort(process.env.PORT || '3000')
app.set('port', port)

const server = http.createServer(app)
server.listen(port)
server.on('error', onError)
server.on('listening', onListening)

/**
 * Returns port number or pipe
 * @param {string} value Port number or pipe.
 * @return {int|string|boolean} Normalized port
 */
function normalizePort(value) {
  const port = parseInt(value, 10)

  if (isNaN(port)) {
    return value
  }

  if (port >= 0) {
    return port
  }

  return false
}

/**
 * Handles error based on code and exits process
 * @param {error} error Error passed by the server.
 */
function onError(error) {
  if (error.syscall !== 'listen') {
    throw error
  }

  const bind = `${typeof port === 'string' ? 'Pipe' : 'Port'} ${port}`
  switch (error.code) {
    case 'EACCES':
      console.error(`${bind} requires elevated privileges`)
      process.exit(1)
      break
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`)
      process.exit(1)
      break
    default:
      throw error
  }
}

/**
 * Confirms server is listening
 */
function onListening() {
  const addr = server.address()
  const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`
  debug('jacksonsierra.com-2:server')(`Listening on ${bind}`)
}
