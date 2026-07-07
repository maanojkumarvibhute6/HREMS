import mongoose from "mongoose";

const empCounterSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    sequence: {
        type: Number,
        default: 0
    }
});

export default mongoose.model("Counter", empCounterSchema);