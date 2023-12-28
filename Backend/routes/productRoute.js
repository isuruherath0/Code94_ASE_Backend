
import express from 'express';
const router = express.Router();
// import { getAllProducts, getProductById, createProduct, updateProduct, deleteProduct } from '../controllers/productController.js';
import { createProduct , getAllProducts , updateProduct , deleteProduct} from '../controllers/productController.js';


/* GET all products
GET /api/product */

router.get('/', getAllProducts);

/* UPDATE a product
PUT /api/product/:id */

router.put('/:id', updateProduct);

/* DELETE a product
DELETE /api/product/:id */

router.delete('/:id', deleteProduct);

export default router;
