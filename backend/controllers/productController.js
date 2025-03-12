import { v2 as cloudinary } from "cloudinary";
import productModel from "../models/productModel.js";

// function for add product
const addProduct = async (req, res) => {
    try {
        const { name, description, price, category, subCategory, bestseller, sizes } = req.body;


        // Handle file uploads
        const image1 = req.files.image1 && req.files.image1[0];
        const image2 = req.files.image2 && req.files.image2[0];
        const image3 = req.files.image3 && req.files.image3[0];
        const image4 = req.files.image4 && req.files.image4[0];

        // Filter out undefined files and prepare the images
        const images = [image1, image2, image3, image4].filter(item => item !== undefined);

        // Upload images to Cloudinary and get the secure URLs
        let imageUrl = await Promise.all(
            images.map(async (item) => {
                const result = await cloudinary.uploader.upload(item.path, { resource_type: 'image' });
                return result.secure_url;
            })
        );

        

        // Create the product data object
        const productData = {
            name,
            description,
            price: Number(price), // Ensure the price is a number
            category,
            subCategory,
            bestseller: bestseller === "true", // Convert bestseller to a boolean
            sizes: JSON.parse(sizes), // Parse the sizes field
            images: imageUrl, // Save image URLs
            date: Date.now() // Save the current date
        };

        // Log the product data for debugging
        console.log(productData);

        // Create a new product instance and save it to the database
        const product = new productModel(productData);
        await product.save();

        const savedProduct = await productModel.findOne({ name: name });
        console.log("Fetched from DB:", savedProduct);
        

        // Send a success response
        res.json({ success: true, message: "Product added successfully" });
    } catch (error) {
        // Handle errors and send an error response
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

// function for list product
const listProducts = async (req, res) => {

    try {
        const products = await productModel.find({});
        res.json({success : true,products});
    } catch (error) {
        res.json({success : false, message : error.message});
    }
}

// function for remove product
const removeProduct = async (req, res) => {
    try {
        await productModel.findByIdAndDelete(req.body.id)
        res.json({success : true , message : "Product removed"})
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message});
    }
}

// function for single product info
const singleProduct = async (req, res) => {
    try {
        const {productId} =req.body
        const product = await productModel.findById(productId);
        res.json({success : true , product});
        
    } catch (error) {
        console.log(error)
        res.json({success : false, message : error.message});
    }
}

export { listProducts, addProduct, removeProduct, singleProduct };
