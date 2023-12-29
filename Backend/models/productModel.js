import mongoose from "mongoose";

export const productSchema = new mongoose.Schema({
    sku: {
        type: String,
        required: true,
    },
    quantity : {
        type: Number,
        required: true,
    },
    productName: {
        type: String,
        required: true,
    },
    images: {
        type: String,
        required: true,
    },
    productDescription: {
        type: String,
        required: true,
    },

    favourite: {
        type: Boolean,
        default: false,
    },




    }
    );


const Product = mongoose.model('product', productSchema );

export default Product;