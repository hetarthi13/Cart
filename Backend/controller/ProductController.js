import Product from "../models/ProductModel.js";

export const getProducts = async (req, res) => {
    try {
        const products = await Product.find();
        res.status(200).json(products);
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

export const AddProduct  = async (req,res)=> {
    const {name,image,price,category,description,rating,multiImages} = req.body;
    try{
        const product = await Product.create({name,image,price,category,description,rating,multiImages});
        res.status(200).json(product);
    }catch(error){
        console.log(error);
    }
}

