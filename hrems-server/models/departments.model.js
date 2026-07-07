import mongoose, { model } from "mongoose";
import { CURRENT_STATUS } from "../constants/status.constant.js";

const departmentSchema = new mongoose.Schema(
    {
        departmentId: {
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
        departmentHead: {
            type: String,
            required: true,
            trim: true
        },
        departmentDescription: {
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

export default mongoose.model('Employee_Department', departmentSchema);