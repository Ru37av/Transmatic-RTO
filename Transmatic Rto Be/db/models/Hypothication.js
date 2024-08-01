// src/db/models/User.js
import {DataTypes} from 'sequelize';

export const defineUserModel = (sequelize, models) => {
    const Hypothication = sequelize.define('Hypothication', {
        vehicleNo: {
            type: DataTypes.STRING,
            primaryKey: true,
            unique: true
        },
        chassisNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        fuelType: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        engineNo: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
        },
        hypothicationCompany: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        address: {
            type: DataTypes.STRING,
            allowNull: false
        },
        ownerName: {
            type: DataTypes.STRING,
            allowNull: true
        },
        ownerSerialNo: {
            type: DataTypes.STRING,
            allowNull: true,
            unique: true
        },
        registrationDate: {
            type: DataTypes.DATE,
            allowNull: true
        },
        registrationValidity: {
            type: DataTypes.DATE,
            allowNull: true
        }
    });

    models['Hypothication'] = Hypothication;
}

export default defineUserModel;
