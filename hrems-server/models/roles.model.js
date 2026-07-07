import mongoose, { model } from "mongoose";
import { CURRENT_STATUS } from "../constants/status.constant.js";

const roleSchema = new mongoose.Schema(
    {
        roleId: {
            type: String,
            unique: true
        },
        label: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        value: {
            type: String,
            required: true,
            unique: true,
            trim: true
        },
        roleHead: {
            type: String,
            required: true,
            trim: true
        },
        roleDescription: {
            type: String,
            required: true,
            trim: true
        },
        status: {
            type: String,
            enum: Object.values(CURRENT_STATUS),
            default: CURRENT_STATUS.ACTIVE
        },
        isActive: {
            type: Boolean,
            default: true,
        },
    },
    {
        timestamps: true
    }
);

export default mongoose.model('Employee_Role', roleSchema);