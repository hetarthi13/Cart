// // import cron from "node-cron";
// // import Product from "./models/ProductModel.js";

// // const updateProductQuantity = async () => {
// //     try {
// //         const products = await Product.find();
// //         for (const product of products) {
// //             if (typeof product.quantity !== "number" || isNaN(product.quantity)) {
// //                 product.quantity = 1; 
// //             } else {
// //                 product.quantity += 1;
// //             }
// //             await product.save();
// //         }
// //         console.log("Product quantities updated successfully!");
// //     } catch (error) {
// //         console.error("Error updating product quantity:", error);
// //     }
// // };
// // const task = cron.schedule('*/2 * * * *', async () => {
// //     console.log("Cron updated successfully!!!!!!");
// //     await updateProductQuantity();
// // });

// // setTimeout(() => {
// //     task.stop();
// //     console.log("Cron job stopped!");
// // }, 10 * 60 * 1000);

// import cron from "node-cron";
// import Product from "./models/ProductModel.js";

// // const updateProductQuantity = async () => {
// //     try {
// //         const products = await Product.find();
// //         for (const product of products) {
// //             if (typeof product.quantity !== "number" || isNaN(product.quantity)) {
// //                 product.quantity = 1; 
// //             } else {
// //                 product.quantity += 1;
// //             }
// //             await product.save();
// //         }
// //         console.log("Product quantities updated successfully!");
// //     } catch (error) {
// //         console.error("Error updating product quantity:", error);
// //     }
// // };

// // // Schedule the cron job every 2 minutes
// const task = cron.schedule('*/2 * * * *', async () => {
//     console.log("Cron updated successfully!!!!!!");
//     // await updateProductQuantity();
// });

// // Stop the cron job after 10 minutes
// setTimeout(() => {
//     task.stop();
//     console.log("Cron job stopped!");
// }, 10 * 60 * 1000);
