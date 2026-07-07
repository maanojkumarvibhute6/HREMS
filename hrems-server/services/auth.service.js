import jwt from 'jsonwebtoken';

import employeeModel from "../models/employees-list.model.js";
import { createError } from "../utils/error.util.js";
import { HTTP_STATUS } from '../constants/http-status.constant.js';
import { MESSAGES } from '../constants/messages.constant.js';


export const EmployeeLoginService = async (req) => {
    const { email, password } = req.body;

    // To check all mandatory fields
    if (!email || !password) {
        throw createError(MESSAGES.ALL_MANDATORY_FIELDS, HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }    

    // To check is email exists
    const employeeExists = await employeeModel.findOne({ email: email.toLowerCase() }).select("+password");
    if (!employeeExists) {
        throw createError(MESSAGES.EMPLOYEE_DOES_NOT_EXISTS, HTTP_STATUS.UNAUTHORIZED);
    }

    // To check if employee is active
    if (!employeeExists.isActive) {
        throw createError(MESSAGES.EMPLOYEE_INACTIVATED, HTTP_STATUS.FORBIDDEN);
    }

    // To check is password is match password
    const isPasswordMatch = await employeeExists.matchPassword(password)
    if (!isPasswordMatch) {
        throw createError(MESSAGES.INVALID_CREDENTIALS, HTTP_STATUS.UNAUTHORIZED);
    }

    const generateToken = jwt.sign(
        { 
            id: employeeExists._id, 
            employeeId: employeeExists.employeeId, 
            email: employeeExists.email,
            role: employeeExists.role
        },
        process.env.JWT_SECRET_KEY,
        { 
            expiresIn: process.env.JWT_TOKEN_EXPIRES_IN 
        }
    );

    const EmployeeData = {
        employeeId: employeeExists.employeeId, 
        name: employeeExists.name, 
        role: employeeExists.role,
        token: generateToken
    }

    return EmployeeData;
}