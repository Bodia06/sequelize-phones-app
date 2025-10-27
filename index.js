const http = require('http')
const app = require('./app')

const httpServer = http.createServer(app)

const PORT = process.env.PORT || 5001
const HOST = process.env.HOST || 'localhost'

httpServer.listen(PORT, HOST, () => {
  console.log(`Server is running on http://${HOST}:${PORT}`)
})
