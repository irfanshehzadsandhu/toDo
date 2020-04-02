const Sequelize = require('sequelize');
module.exports = () => {
  const sequelize = new Sequelize('postgres://postgres:123@localhost:5432/todo');
  sequelize
    .authenticate()
    .then(() => {
      console.log('Connection has been established successfully.');
    })
    .catch(err => {
      console.error('Unable to connect to the database:', err);
    });
}