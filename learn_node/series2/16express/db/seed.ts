import { Sequelize, INTEGER, STRING } from 'sequelize'
const sequelize = new Sequelize("node_test", "root", "preview", {
  host: "localhost",
  dialect: 'mysql'
})

const User = sequelize.define(
  'User',
  {
    id: {
      type: INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false
    },
    name: {
      type: STRING(50),
      allowNull: false
    },
    age: {
      type: INTEGER,
      allowNull: false
    },
  },
  {
    tableName: 'users',
    timestamps: false
  }
)
export {User}
