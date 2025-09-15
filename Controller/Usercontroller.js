import usermodel from "../Model/Usermodel.js";
import todomodel from "../Model/Todomodel.js";
import jsonwebtoken from "jsonwebtoken";
import bcrypt from "bcrypt";

// User Registration
export const useradd = async (req, res) => {
  try {
    const { email, username, password } = req.body;

    if (!email || !username || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }

    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Email must end with @gmail.com" });
    }

    const emailExists = await usermodel.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ message: "Email is already registered" });
    }

    const usernameExists = await usermodel.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ message: "Username is already taken" });
    }

    const hashedpassword = await bcrypt.hash(password, 10);
    const data = new usermodel({ email, username, password: hashedpassword });
    const savedData = await data.save();

    res.status(201).json({
      message: "Registered successfully",
      result: savedData,
    });
  } catch (err) {
    console.error("Error during registration:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// User Login
export const userlogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email || !password) {
      return res.status(400).json({ message: "Fill all the details" });
    }
    if (!email.endsWith("@gmail.com")) {
      return res.status(400).json({ message: "Email must end with @gmail.com" });
    }

    const user = await usermodel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Email not registered" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Password doesn't match" });
    }

    const accesstoken = jsonwebtoken.sign({ id: user._id }, process.env.secret_key, { expiresIn: '1h' });

    res.status(200).json({
      message: "Login successfully",
      result: user,
      jwttoken: accesstoken,
    });
  } catch (err) {
    console.error("Error during login:", err);
    res.status(500).json({ message: "server error" });
  }
};

// Add a new To-Do item for the authenticated user
export const todoadd = async (req, res) => {
  try {
    const { text } = req.body;
    const userId = req.user.id; 

    if (!text) {
      return res.status(400).json({ message: "Task text is required" });
    }
    const newTodo = new todomodel({
      text,
      user: userId,
    });
    const savedTodo = await newTodo.save();
    res.status(201).json({ message: "Task added successfully", result: savedTodo });
  } catch (err) {
    console.error("Error adding todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Get all To-Do items for the authenticated user
export const todoget = async (req, res) => {
  try {
    const userId = req.user.id;
    const todos = await todomodel.find({ user: userId });
    res.status(200).json({ message: "Tasks fetched successfully", result: todos });
  } catch (err) {
    console.error("Error fetching todos:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Update a To-Do item
export const todoupdate = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;
    const { text, completed } = req.body;

    const updatedTodo = await todomodel.findOneAndUpdate(
      { _id: id, user: userId },
      { text, completed },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ message: "Task not found or user not authorized" });
    }
    res.status(200).json({ message: "Task updated successfully", result: updatedTodo });
  } catch (err) {
    console.error("Error updating todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};

// Delete a To-Do item
export const tododelete = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.id;

    const deletedTodo = await todomodel.findOneAndDelete({ _id: id, user: userId });

    if (!deletedTodo) {
      return res.status(404).json({ message: "Task not found or user not authorized" });
    }
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    console.error("Error deleting todo:", err);
    res.status(500).json({ message: "Server error" });
  }
};