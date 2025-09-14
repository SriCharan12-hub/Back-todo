import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    completed: {
        type: Boolean,
        default: false,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "user", // This refers to your 'user' model
        required: true,
    },
});

const Todomodel = mongoose.model("Todo", todoSchema, "TodoTasks");
export default Todomodel;