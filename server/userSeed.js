import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import connectDB from "./config/mongodb.js";
import userModel from "./models/userModel.js";
import 'dotenv/config';

const userRegister = async () => {
  try {
    //connect to database
    await connectDB();

    //check if admin already exists
    const existingAdmin = await userModel.findOne({ email: "admin@gmail.com" });
    if (existingAdmin) {
      console.log(" Admin user already exists!");
      return;
    }

    //hash password
    const hashedPassword = await bcrypt.hash("admin123", 10);

    //create new admin user
    const newUser = new userModel({
      name: "Admin",
      email: "admin@gmail.com",
      password: hashedPassword,
      role: "admin",
      isAccountVerified: true, 
    });

    await newUser.save();
    console.log("Admin user created successfully!");
  } catch (error) {
    console.error("Error creating admin:", error.message);
  } finally {
    mongoose.connection.close(); 
};
}
userRegister();
