import dotenv from 'dotenv';

dotenv.config();

const dbUrl = process.env.DB_URL;

const config = {
    APP_PORT: process.env.DEV_PORT,
    DB_URL: dbUrl,
};

export default config;
