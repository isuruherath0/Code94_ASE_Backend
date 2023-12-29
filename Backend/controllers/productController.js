import Product from '../models/productModel.js';
import mongoose from 'mongoose';

// Controller to get all products

export const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find();
        res.status(200).json(Products);
    } catch (err) {
        res.status(404).json({ message: err.message });
    }
}

// Controller to get a product by id 

export const getProductById = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Product Not Found');
        }
        const product = await Product.findById(id);
        res.status(200).json(product);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};


// Controller to create a new product
export const createProduct = async (req, res) => {
        try {
          const { sku, quantity , productName , images , productDescription } = req.body;
      
          console.log(req.body);
          //check if all the fields are filled
          if (!sku|| !productName || !quantity || !images || !productDescription  )
            throw new Error("Please fill all the fields ");
          //check if the Product already exists
          const foundProduct = await Product.findOne({ sku });
          //if it exists, return an error
          if (foundProduct) throw new Error("Product already exists");
      
          //if it doesn't exist, create a new Product
          const newProduct = new Product({ sku, productName ,quantity ,images ,productDescription  });
          await newProduct.save();
          const Products = await Product.find();
          res.status(200).json(
            Products.map((Product) => ({
              id: Product._id,
              sku: Product.sku,
              productName: Product.productName,
              quantity: Product.quantity,
              images: Product.images,
              productDescription: Product.productDescription,
            }))
          );
        } catch (err) {
          res.status(409).json({ message: err.message });
        }
};


 // Controller to update a product

export const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { sku, quantity , productName , images , productDescription } = req.body;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Product Not Found');
        }
        const updatedProduct = { sku, quantity , productName , images , productDescription , _id: id };
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};

//controller to update a product's favourite status

export const updateFavourite = async (req, res) => {
    try {
        const { id } = req.params;
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return res.status(404).send('Product Not Found');
        }
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).send('Product Not Found');
        }
        const updatedProduct = { favourite: !product.favourite, _id: id };
        await Product.findByIdAndUpdate(id, updatedProduct, { new: true });
        res.json(updatedProduct);
    } catch (error) {
        res.status(409).json({ message: error.message });
    }
};




// Controller to delete a product

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedProduct = await Product.findByIdAndDelete(id);
        if (!deletedProduct) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.json({ message: 'Product deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

