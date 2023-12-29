import express from 'express';
const router = express.Router();
import { createProduct , getAllProducts , updateProduct , deleteProduct ,getProductById , updateFavourite} from '../controllers/productController.js';


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


/* UPDATE favourite status
PUT /api/product/favourite/:id */

router.put('/favourite/:id', updateFavourite);

export default router;
