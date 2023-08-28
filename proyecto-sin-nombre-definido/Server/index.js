const server = require('./src/server')

server.listen(3001, () => {
  console.log('Server is running on port 3001');
})