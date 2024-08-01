// src/db/index.js
import {Sequelize} from 'sequelize';
import * as config from './config/config.js';
import defineUserModel from './models/User.js';
import defineLicenseModel from "./models/License.js";

const sequelize = new Sequelize(
    process.env.NODE_ENV === 'production' ? config.production : config.development
);

const models = {};

const modelDefiners = [
    defineUserModel,
    defineLicenseModel
];

// Define models
for (const modelDefiner of modelDefiners) {
    modelDefiner(sequelize, models);
}

// Apply associations
Object.values(models)
    .filter((model) => typeof model.associate === 'function')
    .forEach((model) => model.associate(models));

export {sequelize};
export default models;
