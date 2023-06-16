'use strict';
import { DataTypes, Model, QueryInterface } from 'sequelize';
import Users from '../../Interfaces/User';

export default {
  async up(queryInterface: QueryInterface) {
    return queryInterface.createTable<Model<Users>>('users', {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      role: {
        type: DataTypes.STRING,
        allowNull: false,

      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    });
  },

  down(queryInterface: QueryInterface) {
    return queryInterface.dropTable('users');
  },
};
