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

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'uploads')));



//file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, "public/assets/uploads/");
    },
    filename: function(req, file, cb){
        cb(null, file.originalname);
    }
});

const upload = multer({storage: storage});

//Routes 

//Without Multer
app.use('/api/product', productRoute );

//With Multer

app.post('/api/product', upload.array ('image',5),createProduct); 

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


