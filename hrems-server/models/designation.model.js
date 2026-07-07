import mongoose, { model } from "mongoose";
import { CURRENT_STATUS } from "../constants/status.constant.js";

const designationSchema = new mongoose.Schema(
    {
        designationId: {
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
        designationHead: {
            type: String,
            required: true,
            trim: true
        },
        designationDescription: {
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

export default mongoose.model('Employee_Designation', designationSchema);