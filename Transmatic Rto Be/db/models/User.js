// src/db/models/User.js
import {DataTypes} from 'sequelize';

export const defineUserModel = (sequelize, models) => {
    const User = sequelize.define('User', {
        email: {
            type: DataTypes.STRING,
            primaryKey: true
        },
        lastName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        firstName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        phoneNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        type: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });

    models['User'] = User;
}

export default defineUserModel;
