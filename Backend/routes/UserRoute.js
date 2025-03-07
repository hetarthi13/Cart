import express from "express";
import { registerUser, loginUser, getUsers } from "../controller/UserController.js";
import { AddProduct, DeleteProduct, EditProduct, getProducts } from "../controller/ProductController.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/users", getUsers);
router.get("/getProducts", getProducts)
router.put("/editProduct/:id", EditProduct)
router.post("/addProduct", AddProduct)
router.delete("/deleteProduct/:id", DeleteProduct)

export default router;