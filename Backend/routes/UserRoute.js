import express from "express";
import { registerUser, loginUser, getUsers } from "../controller/UserController.js";
import { AddProduct, DeleteProduct, EditProduct, getProductById, getProducts, uploadProductImages } from "../controller/ProductController.js";
import multer from "multer";

const router = express.Router();
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, "uploads/"); // Images will be stored in the "uploads" folder
    },
    filename: (req, file, cb) => {
      cb(null, Date.now() + "-" + file.originalname); // Unique filename
    }
  });
  
  const upload = multer({ storage });

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/getProducts", getProducts)
router.put("/editProduct/:id", EditProduct)
router.post("/addProduct",uploadProductImages, AddProduct)
router.delete("/deleteProduct/:id", DeleteProduct)
router.get("/getProductById/:id", getProductById)

export default router;