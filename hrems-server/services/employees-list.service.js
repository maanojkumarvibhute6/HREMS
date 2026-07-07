import mongoose from "mongoose";

import EmployeeModel from "../models/employees-list.model.js";
import Counter from "../models/empCounter.model.js";
import { createError } from "../utils/error.util.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { CURRENT_STATUS } from "../constants/status.constant.js";

const employeeMapper = (employee) => ({
    employeeId: employee.employeeId,
    firstName: employee.firstName,
    lastName: employee.lastName,
    email: employee.email,
    role: employee.role,
    department: employee.department,
    designation: employee.designation,
    salary: employee.salary,
    status: employee.status,
    isActive: employee.isActive,
    createdAt: employee.createdAt,
    updatedAt: employee.updatedAt
});

export const generateEmployeeId = async () => {

    const counter = await Counter.findOneAndUpdate(
        { name: "employeeId" },
        { $inc: { sequence: 1 } },
        {
            new: true,
            upsert: true
        }
    );

    return `EMP${counter.sequence}`;
};

export const createEmployeeService = async (req) => {

    const { firstName, lastName, email, password, phone, role, department, designation, employmentType, salary } = req.body;

    // To check all mandatory fields
    if (!firstName || !lastName || !email || !password || !phone || !department || !designation || !employmentType || !salary) {
        throw createError(MESSAGES.ALL_MANDATORY_FIELDS, HTTP_STATUS.UNPROCESSABLE_ENTITY);
    }

    // To check employee is already exists
    const isEmployeeExists = await EmployeeModel.findOne({ email });
    if (isEmployeeExists) {
        throw createError(MESSAGES.EMPLOYEE_ALREADY_CREATED, HTTP_STATUS.CONFLICT);
    }

    // To create automatic employeeId
    const newEmployeeId = await generateEmployeeId();
    const createEmployee = await EmployeeModel.create({
        employeeId: newEmployeeId,
        firstName,
        lastName,
        email,
        password,
        phone,
        role,
        department,
        designation,
        salary,
        employmentType
    });

    return createEmployee;
}

export const getAllEmployeesListService = async (req) => {
    const getAllEmployeesList = await EmployeeModel.find();

    return getAllEmployeesList.map(employeeMapper);
}

export const getEmployeeDetailService = async (req) => {
    const employeeId = req.params.employeeId;
    
    const employeeFullDetails = await EmployeeModel.findOne({ employeeId });

    if (!employeeFullDetails) {
        throw createError(MESSAGES.EMPLOYEE_DETAILS_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    return employeeMapper(employeeFullDetails);
}

export const employeeUpdateService = async (req) => {
    const employeeId = req.params.employeeId;
    const reqBody = req.body;

    // To check employee is exists or not
    const isEmployeeExists = await EmployeeModel.findOne({ employeeId });
    if (!isEmployeeExists) {
        throw createError(MESSAGES.EMPLOYEE_DETAILS_NOT_FOUND, HTTP_STATUS.NOT_FOUND);

    } else if (isEmployeeExists && isEmployeeExists.isActive === false) {
        throw createError(MESSAGES.EMPLOYEE_CURRENTLY_INACTIVE_UPDATE_FAILED, HTTP_STATUS.BAD_REQUEST);
    }

    const updatedEmployeeDetails = await EmployeeModel.findByIdAndUpdate(
        isEmployeeExists._id,
        reqBody,
        { new: true }
    )

    return employeeMapper(updatedEmployeeDetails);

}

export const deactiveEmployeService = async (req) => {
    const employeeId = req.params.employeeId;

    // To check employee is exists or not
    const isEmployeeExists = await EmployeeModel.findOne({ employeeId });
    if (!isEmployeeExists) {
        throw createError(MESSAGES.EMPLOYEE_DETAILS_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
    }

    const inActiveEmployeeDetails = await EmployeeModel.findByIdAndUpdate(
        isEmployeeExists._id,
        {
            isActive: false,
            status: CURRENT_STATUS.INACTIVE,
            deletedAt: new Date()
        },
        { new: true }
    )

    return employeeMapper(inActiveEmployeeDetails);

}