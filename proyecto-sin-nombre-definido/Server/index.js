const server = require('./src/server')
const { sequelize } = require('./src/db')

const port = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
  server.listen(port, () => {
    console.log(`Server listening at ${port}`); // eslint-disable-line no-console
  });
});