const { db } = require("../../config")
const Sequelize = require('sequelize');
const sequelize = new Sequelize(db.host);
class ToDo extends Sequelize.Model { }
ToDo.init({
  id: {
    type: Sequelize.INTEGER,
    autoIncrement: true,
    primaryKey: true
  },
  toDoID: {
    type: Sequelize.STRING,
    allowNull: false,
    require: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false,
    require: true
  },
  description: {
    type: Sequelize.STRING,
    require: true,
    allowNull: false
  },
  completed: {
    type: Sequelize.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  sequelize,
  modelName: 'ToDo',
  timestamps: true
});
ToDo.sync();
module.exports = ToDo;