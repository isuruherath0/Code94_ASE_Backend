import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from "url";
import dotenv from "dotenv";
import productRoute from './routes/productRoute.js';
import { createProduct } from './controllers/productController.js';
import multer from 'multer';
import helmet from "helmet";
import morgan from "morgan";

//Configurations

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet.crossOriginResourcePolicy({ policy: "same-origin" })); 
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use("/assets", express.static(path.join(__dirname, "public/assets")));


//file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/assets");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

//Routes 

//Without file upload
app.use('/api/product', productRoute );

//With file upload

/* Add a new product
POST /api/product */
app.post('/api/product', upload.single ('images'),createProduct); 

//Mongoose setup

const PORT = process.env.PORT ||3000;
mongoose.connect(process.env.MONGO_URL)
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


