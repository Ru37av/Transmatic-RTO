// src/db/config/config.js
import dotenv from 'dotenv';

dotenv.config();

export const development = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  dialect: 'mysql',
};

export const production = {
  // production config
};

export const test = {
  // test config
};
