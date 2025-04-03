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

        const UserId = await User.findById(userId);
console.log(UserId,"UserId");

        // if (!productId || !Customer) {
        //     return res.status(400).json({ message: 'Product ID and Customer ID are required.' });
        // }
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
        // if (cartItem.quantity < 1) {
        //     cartItem.quantity = 1;
        // }

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
    try {
        const { productId, userId, quantity = 1 } = req.body;

        if (!productId || !userId) {
            return res.status(400).json({ message: 'Product ID and Customer ID are required.' });
        }

        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: 'User not found.' });
        }

        const cartItem = await Cart.findOne({ where: { productId, userId } });
console.log(cartItem,"cartItem");

        // if (!cartItem) {
        //     return res.status(404).json({ message: 'Item not found in cart.' });
        // }

        if (cartItem.quantity <= quantity) {
            // Remove the item completely if the quantity to remove is equal to or more than the current quantity
            await Cart.deleteOne({ _id: cartItem._id });
            return res.status(200).json({ message: 'Item removed from cart successfully.' });
        } else {
            cartItem.quantity -= quantity;
            await cartItem.save();
            return res.status(200).json({
                message: 'Item quantity reduced successfully.',
                cartItem
            });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};


