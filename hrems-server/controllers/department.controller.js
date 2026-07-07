import departmentsModel from "../models/departments.model.js";

import { HTTP_STATUS } from "../constants/http-status.constant.js";
import { MESSAGES } from "../constants/messages.constant.js";
import { createError } from "../utils/error.util.js";

// Create Department - POST Method
export const createDepartment = async (req, res, next) => {
    try {
        const { departmentId, label, value, departmentHead, departmentDescription } = req.body;

        // To check all mandatory fields
        if (!departmentId || !label || !value || !departmentHead || !departmentDescription) {
            throw createError(MESSAGES.ALL_MANDATORY_FIELDS, HTTP_STATUS.UNPROCESSABLE_ENTITY);
        }

        // To check department is already exists
        const isDepartmentExists = await departmentsModel.findOne({ value });
        if (isDepartmentExists) {
            throw createError(MESSAGES.DEPARTMENT_ALREADY_CREATED, HTTP_STATUS.CONFLICT);
        }

        const department = await departmentsModel.create({
            departmentId,
            label,
            value,
            departmentHead,
            departmentDescription
        });

        res.status(HTTP_STATUS.CREATED).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.CREATED,
                message: MESSAGES.DEPARTMENT_SUCCESS
            },
            data: {
                departmentId: department.departmentId,
                label: department.label,
                value: department.value,
                departmentHead: department.departmentHead,
                departmentDescription: department.departmentDescription,
                createdAt: department.createdAt,
                updatedAt: department.updatedAt,
                status: department.status,
                isActive: department.isActive,
            }
        });

    } catch (error) {
        error.customMessage = MESSAGES.DEPARTMENT_FAILED
        next(error);
    }
}
// Get All Departments List - GET Method
export const getAllDepartments = async (req, res, next) => {
    try {
        const allDepartments = await departmentsModel.find();
        const departmentsList = allDepartments.map((department) => ({
            departmentId: department.departmentId,
            label: department.label,
            value: department.value,
            departmentHead: department.departmentHead,
            departmentDescription: department.departmentDescription,
            createdAt: department.createdAt,
            updatedAt: department.updatedAt,
            status: department.status,
            isActive: department.isActive,
        }))

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DEPARTMENT_RETRIVED_SUCCESS
            },
            data: departmentsList,
            length: departmentsList.length

        });

    } catch (error) {
        error.customMessage = MESSAGES.DEPARTMENT_RETRIVED_FAILED
        next(error);
    }
}
// Get Department Details - GET Method
export const getDepartmentById = async (req, res, next) => {
    try {
        const departmentId = req.params.departmentId;

        const departmentFullDetails = await departmentsModel.findOne({ departmentId });

        if (!departmentFullDetails) {
            throw createError(MESSAGES.DEPARTMENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DEPARTMENT_RETRIVED_SUCCESS
            },
            data: {
                departmentId: departmentFullDetails.departmentId,
                label: departmentFullDetails.label,
                value: departmentFullDetails.value,
                departmentHead: departmentFullDetails.departmentHead,
                departmentDescription: departmentFullDetails.departmentDescription,
                createdAt: departmentFullDetails.createdAt,
                updatedAt: departmentFullDetails.updatedAt,
                status: departmentFullDetails.status,
                isActive: departmentFullDetails.isActive,
            }
        });
    } catch (error) {
        error.customMessage = MESSAGES.DEPARTMENT_RETRIVED_FAILED
        next(error);
    }
}

// Department update details - PUT Method
export const updateDepartmentById = async (req, res, next) => {
    try {
        const value = req.params.value;
        const reqBody = req.body;

        // To check department is exists
        const isDepartmentExists = await departmentsModel.findOne({ value });
        if (!isDepartmentExists) {
            throw createError(MESSAGES.DEPARTMENT_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const departmentDetails = await departmentsModel.findByIdAndUpdate(
            isDepartmentExists._id,
            reqBody,
            { new: true }
        );

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DEPARTMENT_UPDATE_SUCCESS
            },
            data: departmentDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.DEPARTMENT_UPDATE_FAILED
        next(error);
    }
}
// Department inActive when leaves company 
export const deleteDepartmentById = async (req, res, next) => {
    try {
        const value = req.params.value;

        // To check department is exists
        const isDepartmentExists = await departmentsModel.findOne({ value });
        if (!isDepartmentExists) {
            throw createError(MESSAGES.DESIGNATION_NOT_FOUND, HTTP_STATUS.NOT_FOUND);
        }

        const deleteDepartmentDetails = await departmentsModel.findByIdAndDelete(isDepartmentExists._id)

        res.status(HTTP_STATUS.OK).json({
            status: {
                status: MESSAGES.SUCCESS,
                statusCode: HTTP_STATUS.OK,
                message: MESSAGES.DEPARTMENT_DELETED_SUCCESS
            },
            data: deleteDepartmentDetails
        });

    } catch (error) {
        error.customMessage = MESSAGES.DEPARTMENT_DELETED_FAILED
        next(error);
    }
}