
import express from 'express';
const router = express.Router();
// import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { createProduct , getAllProducts , updateProduct , deleteProduct} from '../controllers/productController.js';


// GET all products
router.get('/', getAllProducts);

//UPDATE a product
router.put('/:id', updateProduct);

//DELETE a product
router.delete('/:id', deleteProduct);

export default router;
