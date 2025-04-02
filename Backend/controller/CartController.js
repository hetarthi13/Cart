// import Cart from "../models/CartModel"
import Product from "../models/ProductModel.js";
import Cart from "../models/CartModel.js";
import User from "../models/UserModel.js";

// console.log(Cart);

export const AddToCart = async (req, res) => {
    try {
    //     const customerId = localStorage.getItem("userId")
    //   console.log(  customerId,"UserData")
        const { productId, userId, quantity = 1 } = req.body;

        const Customer = await User.findById(userId);

        if (!productId || !Customer) {
            return res.status(400).json({ message: 'Product ID and Customer ID are required.' });
        }
        const products = await Product.findById(productId);
        console.log(products,"products");
        // return null
        const updatedProducts =  {
            ...products._doc,
            image: products.image ? `${req.protocol}://${req.get("host")}${products.image}` : null,
        };
        if (!updatedProducts) {
            return res.status(404).json({ message: 'Product not found.' });
        }
// return null
        let cartItem = await Cart.findOne({ where: { productId, userId} });

        if (cartItem) {

            cartItem.quantity += quantity;
            await cartItem.save();
            return res.status(200).json({
                message: 'Cart updated successfully',
                cartItem: cartItem
            });
        } else {
            cartItem = await Cart.create({
                productId,
                userId,
                quantity
            });

            return res.status(201).json({
                message: 'Product added to cart successfully',
                cartItem: cartItem
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

export const RemoveFromCart = async (req, res) => {
    try { const { productId, userId, quantity = 1 } = req.body;

        const Customer = await User.findById(userId);

        if (!productId || !Customer) {
            return res.status(400).json({ message: 'Product ID and Customer ID are required.' });
        }
        const products = await Product.findById(productId);
        console.log(products,"products");
        const updatedProducts =  {
            ...products._doc, 
            image: products.image ? `${req.protocol}://${req.get("host")}${products.image}` : null,
        };
        if (!updatedProducts) {
            return res.status(404).json({ message: 'Product not found.' });
        }
        let cartItem = await Cart.findOne({ where: { productId, userId} });

        if (cartItem) {
            cartItem.quantity -= quantity;
            await cartItem.save();
            return res.status(200).json({
                message: 'Cart updated successfully',
                cartItem: cartItem
            });
        } else {
            cartItem = await Cart.create({
                productId,
                userId,
                quantity
            });
            return res.status(201).json({
                message: 'Product removed to cart successfully',
                cartItem: cartItem
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};

