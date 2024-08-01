// src/db/models/User.js
import {DataTypes} from 'sequelize';

export const defineLicenseModel = (sequelize, models) => {
    const License = sequelize.define('License', {
        licenseNo: {
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
        middleName: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        city: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        town: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        aadharNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        expiryDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        gender: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        approved: {
            type: DataTypes.BOOLEAN,
            allowNull: true
        },
        licenseType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        aadharUrl: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });

    models['License'] = License;
}

export default defineLicenseModel;
