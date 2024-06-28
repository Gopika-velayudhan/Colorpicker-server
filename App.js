import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import route from './route/useroute.js';

dotenv.config();

mongoose
    .connect(process.env.MONGO)
    .then(() => {
        console.log('Connected to MongoDB');
    })
    .catch((err) => {
        console.log(err);
    });

const app = express();
app.use(express.json());
app.use(cors());
app.use(bodyParser.json());

const port = 3000;

app.use("/user", route);

app.use((err, req, res, next) => {
    const statuscode = err.statuscode || 500;
    const message = err.message || "Internal server error";
    return res.status(statuscode).json({
        success: false,
        statuscode,
        message
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
