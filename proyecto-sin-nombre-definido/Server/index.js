const server = require('./src/server')
const { sequelize } = require('./src/db')

server.listen(3001, () => {
  sequelize.sync()
  console.log('Server is running on port 3001');
})