import express from 'express';
const router = express.Router();
import { createProduct , getAllProducts , updateProduct , deleteProduct ,getProductById} from '../controllers/productController.js';


/* GET all products
GET /api/product */

router.get('/', getAllProducts);

/* GET a product by id
GET /api/product/:id */

router.get('/:id', getProductById);

/* UPDATE a product
PUT /api/product/:id */

router.put('/:id', updateProduct);

/* DELETE a product
DELETE /api/product/:id */

router.delete('/:id', deleteProduct);

export default router;
