// src/app.js
import express from 'express';
import userRoutes from './routes/userRoutes.js';
import {sequelize} from './db/index.js';
import licensesRoutes from "./routes/licensesRoutes.js";
import cookieParser from 'cookie-parser';
import cors from 'cors';


const app = express();
app.use(cookieParser());
app.use(cors({
    origin: "http://localhost:3000",
    credentials: true
}))
app.use(express.json());

// Define routes
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/licenses', licensesRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});



