import cron from "node-cron";
import Product from "./models/ProductModel.js";

const updateProductQuantity = async () => {
    try {
        const products = await Product.find();
        for (const product of products) {
            if (typeof product.quantity !== "number" || isNaN(product.quantity)) {
                product.quantity = 1; 
            } else {
                product.quantity += 1;
            }
            await product.save();
        }
        console.log("Product quantities updated successfully!");
    } catch (error) {
        console.error("Error updating product quantity:", error);
    }
};
cron.schedule('*/2 * * * *', async () => {
    console.log("cron updated successfully!!!!!!");
    await updateProductQuantity();
})