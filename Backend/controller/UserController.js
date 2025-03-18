// import User from "../models/UserModel";
import { comparePassword, hashPassword,generateToken } from "../utils/auth.js";
import User from "../models/UserModel.js";

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export const registerUser = async (req, res) => {
    try {
        const {email,name,password,role,isAdmin} = req.body
        if(!email,!name,!password){
            return res.status(400).json({message:"All fields are required"})
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }

        const hashedPassword = await hashPassword(password);
        req.body.password = hashedPassword;
        console.log(req.body);
        req.body.role = role ?? "User";
        req.body.isAdmin = isAdmin ?? false;
        
        const user = await User.create(req.body);

        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  

export const loginUser = async (req, res) => {
    try {
        console.log(req.body,"req.body");
        const { email, password } = req.body;
        console.log(email,"email" );
        const user = await User.findOne({ email });
        console.log(user,"user");
        
        // if (!user) {
        //     return res.status(404).json({ message: "User not found" });
        // }    
        console.log(user.password,"user.password");
        
        const isMatch = await comparePassword(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }
        const token = generateToken(user._id);
       
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token,
            role : user.role,
            isAdmin : user.isAdmin
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};  