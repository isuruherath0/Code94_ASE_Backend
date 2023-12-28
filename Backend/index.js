import express from 'express';
import bodyParser from 'body-parser';
import { PORT } from './config.js';
import mongoose from 'mongoose';
import { MONGO_URL } from './config.js';
import productRoute from './routes/productRoute.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from "url";


const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));



mongoose.connect(MONGO_URL)
.then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server listening on port ${PORT}`);
    });
})
.catch((err) => {
    console.log('Failed to connect to MongoDB');
    console.log(err);
});


app.use('/api/product', productRoute );