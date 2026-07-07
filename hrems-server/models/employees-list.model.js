import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

import { ROLES } from '../constants/roles.constant.js';
import { CURRENT_STATUS } from '../constants/status.constant.js';

const employeeDetailsSchema = new mongoose.Schema(
    {
        employeeId: {
            type: String,
            unique: true
        },
        firstName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        lastName: {
            type: String,
            required: true,
            trim: true,
            lowercase: true
        },
        email: {
            type: String,
            required: true,
            unique: true,
            trim: true,
            lowercase: true
        },
        password: {
            type: String,
            required: true,
            select: false,
        },
        phone: {
            type: String,
            required: true,
            trim: true
        },
        role: {
            type: String,
            enum: Object.values(ROLES),
            default: ROLES.EMPLOYEE
        },
        department: {
            type: String,
            required: true,
            trim: true
        },
        designation: {
            type: String,
            required: true,
            trim: true
        },
        employmentType: {
            type: String,
            required: true,
            trim: true
        },
        salary: {
            type: Number,
            required: true,
            min: 0
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
        deletedAt: {
            type: Date,
            default: null,
        },
    },
    {
        timestamps: true
    }
);

// Hash password before saving
employeeDetailsSchema.pre('save', async function () {

    // only hash if password is modified
    if (!this.isModified('password')) {
        return;
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

// Hash Password before update
employeeDetailsSchema.pre('findOneAndUpdate', async function () {
  const update = this.getUpdate();

  if (update.password) {
    const salt = await bcrypt.genSalt(10);
    update.password = await bcrypt.hash(update.password, salt);
  }

});

// compare password with hashed password during login
employeeDetailsSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
}


export default mongoose.model('Employees_List', employeeDetailsSchema);

