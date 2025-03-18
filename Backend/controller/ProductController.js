import Product from "../models/ProductModel.js";
import multer from "multer";
import path from "path";
import fs from "fs";

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//       cb(null, "uploads/"); // Ensure this folder exists
//     },
//     filename: function (req, file, cb) {
//       cb(null, Date.now() + "-" + file.originalname);
//     },
//   });

// const upload = multer({storage})

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();

        // ✅ Convert relative paths to full URLs
        const updatedProducts = products.map((product) => ({
            ...product._doc, // Preserve existing fields
            image: product.image ? `${req.protocol}://${req.get("host")}${product.image}` : null,
        }));

        res.status(200).json(updatedProducts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const EditProduct = async (req,res)=> {
    const {name,image,price,category,description,rating,multiImages} = req.body;
    try{
    const product = await Product.findById(req.params.id)
    product.name = name;
    product.image = image;
    product.price = price;
    product.category = category;
    product.description = description;
    product.rating = rating;
    product.multiImages = multiImages;
    await product.save();
    res.status(200).json(product);

    }catch(error){
        console.log(error);
        
    }
}

export const DeleteProduct = async (req,res)=> {
    try{
        const product = await Product.findByIdAndDelete(req.params.id);
        res.status(200).json(product);        
    }catch(error){
        console.log(error);
    }
}


const uploadDir = "uploads/";
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure Multer storage
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}-${file.originalname}`);
    },
});

const upload = multer({ storage });

// 🛠 Route Handler: Add Product
export const AddProduct = async (req, res) => {
    try {
        console.log("🔵 Incoming Request Data:", req.body);
        console.log("🟢 Uploaded Files:", req.files);

        const { name, price, category, description, rating } = req.body;

        // ✅ Get single image (if uploaded)
        const image = req.files?.image ? `/uploads/${req.files.image[0].filename}` : null;

        // ✅ Get multiple images (if uploaded)
        const multiImages = req.files?.multiImages
            ? req.files.multiImages.map((file) => `/uploads/${file.filename}`)
            : [];

        // 🚨 Validate required fields
        // if (!name || !price || !category ) {
        //     return res.status(400).json({ error: "Missing required fields" });
        // }

        // ✅ Create new product
        const product = await Product.create({
            name,
            image,
            price,
            category
        });

        console.log("✅ Product Created Successfully:", product);
        res.status(201).json(product);
    } catch (error) {
        console.error("❌ Error in AddProduct:", error);
        res.status(500).json({ error: "Server error while adding product" });
    }
};

// Middleware to handle file uploads
export const uploadProductImages = upload.fields([
    { name: "image", maxCount: 1 },
    { name: "multiImages", maxCount: 5 }, // Adjust max count as needed
]);
